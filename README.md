# NoteVault - Full-Stack Note-Taking Application 🚀

A comprehensive, production-ready note-taking application with **authentication**, **real-time collaboration**, **analytics**, and **advanced search**. Built with the **MERN stack** (MongoDB, Express.js, React, Node.js) featuring a beautiful modern UI and enterprise-grade features.

![NoteVault Preview](https://via.placeholder.com/1200x600?text=NoteVault+Full-Stack+App)

## ✨ Key Features

### 🔐 Authentication & Security
- **User Registration & Login** with JWT authentication
- **Secure password hashing** using bcrypt
- **Protected routes** and API endpoints
- **Session management** with token refresh
- **Role-based access control**

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
| **MongoDB** | Database (NoSQL) |
| **Mongoose** | ODM for MongoDB |
| **JWT** | Authentication tokens |
| **bcryptjs** | Password hashing |
| **express-validator** | Input validation |
| **helmet** | Security headers |
| **cors** | Cross-origin requests |
| **morgan** | HTTP request logger |
| **compression** | Response compression |
| **express-rate-limit** | Rate limiting |

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 19** | UI library |
| **Vite** | Build tool & dev server |
| **React Router** | Client-side routing |
| **Zustand** | State management |
| **Axios** | HTTP client |
| **React Quill** | Rich text editor |
| **Recharts** | Data visualization |
| **Framer Motion** | Animations |
| **Lucide React** | Icons |
| **React Hot Toast** | Notifications |
| **date-fns** | Date formatting |

## 📂 Project Structure

```
note-app/
├── backend/                    # Express.js backend
│   ├── controllers/           # Request handlers
│   │   ├── auth.controller.js
│   │   ├── note.controller.js
│   │   ├── user.controller.js
│   │   └── tag.controller.js
│   ├── models/                # Mongoose schemas
│   │   ├── User.model.js
│   │   ├── Note.model.js
│   │   └── Tag.model.js
│   ├── routes/                # API routes
│   │   ├── auth.routes.js
│   │   ├── note.routes.js
│   │   ├── user.routes.js
│   │   └── tag.routes.js
│   ├── middleware/            # Custom middleware
│   │   ├── auth.middleware.js
│   │   └── errorHandler.js
│   ├── server.js              # Entry point
│   ├── package.json
│   └── .env.example
│
├── frontend/                  # React frontend
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── Auth/         # Login, Register
│   │   │   ├── Dashboard/    # Analytics
│   │   │   ├── Navbar/       # Navigation
│   │   │   ├── Profile/      # User profile
│   │   │   ├── NoteCard.jsx
│   │   │   ├── NoteForm.jsx
│   │   │   ├── NoteModal.jsx
│   │   │   └── Controls.jsx
│   │   ├── pages/            # Page components
│   │   │   └── NotesPage.jsx
│   │   ├── store/            # Zustand stores
│   │   │   ├── useAuthStore.js
│   │   │   └── useNoteStore.js
│   │   ├── utils/            # Utility functions
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   ├── package.json
│   └── vite.config.js
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

## 🐳 Docker Deployment

Run the entire stack with Docker Compose:

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

Services:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000
- **MongoDB**: localhost:27017

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
DELETE /api/notes/:id            # Delete note
PATCH  /api/notes/:id/pin        # Toggle pin
PATCH  /api/notes/:id/favorite   # Toggle favorite
POST   /api/notes/:id/share      # Share note
GET    /api/notes/stats          # Get statistics
```

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
MONGODB_URI=mongodb://localhost:27017/notevault
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

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

- [ ] Rich text editor with react-quill
- [ ] Real-time collaboration with Socket.io
- [ ] File attachments with cloud storage
- [ ] Export notes (PDF, Markdown)
- [ ] Mobile apps (React Native)
- [ ] Offline support with PWA
- [ ] Email notifications
- [ ] Two-factor authentication
- [ ] Note templates
- [ ] Voice notes
- [ ] OCR for images

## ⭐ Show Your Support

If you find this project useful, please give it a ⭐ on GitHub!

---

**Built with ❤️ by Oyedokun Kehinde**
