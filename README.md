# 🔒 NoteVault - Secure Note-Taking Application

A **modern, full-stack note-taking application** with **secure vault features**, built with **TypeScript**, **React**, **Tiptap Rich Text Editor**, **Prisma ORM**, and **Supabase PostgreSQL**. Professional, production-ready with enterprise-grade architecture.

![NoteVault Preview](https://img.shields.io/badge/TypeScript-5.0-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8) ![React](https://img.shields.io/badge/React-19-61dafb) ![Prisma](https://img.shields.io/badge/Prisma-5.22-2D3748) ![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E)

## ⭐ Key Features

- 🔒 **Vault Theme** - Security-focused design with padlock branding
- ✍️ **Rich Text Editing** - Tiptap editor with bold, italic, lists, links, images, and more
- 🔐 **Secure Authentication** - JWT tokens with bcrypt password hashing
- 📊 **Personalized Dashboard** - Time-based greetings, recent notes, visual analytics
- 🏷️ **User-Defined Categories** - Create your own custom categories
- 🎯 **Tag System** - Organize with unlimited custom tags
- 🔍 **Global Search** - Search bar in header, available everywhere
- 📌 **Pin & Favorite** - Quick access to important notes
- 🌙 **Dark Mode** - Full dark theme support
- 📱 **Responsive** - Works on mobile, tablet, and desktop
- ⚡ **Type-Safe** - 100% TypeScript with Prisma ORM
- 🗄️ **PostgreSQL** - Reliable Supabase-hosted database

## ✨ Complete Feature Set

### 🔐 Authentication & Security
- ✅ User Registration & Login with JWT authentication
- ✅ Secure password hashing using bcrypt
- ✅ Protected routes and API endpoints
- ✅ Session management with persistent auth
- ✅ Automatic token handling with Axios interceptors

### ✍️ Rich Text Editor (Tiptap)
- ✅ **Text Formatting:** Bold, Italic, Strikethrough, Code
- ✅ **Headings:** H1, H2, H3 with proper styling
- ✅ **Lists:** Bullet lists, Numbered lists, Task lists (checkboxes)
- ✅ **Links:** Add and manage hyperlinks
- ✅ **Images:** Insert images via URL
- ✅ **Quotes:** Blockquotes for citations
- ✅ **Highlighting:** Mark important text
- ✅ **Undo/Redo:** Full history management
- ✅ **Code Blocks:** Syntax highlighting support

### 📝 Note Management
- ✅ Create, Read, Update, Delete notes
- ✅ **Pin Notes:** Keep important notes at the top
- ✅ **Favorite Notes:** Star your most important notes
- ✅ **User-Defined Categories:** Create unlimited custom categories with colors and icons
- ✅ **Custom Tags:** Organize with user-created tags
- ✅ **Cover Images:** Add visual appeal to notes
- ✅ **Archive:** Hide notes without deleting
- ✅ **Recycle Bin:** Soft delete with 30-day recovery
- ✅ **Global Search:** Search from anywhere via header search bar
- ✅ **Advanced Filters:** Filter by category, tags, favorites, pinned status
- ✅ **View Modes:** Switch between Grid and List views
- ✅ **Rich Content:** Full HTML support with Tiptap editor

### 📊 Analytics Dashboard
- ✅ **Statistics Cards:** Total notes, favorites, pinned, archived, deleted
- ✅ **Bar Chart:** Notes distribution by category
- ✅ **Pie Chart:** Category proportions visualization
- ✅ **Recharts Integration:** Interactive, responsive charts

### 👤 User Profile & Customization
- ✅ View and edit profile information
- ✅ Update bio and avatar
- ✅ Account creation date display
- ✅ Secure logout with confirmation
- ✅ **Custom Categories:** Create and manage your own categories
- ✅ **Custom Tags:** Build your tag system
- ✅ **Theme Preferences:** Light/Dark mode
- ✅ **View Preferences:** Grid/List default view

### 🎨 UI/UX Excellence
- ✅ **Vault Theme:** Padlock icon branding for security feel
- ✅ **Collapsible Sidebar:** Space-efficient navigation with tooltips
- ✅ **Sticky Header:** Always accessible with global search
- ✅ **Dark Mode:** Full dark theme support
- ✅ **Responsive Design:** Mobile-first, works on all devices
- ✅ **Gradient Accents:** Purple to Cyan vault theme
- ✅ **Smooth Animations:** Polished hover and transition effects
- ✅ **Toast Notifications:** Real-time feedback
- ✅ **Confirmation Modals:** For destructive actions (delete, logout)
- ✅ **Loading States:** Professional spinners
- ✅ **Time-Based Greetings:** Personalized dashboard messages

### 🛠️ Developer Experience
- ✅ **100% TypeScript:** Complete type safety
- ✅ **Type Definitions:** Full interfaces for all data models
- ✅ **Zustand State Management:** Lightweight, TypeScript-first
- ✅ **Axios Interceptors:** Automatic auth token injection
- ✅ **ESLint + Prettier:** Code quality enforcement
- ✅ **Vite:** Lightning-fast build tool
- ✅ **Hot Module Replacement:** Instant development feedback

### 📝 Advanced Note Management
- **Rich Text Editor** with markdown support
- **Category organization** (Personal, Work, Ideas, Spirituality, Leadership, Journalling, Other)
- **Hashtag support** with automatic tag extraction
- **Pin important notes** to the top
- **Favorite notes** for quick access
- **Archive & Trash** with soft delete
- **Cover images** for visual organization
- **Color coding** for notes
- **Checklist support** within notes
- **File attachments** (planning feature)

### 🔍 Powerful Search & Filters
- **Full-text search** across title, content, and tags
- **Filter by category**, tags, favorites, archived, or deleted
- **Advanced search** with MongoDB text indexes
- **Real-time filtering** as you type

### 📊 Analytics & Insights
- **Dashboard with statistics** (total notes, favorites, archived, deleted)
- **Category distribution charts** (Bar & Pie charts)
- **Usage analytics** and trends
- **Visual data representation** with Recharts

### 🤝 Collaboration (Planned)
- **Share notes** with other users
- **View & Edit permissions**
- **Collaborative editing** (future enhancement)
- **User search** for sharing

### 🎨 Modern UI/UX
- **Responsive design** (Mobile, Tablet, Desktop)
- **Grid & List view modes**
- **Dark mode support** (planned)
- **Smooth animations** with Framer Motion
- **Toast notifications** for user feedback
- **Skeleton loaders** for better UX
- **Lucide React icons** throughout

### ⚡ Performance & Optimization
- **State management** with Zustand
- **Optimized API calls** with Axios interceptors
- **Database indexing** for fast queries
- **Rate limiting** to prevent abuse
- **Compression** for faster responses
- **Error boundary** for graceful error handling

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime environment |
| **Express.js** | Web framework |
| **Supabase PostgreSQL** | Database (cloud-hosted) |
| **Prisma ORM v5.22** | Type-safe database client |
| **JWT** | Authentication tokens |
| **bcryptjs** | Password hashing |
| **helmet** | Security headers |
| **cors** | Cross-origin requests |
| **morgan** | HTTP request logger |
| **compression** | Response compression |
| **express-rate-limit** | Rate limiting |

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 19** | UI library |
| **TypeScript** | Type safety |
| **Vite** | Build tool & dev server |
| **React Router v6** | Client-side routing |
| **Zustand** | Lightweight state management |
| **Axios** | HTTP client with interceptors |
| **Tiptap** | Rich text editor (Prosemirror) |
| **Recharts** | Data visualization |
| **Lucide React** | Modern icon library |
| **React Hot Toast** | Toast notifications |
| **date-fns** | Date formatting |
| **Tailwind CSS v3.4** | Utility-first CSS |
| **Login & Registration** | JWT authentication, secure password hashing, form validation |
| **Rich Text Editor** | Tiptap editor with 15+ formatting options |
| **Note Management** | Full CRUD, pin, favorite, archive, delete, cover images |
| **Analytics Dashboard** | Statistics cards, bar charts, pie charts with Recharts |
| **User Profile** | Update profile, avatar, bio, view account details |
| **Search & Filter** | Full-text search, category filters, favorites filter |
| **Archive & Recycle Bin** | Soft delete, archive notes, recover from trash |
| **Dark Mode** | Toggle between light and dark themes |
| **Responsive UI** | Mobile-first design, works on all devices |
| **Framer Motion** | Animations |
| **Lucide React** | Icons |
| **React Hot Toast** | Notifications |
| **date-fns** | Date formatting |

## Project Structure
## 📂 Project Structure

```
note-app/
├── backend/                    # Express.js backend
│   ├── controllers/           # Request handlers
│   │   ├── auth.controller.prisma.js
│   │   └── note.controller.prisma.js
│   ├── prisma/                # Prisma ORM
│   │   ├── schema.prisma     # Database schema
│   │   ├── client.js          # Prisma client
│   │   └── seed.js            # Database seeding
│   ├── routes/                # API routes
│   │   ├── auth.routes.prisma.js
│   │   └── note.routes.prisma.js
│   ├── middleware/            # Custom middleware
│   │   └── auth.middleware.prisma.js
│   ├── server.js              # Entry point
│   ├── package.json
│   └── .env
│
├── frontend/                  # React + TypeScript frontend
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── Editor/       # RichTextEditor (Tiptap)
│   │   │   ├── Layout/       # Sidebar, DashboardHeader, MainLayout
│   │   │   └── Notes/        # QuickNoteModal
│   │   ├── pages/            # Page components
│   │   │   ├── Auth/         # Login.tsx, Register.tsx
│   │   │   ├── Dashboard.tsx # Personalized dashboard
│   │   │   ├── NotesPage.tsx # All notes view
│   │   │   ├── Archive.tsx   # Archived notes
│   │   │   ├── RecycleBin.tsx # Deleted notes
│   │   │   └── Profile.tsx   # User settings
│   │   ├── store/            # Zustand stores
│   │   │   ├── useAuthStore.ts
│   │   │   └── useNoteStore.ts
│   │   ├── types/            # TypeScript types
│   │   │   └── index.ts
│   │   ├── utils/            # API client
│   │   │   └── api.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── public/
│   │   └── favicon.svg       # Padlock icon
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── docker-compose.yml         # Docker orchestration
├── .gitignore
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** v18+ ([Download](https://nodejs.org/))
- **MongoDB** ([Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- **Git** ([Download](https://git-scm.com/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Oyedokun-Kehinde/note-vault.git
   cd note-vault
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   
   # Create .env file
   cp .env.example .env
   
   # Edit .env with your configuration
   # Set MONGODB_URI, JWT_SECRET, etc.
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   
   # Create .env file
   cp .env.example .env
   
   # Edit .env with backend URL
   ```

4. **Start MongoDB**
   ```bash
   # If running locally
   mongod
   
   # Or use MongoDB Atlas connection string in .env
   ```

5. **Start Backend Server**
   ```bash
   cd backend
   npm run dev
   
   # Server runs on http://localhost:5000
   ```

6. **Start Frontend Dev Server**
   ```bash
   cd frontend
   npm run dev
   
   # App runs on http://localhost:5173
   ```

7. **Open your browser**
   - Visit `http://localhost:5173`
   - Register a new account
   - Start creating notes!

## 🗄️ Database Setup

### Prisma Migrations

```bash
cd backend

# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# (Optional) Seed database with demo data
node prisma/seed.js

# View database in Prisma Studio
npx prisma studio
```

### Database Models

- **User** - Authentication and preferences
- **Note** - Notes with rich content
- **Category** - User-defined categories
- **Tag** - User-created tags
- **SharedNote** - Note sharing permissions
- **Attachment** - File attachments
- **CheckListItem** - Task list items
- **NoteTemplate** - Reusable templates
- **Activity** - User activity tracking
- **Export** - Export history

## 📡 API Endpoints

### Authentication
```
POST   /api/auth/register        # Register new user
POST   /api/auth/login           # Login user
GET    /api/auth/me              # Get current user
PUT    /api/auth/update-password # Update password
```

### Notes
```
GET    /api/notes                # Get all notes (with filters)
POST   /api/notes                # Create new note
GET    /api/notes/:id            # Get single note
PUT    /api/notes/:id            # Update note
DELETE /api/notes/:id            # Soft delete note
PATCH  /api/notes/:id/pin        # Toggle pin
PATCH  /api/notes/:id/favorite   # Toggle favorite
GET    /api/notes/stats          # Get statistics
```

**Query Parameters:**
- `search` - Full-text search
- `category` - Filter by category
- `tags` - Filter by tags
- `favorite` - Show only favorites
- `pinned` - Show only pinned
- `archived` - Show archived notes
- `deleted` - Show deleted notes

### Users
```
GET    /api/users/profile        # Get user profile
PUT    /api/users/profile        # Update profile
PUT    /api/users/preferences    # Update preferences
GET    /api/users/search         # Search users
```

### Tags
```
GET    /api/tags                 # Get all tags
GET    /api/tags/:tag/notes      # Get notes by tag
```

## 🔒 Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public
JWT_SECRET=your-super-secret-jwt-key-min-32-characters
JWT_EXPIRE=7d
CORS_ORIGINS=http://localhost:5173
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

**Note:** Get your `DATABASE_URL` from Supabase project settings → Database → Connection string

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=NoteVault
```

## 🎯 Usage Guide

### Creating a Note
1. Click **"New Note"** button
2. Enter title, select category
3. Write content (supports markdown)
4. Add cover image URL (optional)
5. Use **#hashtags** for automatic tagging
6. Click **"Save"**

### Organizing Notes
- **Pin**: Click pin icon to keep note at top
- **Favorite**: Star important notes
- **Archive**: Hide notes without deleting
- **Delete**: Move to trash (recoverable)
- **Categories**: Use predefined categories for organization

### Searching & Filtering
- **Search bar**: Type to search across all notes
- **Category filter**: Select specific category
- **Quick filters**: Favorites, Archived, Trash
- **View modes**: Switch between Grid and List

### Analytics
- View **Dashboard** for statistics
- See **category distribution**
- Track **usage patterns**
- Monitor **note counts**

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Commit your changes
   ```bash
   git commit -m "Add amazing feature"
   ```
4. Push to the branch
   ```bash
   git push origin feature/amazing-feature
   ```
5. Open a Pull Request

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Oyedokun Kehinde**

- GitHub: [@Oyedokun-Kehinde](https://github.com/Oyedokun-Kehinde)
- Location: Nigeria 🇳🇬

## 🙏 Acknowledgments

- Inspired by Google Keep and Notion
- Icons by [Lucide](https://lucide.dev/)
- Charts by [Recharts](https://recharts.org/)
- UI inspired by modern design principles

## 📚 Documentation

For detailed API documentation and advanced features, please refer to:
- [API Documentation](docs/API.md) (coming soon)
- [Deployment Guide](docs/DEPLOYMENT.md) (coming soon)
- [Contributing Guidelines](CONTRIBUTING.md) (coming soon)

## 🐛 Known Issues

- Rich text editor integration in progress
- File attachments feature pending
- Real-time collaboration under development

## 🗺️ Roadmap

- [x] ~~Rich text editor~~ ✅ Implemented with Tiptap
- [x] ~~User-defined categories~~ ✅ Custom categories
- [x] ~~Tag system~~ ✅ User-created tags
- [x] ~~Global search~~ ✅ Header search bar
- [ ] Real-time collaboration with Socket.io
- [ ] File attachments with cloud storage
- [ ] Export notes (PDF, Markdown, JSON)
- [ ] Mobile apps (React Native)
- [ ] Offline support with PWA
- [ ] Email notifications
- [ ] Two-factor authentication
- [ ] Advanced note templates
- [ ] Voice notes
- [ ] OCR for images
- [ ] API rate limiting per user
- [ ] Note version history

## ⭐ Show Your Support

If you find this project useful, please give it a ⭐ on GitHub!

---

**Built with ❤️ by Oyedokun Kehinde**
