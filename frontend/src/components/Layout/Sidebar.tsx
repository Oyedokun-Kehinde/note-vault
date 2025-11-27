import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  StickyNote,
  BarChart3,
  User,
  Archive,
  Trash2,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Star,
  Pin,
  Lock as LockIcon
} from 'lucide-react';
import ConfirmModal from './ConfirmModal';
import useAuthStore from '../../store/useAuthStore';
import DarkModeToggle from './DarkModeToggle';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard', end: true },
    { path: '/notes', icon: StickyNote, label: 'All Notes' },
    { path: '/notes?favorite=true', icon: Star, label: 'Favorites' },
    { path: '/notes?pinned=true', icon: Pin, label: 'Pinned' },
    { path: '/archive', icon: Archive, label: 'Archive' },
    { path: '/trash', icon: Trash2, label: 'Trash' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <>
      <aside
        className={`fixed left-0 top-0 h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 z-40 ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          {isCollapsed ? (
            <div className="p-2 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-lg mx-auto">
              <LockIcon size={24} className="text-white" />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-lg">
                <LockIcon size={20} className="text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent">
                NoteVault
              </h1>
            </div>
          )}
          {!isCollapsed && (
            <button
              onClick={onToggle}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
          )}
        </div>

        {/* User Info */}
        {!isCollapsed && user && (
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 flex items-center justify-center text-white font-semibold">
                {user.username?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {user.username || 'User'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {navItems.map((item) => (
            <div key={item.path} className="relative group">
              <NavLink
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`
                }
              >
                <item.icon size={20} />
                {!isCollapsed && <span className="font-medium">{item.label}</span>}
              </NavLink>
              
              {/* Tooltip when collapsed */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                  {item.label}
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900 dark:border-r-gray-700"></div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-center">
            <DarkModeToggle />
          </div>

          {/* Logout Button */}
          <div className="relative group">
            <button
              onClick={() => setShowLogoutModal(true)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <LogOut size={20} />
              {!isCollapsed && <span className="font-medium">Logout</span>}
            </button>
            
            {/* Tooltip when collapsed */}
            {isCollapsed && (
              <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                Logout
                <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900 dark:border-r-gray-700"></div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Spacer for content */}
      <div className={`${isCollapsed ? 'ml-20' : 'ml-64'} transition-all duration-300`} />

      {/* Logout Confirmation Modal */}
      <ConfirmModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        title="Logout"
        message="Are you sure you want to logout? Any unsaved changes will be lost."
        confirmText="Logout"
        cancelText="Cancel"
        isDangerous={true}
      />
    </>
  );
}
