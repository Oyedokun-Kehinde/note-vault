import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FileText, Star, Pin, Archive, Trash2, Clock, TrendingUp, Calendar, Plus } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import useNoteStore from '../store/useNoteStore';
import useAuthStore from '../store/useAuthStore';
import QuickNoteModal from '../components/Notes/QuickNoteModal';

const COLORS = ['#9333ea', '#06b6d4', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6'];

// Get personalized greeting based on time
const getGreeting = () => {
  const hour = new Date().getHours();
  
  if (hour < 5) return { text: "Burning the midnight oil?", emoji: "🌙", tip: "Remember to get some rest!" };
  if (hour < 12) return { text: "Good morning!", emoji: "☀️", tip: "Great time to organize your thoughts!" };
  if (hour < 18) return { text: "Good afternoon!", emoji: "🌤️", tip: "Keep up the great work!" };
  if (hour < 22) return { text: "Good evening!", emoji: "🌆", tip: "Time to review your day's notes?" };
  return { text: "Still working?", emoji: "🌜", tip: "Maybe it's time for bed!" };
};

export default function Dashboard() {
  const { stats, fetchStats, notes, fetchNotes } = useNoteStore();
  const { user } = useAuthStore();
  const [greeting, setGreeting] = useState(getGreeting());
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showNoteModal, setShowNoteModal] = useState(false);

  useEffect(() => {
    fetchStats();
    fetchNotes();
    
    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setGreeting(getGreeting());
    }, 60000);
    
    return () => clearInterval(timer);
  }, [fetchStats, fetchNotes]);

  // Get recent notes
  const recentNotes = notes
    ?.filter(note => !note.deleted && !note.archived)
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5) || [];

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const { overall, byCategory } = stats;

  const statsCards = [
    { icon: <FileText />, label: 'Total Notes', value: overall?.total || 0, color: 'from-purple-600 to-purple-400' },
    { icon: <Star />, label: 'Favorites', value: overall?.favorites || 0, color: 'from-yellow-600 to-yellow-400' },
    { icon: <Pin />, label: 'Pinned', value: overall?.pinned || 0, color: 'from-blue-600 to-blue-400' },
    { icon: <Archive />, label: 'Archived', value: overall?.archived || 0, color: 'from-green-600 to-green-400' },
    { icon: <Trash2 />, label: 'Deleted', value: overall?.deleted || 0, color: 'from-red-600 to-red-400' },
  ];

  const categoryData = byCategory?.map(cat => ({
    name: cat._id,
    count: cat.count
  })) || [];

  return (
    <div className="space-y-8">
      {/* Personalized Greeting */}
      <div className="bg-gradient-to-r from-purple-600 to-cyan-500 rounded-2xl shadow-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-5xl">{greeting.emoji}</span>
              <h1 className="text-4xl font-bold">
                {greeting.text}
              </h1>
            </div>
            <p className="text-xl opacity-90 mb-1">
              Welcome back, <span className="font-semibold">{user?.username || 'Friend'}</span>!
            </p>
            <p className="text-lg opacity-75 italic">{greeting.tip}</p>
          </div>
          <div className="flex flex-col items-end gap-3">
            <div className="text-right">
              <div className="flex items-center gap-2 text-lg mb-2">
                <Clock size={20} />
                <span>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <div className="flex items-center gap-2 text-sm opacity-75">
                <Calendar size={16} />
                <span>{currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
              </div>
            </div>
            
            {/* Quick Create Note Button */}
            <button
              onClick={() => setShowNoteModal(true)}
              className="px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-lg transition-all flex items-center gap-2 font-semibold shadow-lg"
            >
              <Plus size={20} />
              Create Note
            </button>
          </div>
        </div>
      </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {statsCards.map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
            >
              <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${stat.color} text-white mb-4`}>
                {stat.icon}
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Recent Notes */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="text-purple-600" />
              Recent Activity
            </h2>
            <button
              onClick={() => setShowNoteModal(true)}
              className="text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1"
            >
              <Plus size={18} />
              New Note
            </button>
          </div>
          
          {recentNotes.length > 0 ? (
            <div className="space-y-3">
              {recentNotes.map((note) => (
                <Link
                  key={note.id}
                  to={`/notes?id=${note.id}`}
                  className="block p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-all hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {note.title || 'Untitled'}
                        </h3>
                        {note.isPinned && <Pin size={14} className="text-purple-600" />}
                        {note.isFavorite && <Star size={14} className="text-yellow-500 fill-yellow-500" />}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {note.content?.replace(/<[^>]*>/g, '').substring(0, 100) || 'No content'}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {note.category}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDistanceToNow(new Date(note.updatedAt), { addSuffix: true })}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 dark:text-gray-400 mb-4">No notes yet!</p>
              <button
                onClick={() => setShowNoteModal(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Plus size={20} />
                Create Your First Note
              </button>
            </div>
          )}
        </div>

        {/* Charts */}
        {categoryData.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Notes by Category</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#9333ea" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Category Distribution</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {categoryData.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
        
        {/* Quick Note Creation Modal */}
        <QuickNoteModal 
          isOpen={showNoteModal} 
          onClose={() => setShowNoteModal(false)} 
        />
    </div>
  );
}
