import { useEffect } from 'react';

interface ShortcutConfig {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  action: () => void;
  description?: string;
}

/**
 * Custom hook for keyboard shortcuts
 */
export const useKeyboardShortcuts = (shortcuts: ShortcutConfig[]) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      for (const shortcut of shortcuts) {
        const keyMatches = event.key.toLowerCase() === shortcut.key.toLowerCase();
        const ctrlMatches = shortcut.ctrl ? event.ctrlKey || event.metaKey : !event.ctrlKey && !event.metaKey;
        const shiftMatches = shortcut.shift ? event.shiftKey : !event.shiftKey;
        const altMatches = shortcut.alt ? event.altKey : !event.altKey;

        if (keyMatches && ctrlMatches && shiftMatches && altMatches) {
          event.preventDefault();
          shortcut.action();
          break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
};

/**
 * Default keyboard shortcuts for NoteVault
 */
export const defaultShortcuts = {
  NEW_NOTE: { key: 'n', ctrl: true, description: 'Create new note' },
  SEARCH: { key: 'k', ctrl: true, description: 'Focus search' },
  SAVE: { key: 's', ctrl: true, description: 'Save current note' },
  DELETE: { key: 'delete', ctrl: true, description: 'Delete current note' },
  ARCHIVE: { key: 'e', ctrl: true, description: 'Archive current note' },
  FAVORITE: { key: 'f', ctrl: true, shift: true, description: 'Toggle favorite' },
  PIN: { key: 'p', ctrl: true, shift: true, description: 'Toggle pin' },
  TOGGLE_VIEW: { key: 'g', ctrl: true, description: 'Toggle grid/list view' },
  EXPORT_PDF: { key: 'e', ctrl: true, shift: true, description: 'Export to PDF' },
  EXPORT_MD: { key: 'm', ctrl: true, shift: true, description: 'Export to Markdown' },
};
