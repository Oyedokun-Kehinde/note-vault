import { Link } from 'react-router-dom';
import { Lock as LockIcon, Plus, Bell } from 'lucide-react';
import useAuthStore from '../../store/useAuthStore';

export default function Navbar() {
  const { user } = useAuthStore();

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="p-2 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-lg group-hover:scale-110 transition-transform">
            <LockIcon size={24} className="text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent">
            NoteVault
          </span>
        </Link>

        {/* Right: Actions & User */}
        <div className="flex items-center gap-4">
          {/* Quick Create Note Button */}
          <Link
            to="/notes"
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all"
          >
            <Plus size={20} />
            <span className="font-medium">New Note</span>
          </Link>

          {/* Notifications (placeholder) */}
          <button
            className="p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors relative"
            title="Notifications"
          >
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Avatar */}
          <Link to="/profile" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 flex items-center justify-center text-white font-bold">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.username} className="w-full h-full rounded-full object-cover" />
              ) : (
                user?.username?.charAt(0).toUpperCase()
              )}
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{user?.username}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
