import { create } from 'zustand';
import api from '../utils/api';
import toast from 'react-hot-toast';
import type { Note, NoteFilters, Stats, Category } from '../types';

interface NoteState extends NoteFilters {
  notes: Note[];
  filteredNotes: Note[];
  currentNote: Note | null;
  isLoading: boolean;
  stats: Stats | null;
  
  fetchNotes: () => Promise<void>;
  fetchNoteById: (id: string) => Promise<void>;
  createNote: (noteData: Partial<Note>) => Promise<Note | void>;
  updateNote: (id: string, noteData: Partial<Note>) => Promise<Note | void>;
  deleteNote: (id: string) => Promise<void>;
  togglePin: (id: string) => Promise<void>;
  toggleFavorite: (id: string) => Promise<void>;
  shareNote: (id: string, userId: string, permission: 'view' | 'edit') => Promise<void>;
  fetchStats: () => Promise<void>;
  
  setSearch: (query: string) => void;
  setCategory: (category: Category | '') => void;
  setTags: (tags: string[]) => void;
  toggleArchived: () => void;
  toggleDeleted: () => void;
  toggleFavoritesFilter: () => void;
  togglePinnedFilter: () => void;
  clearFilters: () => void;
  applyFilters: () => void;
}

const useNoteStore = create<NoteState>((set, get) => ({
  notes: [],
  filteredNotes: [],
  currentNote: null,
  isLoading: false,
  stats: null,
  
  search: '',
  category: '',
  tags: [],
  showArchived: false,
  showDeleted: false,
  showFavorites: false,
  showPinned: false,

  fetchNotes: async () => {
    set({ isLoading: true });
    try {
      const params: any = {};
      if (get().showArchived) params.archived = true;
      if (get().showDeleted) params.deleted = true;
      if (get().showFavorites) params.favorite = true;
      if (get().showPinned) params.pinned = true;
      if (get().category) params.category = get().category;
      if (get().tags.length > 0) params.tags = get().tags.join(',');
      if (get().search) params.search = get().search;

      const response = await api.get('/notes', { params });
      set({ 
        notes: response.data.data.notes,
        isLoading: false 
      });
      get().applyFilters();
    } catch (error) {
      set({ isLoading: false });
      toast.error('Failed to fetch notes');
    }
  },

  fetchNoteById: async (id) => {
    set({ isLoading: true });
    try {
      const response = await api.get(`/notes/${id}`);
      set({ 
        currentNote: response.data.data.note,
        isLoading: false 
      });
    } catch (error) {
      set({ isLoading: false });
      toast.error('Failed to fetch note');
    }
  },

  createNote: async (noteData) => {
    try {
      const response = await api.post('/notes', noteData);
      set({ notes: [response.data.data.note, ...get().notes] });
      get().applyFilters();
      toast.success('Note created successfully');
      return response.data.data.note;
    } catch (error) {
      toast.error('Failed to create note');
    }
  },

  updateNote: async (id, noteData) => {
    try {
      const response = await api.put(`/notes/${id}`, noteData);
      const updatedNote = response.data.data.note;
      set({ 
        notes: get().notes.map(note => 
          note._id === id ? updatedNote : note
        )
      });
      get().applyFilters();
      toast.success('Note updated successfully');
      return updatedNote;
    } catch (error) {
      toast.error('Failed to update note');
    }
  },

  deleteNote: async (id) => {
    try {
      await api.delete(`/notes/${id}`);
      set({ notes: get().notes.filter(note => note._id !== id) });
      get().applyFilters();
      toast.success('Note deleted successfully');
    } catch (error) {
      toast.error('Failed to delete note');
    }
  },

  togglePin: async (id) => {
    try {
      const response = await api.patch(`/notes/${id}/pin`);
      const updatedNote = response.data.data.note;
      set({ 
        notes: get().notes.map(note => 
          note._id === id ? updatedNote : note
        )
      });
      get().applyFilters();
      toast.success(response.data.message);
    } catch (error) {
      toast.error('Failed to toggle pin');
    }
  },

  toggleFavorite: async (id) => {
    try {
      const response = await api.patch(`/notes/${id}/favorite`);
      const updatedNote = response.data.data.note;
      set({ 
        notes: get().notes.map(note => 
          note._id === id ? updatedNote : note
        )
      });
      get().applyFilters();
      toast.success(response.data.message);
    } catch (error) {
      toast.error('Failed to toggle favorite');
    }
  },

  shareNote: async (id, userId, permission) => {
    try {
      await api.post(`/notes/${id}/share`, { userId, permission });
      toast.success('Note shared successfully');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to share note');
    }
  },

  fetchStats: async () => {
    try {
      const response = await api.get('/notes/stats');
      set({ stats: response.data.data });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  },

  setSearch: (query) => {
    set({ search: query });
    get().applyFilters();
  },

  setCategory: (category) => {
    set({ category });
    get().fetchNotes();
  },

  setTags: (tags) => {
    set({ tags });
    get().fetchNotes();
  },

  toggleArchived: () => {
    set({ showArchived: !get().showArchived, showDeleted: false });
    get().fetchNotes();
  },

  toggleDeleted: () => {
    set({ showDeleted: !get().showDeleted, showArchived: false });
    get().fetchNotes();
  },

  toggleFavoritesFilter: () => {
    set({ showFavorites: !get().showFavorites });
    get().fetchNotes();
  },

  togglePinnedFilter: () => {
    set({ showPinned: !get().showPinned });
    get().fetchNotes();
  },

  clearFilters: () => {
    set({
      search: '',
      category: '',
      tags: [],
      showArchived: false,
      showDeleted: false,
      showFavorites: false,
      showPinned: false,
    });
    get().fetchNotes();
  },

  applyFilters: () => {
    let filtered = [...get().notes];

    if (get().search) {
      const query = get().search.toLowerCase();
      filtered = filtered.filter(note =>
        note.title.toLowerCase().includes(query) ||
        note.content.toLowerCase().includes(query) ||
        note.tags?.some(tag => tag.includes(query))
      );
    }

    set({ filteredNotes: filtered });
  },
}));

export default useNoteStore;
