import { Link } from 'react-router-dom';
import { Menu, Search } from 'lucide-react';
import useAuthStore from '../../store/useAuthStore';
import useNoteStore from '../../store/useNoteStore';
import DarkModeToggle from './DarkModeToggle';

interface DashboardHeaderProps {
  onToggleSidebar?: () => void;
}

export default function DashboardHeader({ onToggleSidebar }: DashboardHeaderProps) {
  const { user } = useAuthStore();
  const { search, setSearch } = useNoteStore();

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="flex items-center gap-4 h-16 px-6">
        {/* Left: Sidebar Toggle */}
        <button
          onClick={onToggleSidebar}
          className="p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0"
          title="Toggle Sidebar"
        >
          <Menu size={24} />
        </button>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search notes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none dark:bg-gray-700 dark:text-white transition-all"
            />
          </div>
        </div>

        {/* Right: Dark Mode + User */}
        <div className="flex items-center gap-4 flex-shrink-0">
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
