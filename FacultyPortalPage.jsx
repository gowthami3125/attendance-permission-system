import { useEffect, useState } from 'react';
import Header from '../components/Header.jsx';
import FacultyDashboard from '../components/FacultyDashboard.jsx';
import { CURRENT_FACULTY, STATUS } from '../utils/constants.js';
import { getRequests, updateRequest } from '../utils/storage.js';

export default function FacultyPortalPage() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    setRequests(getRequests());
  }, []);

  function handleDecision(id, decision, remarks) {
    const now = new Date().toISOString();
    const updated = updateRequest(id, (request) => ({
      ...request,
      status: decision,
      updatedAt: now,
      facultyRemarks: remarks,
      history: [
        ...request.history,
        {
          status: decision,
          by: CURRENT_FACULTY.name,
          at: now,
          remarks: remarks || (decision === STATUS.APPROVED ? 'Approved' : 'Rejected'),
        },
      ],
    }));
    setRequests(updated);
  }

  return (
    <div className="app-shell">
      <Header role="faculty" page="faculty" onBackHome={() => window.location.assign('/')} />
      <main className="main-content">
        <section className="hero-card">
          <div className="hero-content">
            <span className="eyebrow">Faculty portal</span>
            <h2>Review requests with a calm, clear workflow</h2>
            <p>Approve or reject requests quickly while keeping full approval history and student context visible.</p>
          </div>
          <div className="hero-highlights">
            <div className="hero-pill">⚡ Quick approvals</div>
            <div className="hero-pill">📋 Review queue</div>
            <div className="hero-pill">🧭 Full history</div>
          </div>
        </section>

        <FacultyDashboard requests={requests} onDecision={handleDecision} faculty={CURRENT_FACULTY} />
      </main>
    </div>
  );
}
