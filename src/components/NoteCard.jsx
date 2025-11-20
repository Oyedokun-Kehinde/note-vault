// src/components/NoteCard.jsx
import axios from 'axios';
import {
  format,
  isToday,
  isYesterday,
  differenceInMinutes
} from 'date-fns';
import { truncateText } from '../utils';

export default function NoteCard({ note, onDelete, onEdit }) {
  const handleDelete = async (e) => {
    e.stopPropagation();
    if (window.confirm('Delete this note?')) {
      try {
        await axios.delete(`http://localhost:3001/notes/${note.id}`);
        onDelete(note.id);
      } catch (err) {
        console.error('Delete failed:', err);
        alert('Failed to delete note');
      }
    }
  };

  const handleCardClick = () => {
    onEdit(note);
  };

  const preview = truncateText(note.content, 200);

  const formatRelativeTime = (date) => {
    const now = new Date();
    const d = new Date(date);
    const diffInMin = differenceInMinutes(now, d);

    if (diffInMin < 1) return 'Just now';
    if (diffInMin < 60) return `${diffInMin}m ago`;
    if (isToday(d)) return `Today, ${format(d, 'h:mm a')}`;
    if (isYesterday(d)) return 'Yesterday';
    return format(d, 'MMM d');
  };

  const createdDisplay = formatRelativeTime(note.createdAt);
  const modifiedDisplay = formatRelativeTime(note.updatedAt);

  return (
    <div className="note-card" onClick={handleCardClick}>
      {note.cover && <img src={note.cover} alt="Cover" className="note-cover" />}
      <h3 className="note-title">{note.title}</h3>
      <p className="note-content-preview">{preview}</p>

      <div className="note-category-chip">{note.category}</div>

      <div className="note-meta">
        <span>Created:</span> {createdDisplay}
        <span>Modified:</span> {modifiedDisplay}
      </div>

      <div className="btn-group" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => onEdit(note)} className="btn btn-edit">
          Edit
        </button>
        <button onClick={handleDelete} className="btn btn-delete">
          Delete
        </button>
      </div>
    </div>
  );
}