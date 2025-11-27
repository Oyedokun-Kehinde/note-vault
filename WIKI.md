# NoteVault Wiki - Complete Documentation 📚

Welcome to the **NoteVault Wiki**! This is your complete guide to understanding, building, deploying, and extending the world's best note-taking application.

---

## 📖 Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Getting Started](#getting-started)
4. [Features Guide](#features-guide)
5. [Development](#development)
6. [Deployment](#deployment)
7. [API Documentation](#api-documentation)
8. [Database Schema](#database-schema)
9. [Troubleshooting](#troubleshooting)
10. [Contributing](#contributing)
11. [FAQ](#faq)

---

## Overview

### What is NoteVault?

NoteVault is a **premium, full-stack TypeScript note-taking application** built with the MERN stack (MongoDB/PostgreSQL, Express, React, Node.js). It features:

- ✅ **Rich Text Editing** with Tiptap (15+ formatting options)
- ✅ **TypeScript** for complete type safety
- ✅ **Tailwind CSS** for beautiful, responsive UI
- ✅ **Supabase PostgreSQL** for scalable database
- ✅ **Prisma ORM** for type-safe queries
- ✅ **Export** to PDF, Markdown, JSON
- ✅ **Keyboard Shortcuts** for power users
- ✅ **Note Templates** for quick creation
- ✅ **Dark Mode** with toggle
- ✅ **Analytics Dashboard** with charts

### Technology Stack

**Frontend:**
- React 19
- TypeScript 5.0
- Tailwind CSS 3.4
- Tiptap (Rich Text Editor)
- Zustand (State Management)
- React Router v7
- Recharts (Analytics)
- React Hot Toast (Notifications)
- Lucide React (Icons)

**Backend:**
- Node.js 18+
- Express.js 4.18
- Prisma ORM 5.22
- JWT Authentication
- bcryptjs (Password Hashing)

**Database:**
- Supabase PostgreSQL
- 9 tables with relations
- Full-text search
- Automatic migrations

**DevOps:**
- Docker & Docker Compose
- Nginx (Production)
- Vite (Dev Server)
- Git & GitHub

---

## Architecture

### System Design

```
┌─────────────────────────────────────────┐
│           Client Browser                │
│  (React 19 + TypeScript + Tailwind)    │
└──────────────┬──────────────────────────┘
               │ HTTP/REST
               ▼
┌─────────────────────────────────────────┐
│         Express.js Backend              │
│    (Controllers + Routes + Middleware)  │
└──────────────┬──────────────────────────┘
               │ Prisma ORM
               ▼
┌─────────────────────────────────────────┐
│      Supabase PostgreSQL Database       │
│  (9 Tables + Relations + Indexes)      │
└─────────────────────────────────────────┘
```

### Project Structure

```
note-app/
├── backend/                  # Express.js API
│   ├── controllers/         # Request handlers
│   ├── models/             # (Legacy Mongoose - to be removed)
│   ├── routes/             # API routes
│   ├── middleware/         # Auth, error handling
│   ├── prisma/             # Prisma ORM
│   │   ├── schema.prisma  # Database schema
│   │   ├── client.js      # Prisma client
│   │   ├── seed.js        # Database seeding
│   │   └── migrations/    # Database migrations
│   ├── server.js          # Entry point
│   ├── package.json
│   └── .env               # Environment variables
│
├── frontend/               # React app
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── Auth/     # Login, Register
│   │   │   ├── Editor/   # Rich text editor
│   │   │   └── Layout/   # Navbar, DarkMode
│   │   ├── pages/        # Page components
│   │   │   ├── Auth/     # Auth pages
│   │   │   ├── NotesPage.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Profile.tsx
│   │   │   ├── Archive.tsx
│   │   │   └── RecycleBin.tsx
│   │   ├── store/        # Zustand stores
│   │   │   ├── useAuthStore.ts
│   │   │   └── useNoteStore.ts
│   │   ├── utils/        # Utilities
│   │   │   ├── api.ts
│   │   │   └── exportUtils.ts
│   │   ├── hooks/        # Custom hooks
│   │   │   └── useKeyboardShortcuts.ts
│   │   ├── lib/          # Third-party configs
│   │   │   └── supabase.ts
│   │   ├── types/        # TypeScript types
│   │   │   └── index.ts
│   │   ├── App.tsx       # Main router
│   │   ├── main.tsx      # Entry point
│   │   └── index.css     # Tailwind styles
│   ├── public/
│   │   └── favicon.svg   # App icon
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── tsconfig.json
│
├── docker-compose.yml     # Docker orchestration
├── README.md             # Main documentation
├── WIKI.md               # This file
├── SUPABASE_MIGRATION.md # Migration guide
├── LICENSE               # MIT License
└── .gitignore
```

---

## Getting Started

### Prerequisites

**Required:**
- Node.js 18+ ([Download](https://nodejs.org/))
- npm or yarn
- Git
- Supabase account (free tier) or PostgreSQL

**Optional:**
- Docker & Docker Compose
- VS Code with extensions:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - Prisma

### Installation

**1. Clone the repository:**
```bash
git clone https://github.com/Oyedokun-Kehinde/note-vault.git
cd note-vault
```

**2. Setup Backend:**
```bash
cd backend
npm install

# Create .env file
cp .env.example .env

# Edit .env with your Supabase connection string
# DATABASE_URL="postgresql://..."
```

**3. Setup Database:**
```bash
# Run Prisma migrations
npm run db:migrate

# Seed with demo data
npm run db:seed

# (Optional) Open Prisma Studio
npm run db:studio
```

**4. Setup Frontend:**
```bash
cd ../frontend
npm install --legacy-peer-deps

# Create .env file
cp .env.example .env

# Edit .env with your configuration
```

**5. Start Development Servers:**

Terminal 1 (Backend):
```bash
cd backend
npm run dev
# Runs on http://localhost:5000
```

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
# Runs on http://localhost:5173
```

**6. Access the App:**
- Open http://localhost:5173
- Login with demo account:
  - Email: `demo@notevault.com`
  - Password: `Demo123!`

---

## Features Guide

### 1. Rich Text Editing

**Tiptap Editor Features:**
- **Text Formatting:** Bold, Italic, Strikethrough, Code
- **Headings:** H1, H2, H3
- **Lists:** Bullet lists, Numbered lists, Task lists
- **Links:** Add clickable links
- **Images:** Embed images via URL
- **Quotes:** Blockquotes
- **Highlighting:** Mark important text
- **Undo/Redo:** Full history

**Usage:**
1. Click "New Note"
2. Use toolbar buttons or markdown shortcuts
3. Markdown shortcuts:
   - `# ` for H1
   - `## ` for H2
   - `- ` for bullet list
   - `[ ]` for task list
   - `> ` for quote

### 2. Export Features

**Export to PDF:**
```typescript
import { exportToPDF } from './utils/exportUtils';

// In your component
const handleExportPDF = async () => {
  await exportToPDF(note);
};
```

**Export to Markdown:**
```typescript
import { exportToMarkdown } from './utils/exportUtils';

const handleExportMarkdown = () => {
  exportToMarkdown(note);
};
```

**Export to JSON:**
```typescript
import { exportToJSON, exportAllNotes } from './utils/exportUtils';

// Single note
exportToJSON(note);

// All notes
exportAllNotes(notes);
```

### 3. Keyboard Shortcuts

**Available Shortcuts:**

| Shortcut | Action |
|----------|--------|
| `Ctrl+N` | Create new note |
| `Ctrl+K` | Focus search |
| `Ctrl+S` | Save current note |
| `Ctrl+Delete` | Delete current note |
| `Ctrl+E` | Archive current note |
| `Ctrl+Shift+F` | Toggle favorite |
| `Ctrl+Shift+P` | Toggle pin |
| `Ctrl+G` | Toggle grid/list view |
| `Ctrl+Shift+E` | Export to PDF |
| `Ctrl+Shift+M` | Export to Markdown |

**Implementation:**
```typescript
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';

// In your component
useKeyboardShortcuts([
  {
    key: 'n',
    ctrl: true,
    action: () => createNote(),
    description: 'Create new note'
  },
  // ... more shortcuts
]);
```

### 4. Note Templates

**Using Templates:**
1. Click "New Note"
2. Select a template from dropdown
3. Template content auto-fills
4. Customize as needed

**Available Templates:**
- Meeting Notes
- Daily Journal
- Project Plan
- Book Notes
- Sermon Notes

**Creating Custom Templates:**
```typescript
const template = await prisma.noteTemplate.create({
  data: {
    name: 'My Template',
    description: 'Custom template',
    category: 'Work',
    content: '<h1>Template Title</h1>...',
    tags: ['custom'],
    userId: user.id,
  },
});
```

### 5. Dark Mode

**Toggle Dark Mode:**
- Click sun/moon icon in navbar
- Persists in localStorage
- Applies to entire app

**Using in Components:**
```tsx
// Tailwind dark mode classes
<div className="bg-white dark:bg-gray-800">
  <p className="text-gray-900 dark:text-white">Text</p>
</div>
```

---

## Development

### Development Workflow

**1. Create a new feature:**
```bash
git checkout -b feature/my-feature
```

**2. Make changes:**
- Edit files in `src/`
- Hot reload automatically refreshes

**3. Test changes:**
- Test in browser
- Check console for errors
- Validate TypeScript: `npm run build`

**4. Commit changes:**
```bash
git add .
git commit -m "feat: add my feature"
git push origin feature/my-feature
```

**5. Create Pull Request**

### Code Style

**TypeScript:**
- Use interfaces for types
- Avoid `any` type
- Enable strict mode
- Use descriptive names

**React:**
- Functional components only
- Use hooks (useState, useEffect, custom hooks)
- Extract reusable components
- Props drilling → Zustand store

**Tailwind:**
- Use utility classes
- Create custom classes in `@layer components`
- Responsive: `md:`, `lg:` prefixes
- Dark mode: `dark:` prefix

### Adding New Features

**Example: Add Voice Notes**

**1. Install dependencies:**
```bash
npm install --legacy-peer-deps react-mic
```

**2. Create component:**
```typescript
// src/components/VoiceRecorder.tsx
export default function VoiceRecorder() {
  // Implementation
}
```

**3. Add to database:**
```prisma
// prisma/schema.prisma
model VoiceNote {
  id        String   @id @default(uuid())
  noteId    String
  note      Note     @relation(fields: [noteId], references: [id])
  audioUrl  String
  duration  Int
  createdAt DateTime @default(now())
}
```

**4. Run migration:**
```bash
npm run db:migrate
```

**5. Update API:**
```javascript
// backend/routes/voice.routes.js
router.post('/upload', uploadVoice);
```

---

## Deployment

### Docker Deployment

**1. Build and run with Docker Compose:**
```bash
docker-compose up -d
```

**Services:**
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- Database: Managed by Supabase

**2. View logs:**
```bash
docker-compose logs -f
```

**3. Stop services:**
```bash
docker-compose down
```

### Production Deployment

**Recommended Platforms:**

**Frontend:**
- Vercel (Recommended)
- Netlify
- AWS Amplify
- Cloudflare Pages

**Backend:**
- Railway (Recommended)
- Render
- Heroku
- AWS EC2

**Database:**
- Supabase (Current)
- AWS RDS PostgreSQL
- DigitalOcean Managed PostgreSQL

### Vercel Deployment (Frontend)

**1. Connect GitHub repo:**
- Go to https://vercel.com
- Import your repository
- Select `frontend` as root directory

**2. Configure build:**
```
Build Command: npm run build
Output Directory: dist
Install Command: npm install --legacy-peer-deps
```

**3. Environment Variables:**
```
VITE_API_URL=https://your-backend.railway.app/api
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

**4. Deploy:**
- Click "Deploy"
- Done! Your app is live

### Railway Deployment (Backend)

**1. Create new project:**
- Go to https://railway.app
- New Project → Deploy from GitHub
- Select your repository

**2. Configure:**
- Root directory: `backend`
- Start command: `npm start`

**3. Environment Variables:**
```
DATABASE_URL=your-supabase-url
JWT_SECRET=your-secret-key
NODE_ENV=production
PORT=5000
```

**4. Deploy:**
- Railway automatically deploys

---

## API Documentation

### Authentication Endpoints

**POST /api/auth/register**
```typescript
Request:
{
  username: string;
  email: string;
  password: string;
  fullName?: string;
}

Response:
{
  success: true,
  data: {
    token: string;
    user: User;
  }
}
```

**POST /api/auth/login**
```typescript
Request:
{
  email: string;
  password: string;
}

Response:
{
  success: true,
  data: {
    token: string;
    user: User;
  }
}
```

**GET /api/auth/me**
```typescript
Headers: { Authorization: "Bearer <token>" }

Response:
{
  success: true,
  data: {
    user: User;
  }
}
```

### Notes Endpoints

**GET /api/notes**
```typescript
Query Parameters:
- search?: string
- category?: string
- tags?: string[]
- archived?: boolean
- deleted?: boolean
- favorite?: boolean
- pinned?: boolean

Response:
{
  success: true,
  data: {
    notes: Note[];
    count: number;
  }
}
```

**POST /api/notes**
```typescript
Request:
{
  title: string;
  content: string;
  category: string;
  tags?: string[];
  cover?: string;
  color?: string;
}

Response:
{
  success: true,
  data: {
    note: Note;
  }
}
```

**GET /api/notes/:id**
**PUT /api/notes/:id**
**DELETE /api/notes/:id**
**PATCH /api/notes/:id/pin**
**PATCH /api/notes/:id/favorite**
**POST /api/notes/:id/share**

### Stats Endpoints

**GET /api/notes/stats**
```typescript
Response:
{
  success: true,
  data: {
    overall: {
      total: number;
      favorites: number;
      pinned: number;
      archived: number;
      deleted: number;
    },
    byCategory: Array<{
      _id: string;
      count: number;
    }>
  }
}
```

---

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username VARCHAR UNIQUE NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  password VARCHAR NOT NULL,
  full_name VARCHAR,
  avatar VARCHAR,
  bio TEXT,
  theme VARCHAR DEFAULT 'auto',
  default_view VARCHAR DEFAULT 'grid',
  notifications_enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Notes Table
```sql
CREATE TABLE notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR NOT NULL,
  content TEXT NOT NULL,
  content_type VARCHAR DEFAULT 'html',
  category VARCHAR NOT NULL,
  tags VARCHAR[],
  color VARCHAR,
  cover VARCHAR,
  is_pinned BOOLEAN DEFAULT false,
  is_favorite BOOLEAN DEFAULT false,
  archived BOOLEAN DEFAULT false,
  deleted BOOLEAN DEFAULT false,
  deleted_at TIMESTAMP,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  template_id UUID REFERENCES note_templates(id),
  reminder TIMESTAMP,
  view_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**Full schema:** See `backend/prisma/schema.prisma`

---

## Troubleshooting

### Common Issues

**1. PostCSS/Tailwind Error**
```
Error: @tailwindcss/postcss not found
```

**Solution:**
```bash
cd frontend
npm install tailwindcss postcss autoprefixer --legacy-peer-deps
```

**2. Prisma Client Not Generated**
```
Error: @prisma/client not found
```

**Solution:**
```bash
cd backend
npm run db:generate
```

**3. Database Connection Failed**
```
Error: Can't reach database server
```

**Solution:**
- Check `DATABASE_URL` in `.env`
- Verify Supabase project is active
- Check network/firewall settings

**4. Port Already in Use**
```
Error: Port 5000 is already in use
```

**Solution:**
```bash
# Kill process on port
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:5000 | xargs kill -9
```

**5. React 19 Dependency Conflicts**
```
Error: ERESOLVE unable to resolve dependency
```

**Solution:**
```bash
npm install --legacy-peer-deps
```

### Build Issues

**TypeScript Errors:**
```bash
# Check for type errors
npm run build

# Fix auto-fixable issues
npm run lint -- --fix
```

**CSS Not Loading:**
- Check `tailwind.config.js` content paths
- Verify PostCSS config
- Clear browser cache

**Bundle Size Too Large:**
- Code splitting with React.lazy()
- Tree shaking (auto with Vite)
- Remove unused dependencies

---

## Contributing

### How to Contribute

1. **Fork the repository**
2. **Create feature branch:** `git checkout -b feature/amazing-feature`
3. **Commit changes:** `git commit -m 'Add amazing feature'`
4. **Push to branch:** `git push origin feature/amazing-feature`
5. **Open Pull Request**

### Contribution Guidelines

- Write clean, documented code
- Follow existing code style
- Add tests for new features
- Update documentation
- One feature per PR

### Code of Conduct

- Be respectful
- Be collaborative
- Be constructive
- Help others learn

---

## FAQ

**Q: Can I use MongoDB instead of PostgreSQL?**
A: Yes, but you'll need to replace Prisma with Mongoose and update all queries.

**Q: How do I add more categories?**
A: Update `CATEGORIES` array in `frontend/src/types/index.ts`

**Q: Can I self-host instead of Supabase?**
A: Yes! Use any PostgreSQL database and update `DATABASE_URL`.

**Q: How do I enable real-time features?**
A: Use Supabase Realtime subscriptions in your React components.

**Q: Is this production-ready?**
A: Yes! Already includes authentication, security headers, rate limiting, and error handling.

**Q: Can I white-label this?**
A: Yes! Update branding in `tailwind.config.js`, replace logo, update name.

**Q: How do I backup my data?**
A: Use Supabase dashboard → Database → Backups, or `pg_dump` command.

---

## Resources

### Official Documentation
- [React Docs](https://react.dev/)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tiptap Docs](https://tiptap.dev/docs)

### Community
- [GitHub Issues](https://github.com/Oyedokun-Kehinde/note-vault/issues)
- [Discussions](https://github.com/Oyedokun-Kehinde/note-vault/discussions)

### Tools
- [Prisma Studio](http://localhost:5555) - Database GUI
- [Supabase Dashboard](https://supabase.com/dashboard)

---

**Last Updated:** November 27, 2025  
**Version:** 1.0.0  
**Author:** Oyedokun Kehinde

---

© 2025 NoteVault. Licensed under MIT.
