import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Plus, Search, Filter, Grid, List, Star, Archive, Trash2, Pin } from 'lucide-react';
import Navbar from "../components/Navbar/Navbar";
import NoteForm from "../components/NoteForm";
import NoteCard from "../components/NoteCard";
import NoteModal from "../components/NoteModal";
import useNoteStore from "../store/useNoteStore";
import "./NotesPage.css";

const CATEGORIES = ["Personal", "Work", "Ideas", "Spirituality", "Leadership", "Journalling", "Other"];

export default function NotesPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [viewingNote, setViewingNote] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

  const navigate = useNavigate();
  const { noteId } = useParams();

  const {
    filteredNotes,
    isLoading,
    fetchNotes,
    fetchNoteById,
    createNote,
    updateNote,
    deleteNote,
    togglePin,
    toggleFavorite,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    showArchived,
    toggleArchived,
    showDeleted,
    toggleDeleted,
    showFavorites,
    toggleFavoritesFilter,
    clearFilters
  } = useNoteStore();

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  useEffect(() => {
    if (noteId) {
      fetchNoteById(noteId);
    }
  }, [noteId, fetchNoteById]);

  const resetToHome = () => {
    setIsFormOpen(false);
    setEditingNote(null);
    setViewingNote(null);
    navigate('/');
  };

  const handleCreateNote = async (noteData) => {
    try {
      await createNote(noteData);
      resetToHome();
    } catch (error) {
      console.error('Failed to create note:', error);
    }
  };

  const handleUpdateNote = async (id, noteData) => {
    try {
      await updateNote(id, noteData);
      resetToHome();
    } catch (error) {
      console.error('Failed to update note:', error);
    }
  };

  const handleNoteAction = async (id, action) => {
    switch(action) {
      case 'pin':
        await togglePin(id);
        break;
      case 'favorite':
        await toggleFavorite(id);
        break;
      case 'edit':
        const note = filteredNotes.find(n => n._id === id);
        setEditingNote(note);
        setIsFormOpen(true);
        setViewingNote(null);
        break;
      case 'delete':
        if (window.confirm('Are you sure you want to delete this note?')) {
          await deleteNote(id);
          if (viewingNote && viewingNote._id === id) {
            setViewingNote(null);
          }
        }
        break;
      default:
        break;
    }
  };

  const hasActiveFilters = selectedCategory || showArchived || showDeleted || showFavorites;

  return (
    <>
      <Navbar />
      <div className="notes-page">
        {!isFormOpen && !viewingNote && (
          <>
            {/* Search and Filters */}
            <div className="controls-bar">
              <div className="search-box">
                <Search size={20} />
                <input
                  type="text"
                  placeholder="Search notes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="controls-actions">
                <button 
                  className={`btn-icon ${showFilters ? 'active' : ''}`}
                  onClick={() => setShowFilters(!showFilters)}
                  title="Toggle filters"
                >
                  <Filter size={20} />
                </button>

                <button 
                  className={`btn-icon ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  title="Grid view"
                >
                  <Grid size={20} />
                </button>

                <button 
                  className={`btn-icon ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                  title="List view"
                >
                  <List size={20} />
                </button>

                <button 
                  className="btn-primary"
                  onClick={() => {
                    setIsFormOpen(true);
                    setEditingNote(null);
                  }}
                >
                  <Plus size={20} />
                  New Note
                </button>
              </div>
            </div>

            {/* Filters Panel */}
            {showFilters && (
              <div className="filters-panel">
                <div className="filter-group">
                  <label>Category</label>
                  <select 
                    value={selectedCategory} 
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">All Categories</option>
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="filter-toggles">
                  <button
                    className={`filter-btn ${showFavorites ? 'active' : ''}`}
                    onClick={toggleFavoritesFilter}
                  >
                    <Star size={18} />
                    Favorites
                  </button>

                  <button
                    className={`filter-btn ${showArchived ? 'active' : ''}`}
                    onClick={toggleArchived}
                  >
                    <Archive size={18} />
                    Archived
                  </button>

                  <button
                    className={`filter-btn ${showDeleted ? 'active' : ''}`}
                    onClick={toggleDeleted}
                  >
                    <Trash2 size={18} />
                    Trash
                  </button>

                  {hasActiveFilters && (
                    <button className="btn-clear" onClick={clearFilters}>
                      Clear Filters
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Notes Grid/List */}
            {isLoading ? (
              <div className="loading-state">
                <div className={`notes-container ${viewMode}`}>
                  {[1,2,3,4,5,6].map(i => (
                    <div key={i} className="note-card skeleton" />
                  ))}
                </div>
              </div>
            ) : filteredNotes.length > 0 ? (
              <div className={`notes-container ${viewMode}`}>
                {filteredNotes.map(note => (
                  <NoteCard
                    key={note._id}
                    note={note}
                    onOpen={(n) => {
                      setViewingNote(n);
                      navigate(`/note/${n._id}`);
                    }}
                    onAction={handleNoteAction}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <FileText size={64} />
                <h3>No notes found</h3>
                <p>
                  {hasActiveFilters 
                    ? 'Try adjusting your filters'
                    : 'Create your first note to get started'}
                </p>
                {!hasActiveFilters && (
                  <button 
                    className="btn-primary"
                    onClick={() => setIsFormOpen(true)}
                  >
                    <Plus size={20} />
                    Create Note
                  </button>
                )}
              </div>
            )}
          </>
        )}

        {isFormOpen && (
          <div className="form-container">
            <NoteForm
              onNoteAdded={handleCreateNote}
              onNoteUpdated={(updatedNote) => handleUpdateNote(editingNote._id, updatedNote)}
              editingNote={editingNote}
              onCancel={resetToHome}
              categories={CATEGORIES}
            />
          </div>
        )}

        {viewingNote && (
          <NoteModal
            note={viewingNote}
            onClose={resetToHome}
            onAction={handleNoteAction}
          />
        )}
      </div>
    </>
  );
}
