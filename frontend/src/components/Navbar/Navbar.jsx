import { Link, useLocation } from 'react-router-dom';
import { Home, BarChart3, User, FileText } from 'lucide-react';
import useAuthStore from '../../store/useAuthStore';
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();
  const { user } = useAuthStore();

  const navItems = [
    { path: '/', icon: <Home size={20} />, label: 'Notes' },
    { path: '/dashboard', icon: <BarChart3 size={20} />, label: 'Dashboard' },
    { path: '/profile', icon: <User size={20} />, label: 'Profile' }
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <FileText size={28} />
          <span>NoteVault</span>
        </Link>

        <div className="navbar-links">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </div>

        <div className="navbar-user">
          <div className="user-avatar">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.username} />
            ) : (
              <User size={18} />
            )}
          </div>
          <span className="user-name">{user?.username}</span>
        </div>
      </div>
    </nav>
  );
}
