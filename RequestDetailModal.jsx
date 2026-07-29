import { useState } from 'react';
import StatusBadge from './StatusBadge.jsx';
import { CATEGORIES, STATUS } from '../utils/constants.js';
import { formatDate, formatDateTime, daysBetween } from '../utils/helpers.js';

function categoryLabel(value) {
  return CATEGORIES.find((c) => c.value === value)?.label || value;
}

export default function RequestDetailModal({ request, onClose, canReview, onDecision }) {
  const [remarks, setRemarks] = useState('');
  const [actionError, setActionError] = useState('');

  function handleDecision(decision) {
    if (decision === STATUS.REJECTED && !remarks.trim()) {
      setActionError('Please provide a reason for rejection.');
      return;
    }
    onDecision(request.id, decision, remarks.trim());
    onClose();
  }

  return (
    <div className="detail">
      <div className="detail-top">
        <div>
          <h3>{categoryLabel(request.category)}</h3>
          <p className="detail-id">Request ID: {request.id}</p>
        </div>
        <StatusBadge status={request.status} />
      </div>

      <div className="detail-grid">
        <div>
          <span className="detail-label">Student</span>
          <p>{request.studentName} ({request.studentId})</p>
        </div>
        <div>
          <span className="detail-label">Duration</span>
          <p>{formatDate(request.fromDate)} → {formatDate(request.toDate)} ({daysBetween(request.fromDate, request.toDate)} day(s))</p>
        </div>
        <div>
          <span className="detail-label">Submitted On</span>
          <p>{formatDateTime(request.createdAt)}</p>
        </div>
        <div>
          <span className="detail-label">Attachment</span>
          <p>{request.attachmentName ? `📎 ${request.attachmentName}` : 'None'}</p>
        </div>
      </div>

      <div className="detail-section">
        <span className="detail-label">Reason / Details</span>
        <p className="detail-reason">{request.reason}</p>
      </div>

      <div className="detail-section">
        <span className="detail-label">Approval History</span>
        <ul className="timeline">
          {request.history.map((h, idx) => (
            <li key={idx} className={`timeline-item timeline-${h.status}`}>
              <div className="timeline-dot" />
              <div>
                <p className="timeline-title"><StatusBadge status={h.status} /> by {h.by}</p>
                <p className="timeline-time">{formatDateTime(h.at)}</p>
                {h.remarks && <p className="timeline-remarks">{h.remarks}</p>}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {canReview && request.status === STATUS.PENDING && (
        <div className="detail-section review-box">
          <span className="detail-label">Faculty Remarks</span>
          <textarea
            rows={3}
            placeholder="Add remarks (required for rejection)..."
            value={remarks}
            onChange={(e) => { setRemarks(e.target.value); setActionError(''); }}
          />
          {actionError && <span className="field-error">{actionError}</span>}
          <div className="form-actions">
            <button className="btn btn-danger" onClick={() => handleDecision(STATUS.REJECTED)}>Reject</button>
            <button className="btn btn-success" onClick={() => handleDecision(STATUS.APPROVED)}>Approve</button>
          </div>
        </div>
      )}
    </div>
  );
}
