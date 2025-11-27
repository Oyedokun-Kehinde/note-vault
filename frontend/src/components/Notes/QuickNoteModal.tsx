import { useState } from 'react';
import { X, Save } from 'lucide-react';
import useNoteStore from '../../store/useNoteStore';
import RichTextEditor from '../Editor/RichTextEditor';
import toast from 'react-hot-toast';

interface QuickNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickNoteModal({ isOpen, onClose }: QuickNoteModalProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Personal');
  const [loading, setLoading] = useState(false);
  const { createNote } = useNoteStore();

  const categories = ['Personal', 'Work', 'Ideas', 'Spirituality', 'Leadership', 'Journalling', 'Other'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error('Please enter a title');
      return;
    }

    setLoading(true);
    try {
      await createNote({
        title: title.trim(),
        content,
        category,
        tags: [],
      });
      toast.success('Note created successfully!');
      setTitle('');
      setContent('');
      setCategory('Personal');
      onClose();
    } catch (error) {
      toast.error('Failed to create note');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Note</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter note title..."
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 outline-none transition-all dark:bg-gray-700 dark:text-white text-lg"
              required
              autoFocus
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 outline-none transition-all dark:bg-gray-700 dark:text-white"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Content
            </label>
            <div className="border-2 border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
              <RichTextEditor
                content={content}
                onChange={setContent}
                placeholder="Start writing your note..."
              />
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium"
          >
            <Save size={20} />
            {loading ? 'Creating...' : 'Create Note'}
          </button>
        </div>
      </div>
    </div>
  );
}
