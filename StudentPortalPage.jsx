import { useEffect, useState } from 'react';
import Header from '../components/Header.jsx';
import StudentDashboard from '../components/StudentDashboard.jsx';
import { CURRENT_STUDENT, STATUS } from '../utils/constants.js';
import { addRequest, getRequests, updateRequest } from '../utils/storage.js';
import { generateId } from '../utils/helpers.js';

export default function StudentPortalPage() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    setRequests(getRequests());
  }, []);

  function handleSubmitRequest(formData) {
    const now = new Date().toISOString();
    const newRequest = {
      id: generateId(),
      studentId: CURRENT_STUDENT.id,
      studentName: CURRENT_STUDENT.name,
      ...formData,
      status: STATUS.PENDING,
      createdAt: now,
      updatedAt: now,
      facultyRemarks: '',
      history: [{ status: STATUS.PENDING, by: CURRENT_STUDENT.name, at: now, remarks: 'Request submitted' }],
    };
    setRequests(addRequest(newRequest));
  }

  return (
    <div className="app-shell">
      <Header role="student" page="student" onBackHome={() => window.location.assign('/')} />
      <main className="main-content">
        <section className="hero-card">
          <div className="hero-content">
            <span className="eyebrow">Student portal</span>
            <h2>Request your attendance permission in minutes</h2>
            <p>Submit requests, attach support details, and track every update from one elegant workspace.</p>
          </div>
          <div className="hero-highlights">
            <div className="hero-pill">⚡ Quick submission</div>
            <div className="hero-pill">📄 Support docs</div>
            <div className="hero-pill">🧭 Full history</div>
          </div>
        </section>

        <StudentDashboard requests={requests.filter((request) => request.studentId === CURRENT_STUDENT.id)} onSubmit={handleSubmitRequest} student={CURRENT_STUDENT} />
      </main>
    </div>
  );
}
