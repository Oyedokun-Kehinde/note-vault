export interface User {
  _id: string;
  username: string;
  email: string;
  fullName?: string;
  avatar?: string;
  bio?: string;
  preferences: {
    theme: 'light' | 'dark' | 'auto';
    defaultView: 'grid' | 'list';
    notificationsEnabled: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Note {
  _id: string;
  title: string;
  content: string;
  category: Category;
  tags: string[];
  cover?: string;
  color?: string;
  isPinned: boolean;
  isFavorite: boolean;
  archived: boolean;
  deleted: boolean;
  deletedAt?: string;
  userId: string;
  sharedWith: SharedUser[];
  reminder?: string;
  attachments: Attachment[];
  checkList: CheckListItem[];
  createdAt: string;
  updatedAt: string;
}

export interface SharedUser {
  user: {
    _id: string;
    username: string;
    email: string;
    avatar?: string;
  };
  permission: 'view' | 'edit';
  sharedAt: string;
}

export interface Attachment {
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedAt: string;
}

export interface CheckListItem {
  text: string;
  completed: boolean;
}

export type Category = 
  | 'Personal' 
  | 'Work' 
  | 'Ideas' 
  | 'Spirituality' 
  | 'Leadership' 
  | 'Journalling' 
  | 'Other';

export const CATEGORIES: Category[] = [
  'Personal',
  'Work',
  'Ideas',
  'Spirituality',
  'Leadership',
  'Journalling',
  'Other',
];

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface NoteFilters {
  search: string;
  category: Category | '';
  tags: string[];
  showArchived: boolean;
  showDeleted: boolean;
  showFavorites: boolean;
  showPinned: boolean;
}

export interface Stats {
  overall: {
    total: number;
    favorites: number;
    pinned: number;
    archived: number;
    deleted: number;
  };
  byCategory: Array<{
    _id: string;
    count: number;
  }>;
}
