import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import useAuthStore from '../../store/useAuthStore';
import DarkModeToggle from './DarkModeToggle';

interface DashboardHeaderProps {
  onToggleSidebar?: () => void;
}

export default function DashboardHeader({ onToggleSidebar }: DashboardHeaderProps) {
  const { user } = useAuthStore();

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm mb-6">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Left: Sidebar Toggle */}
        <button
          onClick={onToggleSidebar}
          className="p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          title="Toggle Sidebar"
        >
          <Menu size={24} />
        </button>

        {/* Right: Dark Mode + User */}
        <div className="flex items-center gap-4">
          {/* Dark Mode Toggle */}
          <DarkModeToggle />

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
