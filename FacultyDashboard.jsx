import { useState, useMemo } from 'react';
import Modal from './Modal.jsx';
import RequestCard from './RequestCard.jsx';
import RequestDetailModal from './RequestDetailModal.jsx';
import StatsCards from './StatsCards.jsx';
import EmptyState from './EmptyState.jsx';
import { CATEGORIES, STATUS } from '../utils/constants.js';

export default function FacultyDashboard({ requests, onDecision, faculty }) {
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    let list = [...requests].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    if (statusFilter !== 'all') list = list.filter((r) => r.status === statusFilter);
    if (categoryFilter !== 'all') list = list.filter((r) => r.category === categoryFilter);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((r) => r.studentName.toLowerCase().includes(q) || r.studentId.toLowerCase().includes(q));
    }
    return list;
  }, [requests, statusFilter, categoryFilter, search]);

  return (
    <div>
      <div className="section-header">
        <div>
          <h2>Faculty Approval Dashboard</h2>
          <p className="muted">Signed in as {faculty.name}</p>
        </div>
      </div>

      <StatsCards requests={requests} />

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search by student name or ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All Statuses</option>
          <option value={STATUS.PENDING}>Pending</option>
          <option value={STATUS.APPROVED}>Approved</option>
          <option value={STATUS.REJECTED}>Rejected</option>
        </select>
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="all">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState message="No requests match the current filters." />
      ) : (
        <div className="card-grid">
          {filtered.map((r) => (
            <RequestCard key={r.id} request={r} onClick={() => setSelected(r)} showStudent />
          ))}
        </div>
      )}

      {selected && (
        <Modal title="Review Request" onClose={() => setSelected(null)} width="620px">
          <RequestDetailModal request={selected} onClose={() => setSelected(null)} canReview onDecision={onDecision} />
        </Modal>
      )}
    </div>
  );
}
