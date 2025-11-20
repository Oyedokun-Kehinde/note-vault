// src/components/NoteForm.jsx
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { getCurrentTimestamp } from "../utils";

const CATEGORIES = ["Personal", "Work", "Ideas", "Spirituality", "Leadership", "Journalling", "Other"];

export default function NoteForm({
  onNoteAdded,
  onNoteUpdated,
  editingNote,
  onCancel,
}) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [cover, setCover] = useState("");
  const titleRef = useRef(null);

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title || "");
      setCategory(editingNote.category || "");
      setContent(editingNote.content || "");
      setCover(editingNote.cover || "");
    } else {
      setTitle("");
      setCategory("");
      setContent("");
      setCover("");
    }
  }, [editingNote]);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.focus();
    }
  }, []);

  const isEditing = !!editingNote;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const now = getCurrentTimestamp();
    const noteData = {
      title,
      category,
      content,
      cover,
      ...(isEditing ? { updatedAt: now } : { createdAt: now, updatedAt: now }),
    };

    try {
      if (isEditing) {
        const response = await axios.put(
          `http://localhost:3001/notes/${editingNote.id}`,
          { ...editingNote, ...noteData }
        );
        onNoteUpdated(response.data);
      } else {
        const response = await axios.post("http://localhost:3001/notes", noteData);
        onNoteAdded(response.data);
      }
    } catch (err) {
      console.error(isEditing ? "Update failed:" : "Create failed:", err);
      alert(isEditing ? "Failed to update note" : "Failed to add note");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>{isEditing ? "Edit Note" : "Create New Note"}</h2>
        <button type="button" onClick={onCancel} className="cancel-btn">
          ← Back
        </button>
      </div>

      <div className="form-group">
        <input
          ref={titleRef}
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select a category</option>
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <input
          type="url"
          placeholder="Cover Image URL (optional)"
          value={cover}
          onChange={(e) => setCover(e.target.value)}
        />
      </div>
      <div className="form-group">
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="submit-btn">
        {isEditing ? "Update Note" : "Add Note"}
      </button>
    </form>
  );
}