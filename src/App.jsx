// src/App.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import NoteForm from "./components/NoteForm";
import NoteCard from "./components/NoteCard";
import "./index.css";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  const resetToHome = () => {
    setIsFormOpen(false);
    setEditingNote(null);
  };

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get("http://localhost:3001/notes");
        const sortedNotes = response.data.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );
        setNotes(sortedNotes);
      } catch (err) {
        console.error("Failed to fetch notes:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  const handleNoteAdded = (newNote) => {
    setNotes((prev) => [newNote, ...prev]);
    resetToHome();
  };

  const handleNoteUpdated = (updatedNote) => {
    setNotes((prev) =>
      prev.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
    resetToHome();
  };

  const handleNoteDeleted = (id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const startEditing = (note) => {
    setEditingNote(note);
    setIsFormOpen(true);
  };

  const openFormWithFeedback = () => {
    const input = document.querySelector('.take-note-input');
    if (input) {
      input.classList.add('input-activating');
      setTimeout(() => {
        setIsFormOpen(true);
        setEditingNote(null);
        input.classList.remove('input-activating');
      }, 150);
    } else {
      setIsFormOpen(true);
      setEditingNote(null);
    }
  };

  const hasNotes = notes.length > 0;

  if (loading) {
    return (
      <div className="container">
        <h1 onClick={resetToHome}>My Notes</h1>
        <div className="notes-grid">
          {[1, 2, 3].map(i => (
            <div key={i} className="note-card skeleton">
              <div className="note-cover"></div>
              <div style={{ height: '1.5rem', marginBottom: '0.75rem', background: '#eee' }}></div>
              <div style={{ height: '4rem', background: '#eee', marginBottom: '1.25rem' }}></div>
              <div style={{ height: '1rem', background: '#eee', width: '60%', marginBottom: '0.75rem' }}></div>
              <div style={{ height: '1rem', background: '#eee', width: '80%' }}></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 onClick={resetToHome}>My Notes</h1>

      {!isFormOpen && (
        hasNotes ? (
          <div className="take-note-input-wrapper">
            <input
              type="text"
              placeholder="Take a note..."
              className="take-note-input"
              onFocus={openFormWithFeedback}
              onClick={openFormWithFeedback}
            />
          </div>
        ) : (
          <div className="empty-state-plus">
            <p>No notes yet</p>
            <p style={{ fontSize: '0.9rem' }}>Tap + to create your first note</p>
            <button
              onClick={openFormWithFeedback}
              className="plus-button"
              aria-label="Create new note"
            >
              +
            </button>
          </div>
        )
      )}

      {isFormOpen && (
        <div className="form-wrapper">
          <NoteForm
            onNoteAdded={handleNoteAdded}
            onNoteUpdated={handleNoteUpdated}
            editingNote={editingNote}
            onCancel={resetToHome}
          />
        </div>
      )}

      {notes.filter(note => !isFormOpen || !editingNote || note.id !== editingNote.id).length > 0 && (
        <div className="notes-grid">
          {notes
            .filter(note => !isFormOpen || !editingNote || note.id !== editingNote.id)
            .map(note => (
              <NoteCard
                key={note.id}
                note={note}
                onDelete={handleNoteDeleted}
                onEdit={startEditing}
              />
            ))}
        </div>
      )}
    </div>
  );
}