import { STATUS } from '../utils/constants.js';

export default function StatsCards({ requests }) {
  const total = requests.length;
  const pending = requests.filter((r) => r.status === STATUS.PENDING).length;
  const approved = requests.filter((r) => r.status === STATUS.APPROVED).length;
  const rejected = requests.filter((r) => r.status === STATUS.REJECTED).length;

  const cards = [
    { label: 'Total Requests', value: total, className: 'stat-total' },
    { label: 'Pending Review', value: pending, className: 'stat-pending' },
    { label: 'Approved', value: approved, className: 'stat-approved' },
    { label: 'Rejected', value: rejected, className: 'stat-rejected' },
  ];

  return (
    <div className="stats-grid">
      {cards.map((c) => (
        <div key={c.label} className={`stat-card ${c.className}`}>
          <p className="stat-value">{c.value}</p>
          <p className="stat-label">{c.label}</p>
        </div>
      ))}
    </div>
  );
}
