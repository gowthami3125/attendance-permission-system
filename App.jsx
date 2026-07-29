import { Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage.jsx';
import StudentPortalPage from './pages/StudentPortalPage.jsx';
import FacultyPortalPage from './pages/FacultyPortalPage.jsx';
import './index.css';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/student" element={<StudentPortalPage />} />
      <Route path="/faculty" element={<FacultyPortalPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
