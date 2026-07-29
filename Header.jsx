export default function Header({ role, page, onBackHome }) {
  const isPortal = page === 'student' || page === 'faculty';

  return (
    <header className="app-header">
      <div className="header-brand">
        <div className="brand-icon">AP</div>
        <div className="header-copy">
          <div className="header-title-row">
            <h1>Attendance Permission System</h1>
            <span className="header-chip">Live</span>
          </div>
          <p>Submit, track, and approve attendance permission requests with a smoother campus workflow.</p>
        </div>
      </div>

      <div className="header-actions">
        {isPortal ? (
          <>
            <span className={`header-portal-pill ${role === 'student' ? 'student' : 'faculty'}`}>
              {role === 'student' ? 'Student Portal' : 'Faculty Portal'}
            </span>
            <button type="button" className="btn btn-secondary header-btn" onClick={onBackHome}>
              ← Back to Home
            </button>
          </>
        ) : (
          <span className="header-portal-pill neutral">Choose your portal</span>
        )}
      </div>
    </header>
  );
}
