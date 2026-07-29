import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const students = [
  { id: 'STU2023045', name: 'Aditi Sharma', role: 'student', password: 'student123' },
];

const faculty = [
  { id: 'FAC1002', name: 'Dr. Rajeev Menon', role: 'faculty', password: 'faculty123' },
];

export default function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');
  const [role, setRole] = useState('student');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    const accounts = role === 'student' ? students : faculty;

    if (mode === 'register') {
      if (password !== confirmPassword) {
        setMessage('Passwords do not match. Please confirm your password.');
        return;
      }

      const existingAccount = accounts.find((item) => item.id === userId);
      if (existingAccount) {
        setMessage('An account with this ID already exists. Please login or choose a different ID.');
        return;
      }

      const newAccount = {
        id: userId,
        name: `${role === 'student' ? 'Student' : 'Faculty'} ${userId}`,
        role,
        password,
        email,
        phone,
      };

      accounts.push(newAccount);
      setMessage('Registration successful. You can now sign in.');
      setMode('login');
      setPassword('');
      setConfirmPassword('');
      setEmail('');
      setPhone('');
      return;
    }

    const account = accounts.find((item) => item.id === userId && item.password === password);
    if (!account) {
      setMessage('Invalid credentials. Please try again.');
      return;
    }

    navigate(role === 'student' ? '/student' : '/faculty');
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-hero">
          <span className="eyebrow">Attendance permission system</span>
          <h1>{mode === 'login' ? 'Welcome back' : 'Create your account'}</h1>
          <p>Access the student or faculty portal with your credentials.</p>
        </div>

        <div className="auth-toggle">
          <button type="button" className={mode === 'login' ? 'auth-toggle-btn active' : 'auth-toggle-btn'} onClick={() => setMode('login')}>Login</button>
          <button type="button" className={mode === 'register' ? 'auth-toggle-btn active' : 'auth-toggle-btn'} onClick={() => setMode('register')}>Register</button>
        </div>

        <div className="auth-role-switch">
          <button type="button" className={role === 'student' ? 'role-chip active' : 'role-chip'} onClick={() => setRole('student')}>Student</button>
          <button type="button" className={role === 'faculty' ? 'role-chip active' : 'role-chip'} onClick={() => setRole('faculty')}>Faculty</button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            <span>{role === 'student' ? 'Student ID' : 'Faculty ID'}</span>
            <input value={userId} onChange={(e) => setUserId(e.target.value)} placeholder={role === 'student' ? 'STU2023045' : 'FAC1002'} required />
          </label>
          {mode === 'register' && (
            <>
              <label>
                <span>Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </label>
              <label>
                <span>Phone number</span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  required
                />
              </label>
              <label>
                <span>Create password</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  required
                />
              </label>
              <label>
                <span>Confirm password</span>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  required
                />
              </label>
            </>
          )}
          {mode === 'login' && (
            <label>
              <span>Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </label>
          )}
          <button type="submit" className="btn btn-primary auth-submit">{mode === 'login' ? 'Login' : 'Register'}</button>
          {message && <p className="auth-message">{message}</p>}
        </form>
      </div>
    </div>
  );
}
