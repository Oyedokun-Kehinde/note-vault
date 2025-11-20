# Note-Taker

A clean, responsive, and production-ready note-taking application inspired by Google Keep. Built with **React**, **Vite**, and **vanilla CSS** — no Bootstrap, no Tailwind. Features category tagging, cover images, relative timestamps, and a polished user experience.

![Note-Taker Preview](https://via.placeholder.com/900x400?text=Note-Taker+App+Preview)  
*Replace with actual screenshot before publishing*

---

## ✨ Features

- **Google Keep–style interface**: “Take a note…” input on homepage, floating “+” button when empty
- **Category management**: Predefined categories via a clean dropdown; displayed as colored chips on notes
- **Rich note content**: Support for title, detailed content, and cover image (via URL)
- **Smart content preview**: Notes truncated to 200 characters for consistent card height
- **Human-readable timestamps**:  
  `Just now` • `5m ago` • `Today, 3:45 PM` • `Yesterday` • `Nov 20`
- **Full CRUD operations**: Create, read, update, and delete notes with confirmation
- **Responsive grid layout**:  
  - Mobile: 1 column  
  - Tablet (≥640px): 2 columns  
  - Desktop (≥1024px): 3 columns
- **Polished UX enhancements**:
  - Skeleton loading screens
  - Auto-focus on title field
  - Entire note card clickable (opens edit mode)
  - Clear “← Back” button to cancel form
  - “My Notes” heading acts as home button
  - Visual feedback on input focus
- **Modern design**:
  - Google Fonts: **Raleway** (400, 500, 600, 700)
  - Primary color: `#45BFDB` (vibrant cyan-blue)
  - Clean spacing, subtle shadows, smooth transitions

---

## 🛠️ Tech Stack

| Layer        | Technology             |
|--------------|------------------------|
| **Frontend** | React 18, Vite         |
| **Styling**  | Vanilla CSS, Raleway (Google Fonts) |
| **HTTP**     | Axios                  |
| **Dates**    | date-fns               |
| **Dev Backend** | JSON Server (local only) |
| **Deployment** | Vercel (frontend)     |

> ✅ **No CSS frameworks** — 100% custom CSS for full control and minimal bundle size.

---

## 🚀 Local Development

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- npm (included with Node.js)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/Oyedokun-Kehinde/note-taker.git
   cd note-taker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Initialize the database**  
   Create a `db.json` file in the project root with the following content:
   ```json
   {
     "notes": []
   }
   ```

4. **Start the local API server**  
   JSON Server will serve notes at `http://localhost:3001/notes`:
   ```bash
   npx json-server --watch db.json --port 3001
   ```

5. **Start the React development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**  
   Visit the URL shown in the terminal (typically `http://localhost:5173`).

---

## 📂 Project Structure

```
note-taker/
├── public/
│   └── index.html                 # Entry HTML with Google Fonts
├── src/
│   ├── components/
│   │   ├── NoteCard.jsx           # Displays a single note (grid item)
│   │   └── NoteForm.jsx           # Handles create/edit forms
│   ├── App.jsx                    # Main app logic and routing
│   ├── main.jsx                   # React renderer
│   ├── index.css                  # Global styles (vanilla CSS)
│   └── utils.js                   # Helper functions (truncate, timestamps)
├── db.json                        # JSON Server database (local only)
├── package.json
├── vite.config.js
└── README.md
```

---

## 🎨 Design System

### Colors
- Primary: `#45BFDB` (used for headings, buttons, accents)
- Background: `#FFFFFF`
- Text: `#333333`
- Meta text: `#777777`
- Category chip: `#F0F9FF` (background), `#45BFDB` (text)

### Typography
- **Font**: [Raleway](https://fonts.google.com/specimen/Raleway)
- **Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- **Base size**: 16px

### Spacing
- Consistent padding/margin using rem units
- Card padding: `1.25rem`
- Grid gap: `1.5rem`

---

## 📦 Deployment to Vercel

> ⚠️ **Important**: JSON Server is **only for local development**. It will not work in production. You must replace it with a real backend for full functionality.

### Frontend Deployment (Vercel)

1. **Build the production bundle**
   ```bash
   npm run build
   ```
   Output: `dist/` folder

2. **Deploy via Vercel CLI (recommended)**
   ```bash
   npm install -g vercel
   vercel
   ```
   - Follow prompts to link to your GitHub account
   - Select the `note-taker` project
   - Vercel auto-detects Vite configuration

3. **Or deploy via Vercel Dashboard**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click **“Add New…” → “Project”**
   - Import **GitHub repository**: `Oyedokun-Kehinde/note-taker`
   - **Build settings**:
     - Framework: **Vite**
     - Build command: `npm run build`
     - Output directory: `dist`
   - Click **“Deploy”**

✅ Your app will be live at: `https://note-taker.vercel.app`

### Production Backend Options

To enable note persistence in production, replace `http://localhost:3001` with a real API:

| Option              | Description |
|---------------------|-------------|
| **Firebase Firestore** | Free tier available; real-time sync |
| **Supabase**        | Open-source Firebase alternative |
| **Custom Node.js API** | Deploy alongside frontend on Vercel (serverless functions) |
| **Pocketbase**      | Lightweight open-source backend |

> 🔧 Update all API calls in `App.jsx`, `NoteCard.jsx`, and `NoteForm.jsx` to point to your production endpoint.

---

## 🧪 API Specification (JSON Server)

| Method | Endpoint        | Request Body | Response |
|--------|-----------------|--------------|----------|
| `GET`  | `/notes`        | —            | `Note[]` |
| `POST` | `/notes`        | `NewNote`    | `Note`   |
| `PUT`  | `/notes/:id`    | `UpdatedNote`| `Note`   |
| `DELETE`| `/notes/:id`   | —            | `{}`     |

**Note Object Schema**
```ts
interface Note {
  id: string;                  // auto-generated by JSON Server
  title: string;
  category: string;            // e.g., "Personal", "Work"
  content: string;             // full note content
  cover?: string;              // image URL (optional)
  createdAt: string;           // ISO 8601 timestamp
  updatedAt: string;           // ISO 8601 timestamp
}
```

---

## 🤝 Contributing

We welcome contributions! Please follow this workflow:

1. Fork the repository
2. Create a feature branch:  
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:  
   ```bash
   git commit -m "Add your feature"
   ```
4. Push to your branch:  
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a Pull Request to `main`

---

## 📄 License

This project is licensed under the **MIT License**. See [LICENSE](LICENSE) for details.

---

## 🙌 Author

**Oyedokun-Kehinde**  
📍 Nigeria  
🌐 [GitHub](https://github.com/Oyedokun-Kehinde)  

> Built with care, precision, and a passion for clean user interfaces. 💙

---

## 💡 Future Enhancements

- [ ] Dark mode toggle
- [ ] Search and filter by category
- [ ] Image upload (Cloudinary integration)
- [ ] Note pinning / starring
- [ ] Offline support (localStorage fallback)
- [ ] Export notes as PDF/Markdown

---

> 🔗 **Repository**: [github.com/Oyedokun-Kehinde/note-taker](https://github.com/Oyedokun-Kehinde/note-taker)  
> 🌐 **Live Demo**: [note-taker.vercel.app](https://note-taker.vercel.app) *(after deployment)*

⭐ **Star this repo if you find it useful!** ⭐