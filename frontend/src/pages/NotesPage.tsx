import { useEffect, useState } from 'react';
import { Plus, Search, Grid, List } from 'lucide-react';
import useNoteStore from '../store/useNoteStore';
import { CATEGORIES } from '../types';
import RichTextEditor from '../components/Editor/RichTextEditor';
import type { Note, Category } from '../types';

export default function NotesPage() {
  const {
    filteredNotes,
    isLoading,
    fetchNotes,
    createNote,
    updateNote,
    togglePin,
    toggleFavorite,
    search,
    setSearch,
    category,
    setCategory,
    showArchived,
    showDeleted,
  } = useNoteStore();

  const [isCreating, setIsCreating] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [formData, setFormData] = useState<{
    title: string;
    content: string;
    category: Category | '';
    cover: string;
  }>({
    title: '',
    content: '',
    category: '',
    cover: '',
  });

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleCreate = async () => {
    if (!formData.title || !formData.category) return;
    await createNote({
      title: formData.title,
      content: formData.content,
      category: formData.category as Category,
      cover: formData.cover,
    });
    resetForm();
  };

  const handleUpdate = async () => {
    if (!editingNote || !formData.title) return;
    await updateNote(editingNote.id, {
      title: formData.title,
      content: formData.content,
      category: formData.category as Category,
      cover: formData.cover,
    });
    resetForm();
  };

  const resetForm = () => {
    setFormData({ title: '', content: '', category: '', cover: '' });
    setIsCreating(false);
    setEditingNote(null);
  };

  const openEdit = (note: Note) => {
    setEditingNote(note);
    setFormData({
      title: note.title,
      content: note.content,
      category: note.category as Category | '',
      cover: note.cover || '',
    });
    setIsCreating(true);
  };

  return (
    <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {showArchived ? 'Archived Notes' : showDeleted ? 'Recycle Bin' : 'My Notes'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {filteredNotes.length} {filteredNotes.length === 1 ? 'note' : 'notes'}
            </p>
          </div>
          
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all"
          >
            <Plus size={20} />
            New Note
          </button>
        </div>

        {/* Search & Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search notes..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category | '')}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none dark:bg-gray-700 dark:text-white"
            >
              <option value="">All Categories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-purple-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-purple-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Create/Edit Form */}
        {isCreating && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                {editingNote ? 'Edit Note' : 'Create New Note'}
              </h2>
              
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Note title..."
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-xl font-semibold focus:ring-2 focus:ring-purple-500 outline-none dark:bg-gray-700 dark:text-white"
                />

                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Select category...</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>

                <input
                  type="url"
                  placeholder="Cover image URL (optional)"
                  value={formData.cover}
                  onChange={(e) => setFormData({ ...formData, cover: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none dark:bg-gray-700 dark:text-white"
                />

                <RichTextEditor
                  content={formData.content}
                  onChange={(content) => setFormData({ ...formData, content })}
                  placeholder="Start writing your note..."
                />

                <div className="flex gap-3 justify-end">
                  <button
                    onClick={resetForm}
                    className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={editingNote ? handleUpdate : handleCreate}
                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-lg hover:shadow-lg"
                  >
                    {editingNote ? 'Update' : 'Create'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notes Grid/List */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        ) : filteredNotes.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 dark:text-gray-400 text-lg">No notes found. Create your first note!</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 cursor-pointer"
                onClick={() => openEdit(note)}
              >
                {note.cover && (
                  <img src={note.cover} alt={note.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                )}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{note.title}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-sm">
                    {note.category}
                  </span>
                  {note.isPinned && <span className="text-yellow-500">📌</span>}
                  {note.isFavorite && <span className="text-red-500">❤️</span>}
                </div>
                <div 
                  className="text-gray-600 dark:text-gray-400 line-clamp-3" 
                  dangerouslySetInnerHTML={{ __html: note.content }}
                />
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={(e) => { e.stopPropagation(); togglePin(note.id); }}
                    className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200"
                  >
                    {note.isPinned ? 'Unpin' : 'Pin'}
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(note.id); }}
                    className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200"
                  >
                    {note.isFavorite ? '❤️' : '🤍'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
    </div>
  );
}
