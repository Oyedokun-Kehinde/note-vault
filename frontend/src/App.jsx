// src/App.jsx
import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import Dashboard from "./components/Dashboard/Dashboard";
import Profile from "./components/Profile/Profile";
import NotesPage from "./pages/NotesPage";
import useAuthStore from "./store/useAuthStore";
import "./index.css";

export default function App() {
  const { checkAuth, isAuthenticated } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={
        isAuthenticated ? <Navigate to="/" replace /> : <Login />
      } />
      <Route path="/register" element={
        isAuthenticated ? <Navigate to="/" replace /> : <Register />
      } />

      {/* Protected Routes */}
      <Route path="/" element={
        <ProtectedRoute>
          <NotesPage />
        </ProtectedRoute>
      } />
      <Route path="/note/:noteId" element={
        <ProtectedRoute>
          <NotesPage />
        </ProtectedRoute>
      } />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />

      {/* Fallback */}
      <Route path="*" element={
        <Navigate to={isAuthenticated ? "/" : "/login"} replace />
      } />
    </Routes>
  );
}