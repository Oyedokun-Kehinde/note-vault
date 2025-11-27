import { create } from 'zustand';
import api from '../utils/api';
import toast from 'react-hot-toast';

const useNoteStore = create((set, get) => ({
  notes: [],
  filteredNotes: [],
  currentNote: null,
  isLoading: false,
  stats: null,
  
  // Filters
  searchQuery: '',
  selectedCategory: '',
  selectedTags: [],
  showArchived: false,
  showDeleted: false,
  showFavorites: false,

  fetchNotes: async () => {
    set({ isLoading: true });
    try {
      const params = {};
      if (get().showArchived) params.archived = true;
      if (get().showDeleted) params.deleted = true;
      if (get().showFavorites) params.favorite = true;
      if (get().selectedCategory) params.category = get().selectedCategory;
      if (get().selectedTags.length > 0) params.tags = get().selectedTags.join(',');
      if (get().searchQuery) params.search = get().searchQuery;

      const response = await api.get('/notes', { params });
      set({ 
        notes: response.data.data.notes,
        isLoading: false 
      });
      get().applyFilters();
    } catch (error) {
      set({ isLoading: false });
      toast.error('Failed to fetch notes');
      console.error(error);
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
      throw error;
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
      throw error;
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
      const response = await api.post(`/notes/${id}/share`, { userId, permission });
      toast.success('Note shared successfully');
      return response.data.data.note;
    } catch (error) {
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

  // Filter methods
  setSearchQuery: (query) => {
    set({ searchQuery: query });
    get().applyFilters();
  },

  setSelectedCategory: (category) => {
    set({ selectedCategory: category });
    get().fetchNotes();
  },

  setSelectedTags: (tags) => {
    set({ selectedTags: tags });
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

  applyFilters: () => {
    let filtered = [...get().notes];

    if (get().searchQuery) {
      const query = get().searchQuery.toLowerCase();
      filtered = filtered.filter(note =>
        note.title.toLowerCase().includes(query) ||
        note.content.toLowerCase().includes(query) ||
        note.tags?.some(tag => tag.includes(query))
      );
    }

    set({ filteredNotes: filtered });
  },

  clearFilters: () => {
    set({
      searchQuery: '',
      selectedCategory: '',
      selectedTags: [],
      showArchived: false,
      showDeleted: false,
      showFavorites: false
    });
    get().fetchNotes();
  }
}));

export default useNoteStore;
