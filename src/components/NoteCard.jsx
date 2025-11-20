import { format, isToday, isYesterday, differenceInMinutes } from 'date-fns';

export default function NoteCard({ note, onOpen, onEdit }) {
  const handleCardClick = () => onOpen(note);
  const handleEditClick = (e) => {
    e.stopPropagation();
    onEdit(note);
  };

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

  return (
    <div className="note-card" onClick={handleCardClick}>
      {note.cover && <img src={note.cover} alt="Cover" className="note-cover" />}
      <h3 className="note-title">{note.title}</h3>
      <div className="note-category-chip">{note.category}</div>
      <div className="note-meta">
        <span>Created:</span> {formatRelativeTime(note.createdAt)}
        <span>Modified:</span> {formatRelativeTime(note.updatedAt)}
      </div>
      <div style={{ marginTop: 'auto', textAlign: 'right' }}>
        <button onClick={handleEditClick} className="btn btn-edit" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>
          Edit
        </button>
      </div>
    </div>
  );
}