import { useState } from 'react';
import { User, Mail, Save, LogOut } from 'lucide-react';
import Navbar from '../components/Layout/Navbar';
import useAuthStore from '../store/useAuthStore';
import api from '../utils/api';
import toast from 'react-hot-toast';

export default function Profile() {
  const { user, logout, updateUser } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    bio: user?.bio || '',
    avatar: user?.avatar || ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.put('/users/profile', formData);
      updateUser(response.data.data.user);
      toast.success('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 flex items-center justify-center text-white text-4xl font-bold overflow-hidden">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
              ) : (
                user?.username?.charAt(0).toUpperCase()
              )}
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{user?.username}</h2>
            <p className="text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2 mt-2">
              <Mail size={16} />
              {user?.email}
            </p>
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none dark:bg-gray-700 dark:text-white"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Bio</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none dark:bg-gray-700 dark:text-white"
                  placeholder="Tell us about yourself"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Avatar URL</label>
                <input
                  type="url"
                  value={formData.avatar}
                  onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none dark:bg-gray-700 dark:text-white"
                  placeholder="Enter avatar image URL"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg"
                >
                  <Save size={20} />
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">Full Name</label>
                <p className="text-lg text-gray-900 dark:text-white">{user?.fullName || 'Not set'}</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">Bio</label>
                <p className="text-lg text-gray-900 dark:text-white">{user?.bio || 'No bio yet'}</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">Joined</label>
                <p className="text-lg text-gray-900 dark:text-white">
                  {new Date(user?.createdAt || '').toLocaleDateString()}
                </p>
              </div>

              <button
                onClick={() => setIsEditing(true)}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg"
              >
                Edit Profile
              </button>
            </div>
          )}

          <button
            onClick={logout}
            className="w-full mt-6 flex items-center justify-center gap-2 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
