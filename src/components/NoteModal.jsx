// src/components/NoteModal.jsx
import { format } from 'date-fns';
import { extractHashtags } from '../utils';

export default function NoteModal({ note, onClose, onAction }) {
  // 🔒 FINAL SAFETY: exit if note is missing
  if (!note || !note.id) {
    return null;
  }

  const content = note.content || '';
  const labels = extractHashtags(content);
  const isArchived = note.archived === true;
  const isDeleted = note.deleted === true;
  const isActive = !isArchived && !isDeleted;

  const handleShare = async () => {
    const url = `${window.location.origin}/note/${note.id}`;
    try {
      await navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    } catch (err) {
      alert('Failed to copy link');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{note.title || 'Untitled'}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        {note.cover && <img src={note.cover} alt="Cover" className="modal-cover" />}

        <div className="modal-scrollable">
          <div className="modal-category-chip">{note.category || 'Uncategorized'}</div>
          
          {labels.length > 0 && (
            <div className="modal-labels">
              {labels.map((label, i) => (
                <span key={i} className="modal-label">#{label}</span>
              ))}
            </div>
          )}

          <div className="modal-timestamps">
            <p><strong>Created:</strong> <span>{note.createdAt ? format(new Date(note.createdAt), 'PPpp') : '—'}</span></p>
            <p><strong>Last Modified:</strong> <span>{note.updatedAt ? format(new Date(note.updatedAt), 'PPpp') : '—'}</span></p>
          </div>
          
          <div className="modal-content-text">
            {content.split('\n').map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </div>

        <div className="modal-actions">
          <button onClick={handleShare} className="btn btn-primary">Share</button>
          
          {isActive && (
            <>
              <button onClick={() => onAction(note.id, 'edit')} className="btn btn-edit">Edit</button>
              <button onClick={() => onAction(note.id, 'archive')} className="btn btn-archive">Archive</button>
              <button onClick={() => onAction(note.id, 'delete')} className="btn btn-delete">Move to Trash</button>
            </>
          )}

          {isArchived && (
            <>
              <button onClick={() => onAction(note.id, 'unarchive')} className="btn btn-restore">Unarchive</button>
              <button onClick={() => onAction(note.id, 'delete')} className="btn btn-delete">Move to Trash</button>
            </>
          )}

          {isDeleted && (
            <>
              <button onClick={() => onAction(note.id, 'restore')} className="btn btn-restore">Restore</button>
              <button 
                onClick={() => onAction(note.id, 'permanent-delete')} 
                className="btn btn-delete"
              >
                Delete Permanently
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}