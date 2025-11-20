// src/App.jsx
import { useState, useEffect, useMemo } from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Controls from "./components/Controls";
import NoteForm from "./components/NoteForm";
import NoteCard from "./components/NoteCard";
import NoteModal from "./components/NoteModal";
import "./index.css";

const CATEGORIES = ["Personal", "Work", "Ideas", "Spirituality", "Leadership", "Journalling", "Other"];

export default function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [viewingNote, setViewingNote] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) return JSON.parse(saved);
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [showArchived, setShowArchived] = useState(false);
  const [showTrash, setShowTrash] = useState(false);

  const navigate = useNavigate();
  const { noteId } = useParams();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get("http://localhost:3001/notes");
        const sortedNotes = response.data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        setNotes(sortedNotes);
      } catch (err) {
        console.error("Failed to fetch notes:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  // 🔒 Safely resolve note from URL AFTER data loads
  useEffect(() => {
    if (noteId) {
      if (loading) return;
      const found = notes.find(n => n.id === noteId);
      setViewingNote(found || null); // always null if not found
    } else {
      setViewingNote(null);
    }
  }, [noteId, notes, loading]);

  const resetToHome = () => {
    setIsFormOpen(false);
    setEditingNote(null);
    setViewingNote(null);
    navigate('/');
  };

  const handleNoteAdded = (newNote) => {
    setNotes((prev) => [newNote, ...prev]);
    resetToHome();
  };

  const handleNoteUpdated = (updatedNote) => {
    setNotes((prev) => prev.map(note => note.id === updatedNote.id ? updatedNote : note));
    resetToHome();
  };

  const handleNoteAction = (id, action) => {
    const note = notes.find(n => n.id === id);
    if (!note) return;

    const now = new Date().toISOString();
    let updateData = { ...note, updatedAt: now };

    switch(action) {
      case 'archive': updateData = { ...updateData, archived: true, deleted: false }; break;
      case 'unarchive': updateData = { ...updateData, archived: false }; break;
      case 'delete': updateData = { ...updateData, deleted: true, archived: false }; break;
      case 'restore': updateData = { ...updateData, deleted: false }; break;
      case 'permanent-delete':
        axios.delete(`http://localhost:3001/notes/${id}`).then(() => {
          setNotes(prev => prev.filter(n => n.id !== id));
          if (viewingNote && viewingNote.id === id) {
            setViewingNote(null);
          }
        });
        return;
      case 'edit':
        setEditingNote(note);
        setIsFormOpen(true);
        setViewingNote(null);
        return;
      default: return;
    }

    axios.put(`http://localhost:3001/notes/${id}`, updateData).then(() => {
      setNotes(prev => prev.map(n => n.id === id ? updateData : n));
    });
  };

  const openFormWithFeedback = () => {
    setIsFormOpen(true);
    setEditingNote(null);
  };

  const filteredNotes = useMemo(() => {
    return notes.filter(note => {
      const matchesSearch = 
        (note.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (note.content || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (note.category || '').toLowerCase().includes(searchQuery.toLowerCase());
      
      if (showTrash) return matchesSearch && note.deleted;
      if (showArchived) return matchesSearch && note.archived && !note.deleted;
      return matchesSearch && !note.archived && !note.deleted;
    });
  }, [notes, searchQuery, showArchived, showTrash]);

  const hasNotes = filteredNotes.length > 0;

  if (loading) {
    return (
      <div className="container">
        <h1 onClick={() => navigate('/')}>NoteVault</h1>
        <div className="notes-container grid">
          {[1,2,3].map(i => <div key={i} className="note-card skeleton" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 onClick={() => navigate('/')}>NoteVault</h1>

      <Routes>
        <Route path="/" element={
          <>
            {!isFormOpen && !viewingNote && (
              <>
                <Controls
                  viewMode={viewMode}
                  setViewMode={setViewMode}
                  darkMode={darkMode}
                  setDarkMode={setDarkMode}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  showArchived={showArchived}
                  setShowArchived={setShowArchived}
                  showTrash={showTrash}
                  setShowTrash={setShowTrash}
                />
                {hasNotes ? (
                  <div className="take-note-input-wrapper">
                    <input
                      type="text"
                      placeholder="Take a note..."
                      className="take-note-input"
                      onClick={openFormWithFeedback}
                    />
                  </div>
                ) : (
                  !showTrash && (
                    <div className="empty-state-plus">
                      <p>{showArchived ? 'No archived notes' : 'No notes yet'}</p>
                      <p style={{ fontSize: '0.9rem' }}>
                        {showArchived ? 'Create notes and archive them' : 'Tap + to create your first note'}
                      </p>
                      {!showArchived && (
                        <button onClick={openFormWithFeedback} className="plus-button">+</button>
                      )}
                    </div>
                  )
                )}
              </>
            )}

            {isFormOpen && (
              <div className="form-wrapper">
                <NoteForm
                  onNoteAdded={handleNoteAdded}
                  onNoteUpdated={handleNoteUpdated}
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

            {!viewingNote && !isFormOpen && (
              <div className={`notes-container ${viewMode}`}>
                {filteredNotes.map(note => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    onOpen={(n) => {
                      setViewingNote(n);
                      navigate(`/note/${n.id}`);
                    }}
                    onEdit={(n) => {
                      setEditingNote(n);
                      setIsFormOpen(true);
                    }}
                  />
                ))}
              </div>
            )}
          </>
        } />
        <Route 
          path="/note/:id" 
          element={
            viewingNote ? (
              <NoteModal note={viewingNote} onClose={resetToHome} onAction={handleNoteAction} />
            ) : (
              <div className="container" style={{ padding: '3rem', textAlign: 'center' }}>
                <h2>Note Not Found</h2>
                <p>The note you're looking for doesn't exist.</p>
                <button 
                  onClick={resetToHome}
                  style={{ 
                    marginTop: '1rem', 
                    padding: '0.6rem 1.2rem', 
                    backgroundColor: '#45BFDB', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '6px', 
                    cursor: 'pointer' 
                  }}
                >
                  Back to Home
                </button>
              </div>
            )
          } 
        />
      </Routes>
    </div>
  );
}