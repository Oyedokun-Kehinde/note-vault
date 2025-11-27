import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import useAuthStore from './store/useAuthStore';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import MainLayout from './components/Layout/MainLayout';
import NotesPage from './pages/NotesPage';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import RecycleBin from './pages/RecycleBin';
import Archive from './pages/Archive';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

export default function App() {
  const { checkAuth, isAuthenticated } = useAuthStore();

  useEffect(() => {
    // Only check auth once on mount
    checkAuth();
  }, []); // Empty deps - run once

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={
        isAuthenticated ? <Navigate to="/" replace /> : <Login />
      } />
      <Route path="/register" element={
        isAuthenticated ? <Navigate to="/" replace /> : <Register />
      } />
      
      {/* Protected Routes with Sidebar Layout */}
      <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/analytics" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/trash" element={<RecycleBin />} />
      </Route>
      
      <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />} />
    </Routes>
  );
}
