import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    maxlength: [50000, 'Content cannot exceed 50000 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Personal', 'Work', 'Ideas', 'Spirituality', 'Leadership', 'Journalling', 'Other']
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  cover: {
    type: String,
    default: null
  },
  color: {
    type: String,
    default: null
  },
  isPinned: {
    type: Boolean,
    default: false
  },
  isFavorite: {
    type: Boolean,
    default: false
  },
  archived: {
    type: Boolean,
    default: false
  },
  deleted: {
    type: Boolean,
    default: false
  },
  deletedAt: {
    type: Date,
    default: null
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  sharedWith: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    permission: {
      type: String,
      enum: ['view', 'edit'],
      default: 'view'
    },
    sharedAt: {
      type: Date,
      default: Date.now
    }
  }],
  reminder: {
    type: Date,
    default: null
  },
  attachments: [{
    name: String,
    url: String,
    type: String,
    size: Number,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  checkList: [{
    text: String,
    completed: {
      type: Boolean,
      default: false
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Indexes for better query performance
noteSchema.index({ userId: 1, deleted: 1, archived: 1 });
noteSchema.index({ userId: 1, createdAt: -1 });
noteSchema.index({ tags: 1 });
noteSchema.index({ title: 'text', content: 'text' });

// Update timestamp on save
noteSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Soft delete - set deletedAt when deleted is true
noteSchema.pre('save', function(next) {
  if (this.isModified('deleted') && this.deleted === true) {
    this.deletedAt = Date.now();
  }
  next();
});

// Extract hashtags from content and add to tags
noteSchema.pre('save', function(next) {
  if (this.isModified('content')) {
    const hashtags = this.content.match(/#[\w]+/g);
    if (hashtags) {
      const newTags = hashtags.map(tag => tag.slice(1).toLowerCase());
      this.tags = [...new Set([...this.tags, ...newTags])];
    }
  }
  next();
});

const Note = mongoose.model('Note', noteSchema);

export default Note;
