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
    { path: '/notes', icon: StickyNote, label: 'All Notes', end: true },
    { path: '/favorites', icon: Star, label: 'Favorites', end: true },
    { path: '/pinned', icon: Pin, label: 'Pinned', end: true },
    { path: '/archive', icon: Archive, label: 'Archive', end: true },
    { path: '/recycle-bin', icon: Trash2, label: 'Trash', end: true },
    { path: '/dashboard', icon: BarChart3, label: 'Analytics', end: true },
    { path: '/profile', icon: User, label: 'Profile', end: true },
  ];

  return (
    <>
      <aside
        className={`fixed left-0 top-0 h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 z-40 overflow-visible ${
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
                <div className="fixed left-20 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-[9999] shadow-xl">
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
              <div className="fixed left-20 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-[9999] shadow-xl">
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
