import { useState, useEffect, useRef } from "react";
import { getCurrentTimestamp } from "../utils";

export default function NoteForm({ onNoteAdded, onNoteUpdated, editingNote, onCancel, categories }) {
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
    if (titleRef.current) titleRef.current.focus();
  }, []);

  const isEditing = !!editingNote;

  const handleSubmit = (e) => {
    e.preventDefault();
    const now = getCurrentTimestamp();
    const noteData = {
      title,
      category,
      content,
      cover,
      archived: false,
      deleted: false,
      ...(isEditing ? { id: editingNote.id, updatedAt: now } : { createdAt: now, updatedAt: now }),
    };
    if (isEditing) {
      onNoteUpdated(noteData);
    } else {
      onNoteAdded(noteData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="button" onClick={onCancel} className="cancel-btn">
        ← Back
      </button>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        {isEditing ? "Edit Note" : "Create New Note"}
      </h2>
      <div className="form-group">
        <input ref={titleRef} type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div className="form-group">
        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="">Select a category</option>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>
      <div className="form-group">
        <input type="url" placeholder="Cover Image URL (optional)" value={cover} onChange={(e) => setCover(e.target.value)} />
      </div>
      <div className="form-group">
        <textarea placeholder="Content (use #hashtags for labels)" value={content} onChange={(e) => setContent(e.target.value)} required />
      </div>
      <button type="submit" className="submit-btn">
        {isEditing ? "Update Note" : "Add Note"}
      </button>
    </form>
  );
}