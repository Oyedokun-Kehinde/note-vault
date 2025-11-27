# NoteVault Setup Guide

Complete setup instructions for running NoteVault locally or with Docker.

## Database Options

NoteVault uses **MongoDB** as its database. You have two options:

### Option 1: Local MongoDB (Recommended for Development)

1. **Download and Install MongoDB**
   - Visit: https://www.mongodb.com/try/download/community
   - Download MongoDB Community Server for Windows
   - Run the installer and follow the setup wizard
   - Install as a service (recommended)

2. **Verify Installation**
   ```bash
   mongod --version
   ```

3. **Start MongoDB** (if not running as service)
   ```bash
   mongod
   ```

### Option 2: MongoDB Atlas (Cloud - Free Tier Available)

1. **Create Account**
   - Visit: https://www.mongodb.com/cloud/atlas/register
   - Sign up for a free account

2. **Create Cluster**
   - Choose the free tier (M0)
   - Select your region
   - Create cluster

3. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Update `backend/.env` with your connection string

## Installation Steps

### 1. Clone or Download the Project

```bash
cd c:\Users\oyedo\Desktop\Build\React\note-app
```

### 2. Setup Backend

```bash
cd backend
npm install
```

**Configure environment variables:**
- Edit `backend/.env`
- Set your `MONGODB_URI` (local or Atlas)
- Change `JWT_SECRET` to a secure random string

### 3. Setup Frontend

```bash
cd ../frontend
npm install
```

**Configure environment variables:**
- Edit `frontend/.env`
- Ensure `VITE_API_URL` points to your backend

## Running the Application

### Development Mode (Recommended)

**Terminal 1 - Start MongoDB (if running locally):**
```bash
mongod
```

**Terminal 2 - Start Backend:**
```bash
cd backend
npm run dev
```
Backend runs on: http://localhost:5000

**Terminal 3 - Start Frontend:**
```bash
cd frontend
npm run dev
```
Frontend runs on: http://localhost:5173

### Access the Application

1. Open browser: http://localhost:5173
2. Click "Sign Up" to create an account
3. Login and start creating notes!

## Docker Deployment (Production)

If you have Docker installed:

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

Access at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- MongoDB: localhost:27017

## Troubleshooting

### Backend won't start

**Error: Cannot connect to MongoDB**
- Ensure MongoDB is running
- Check `MONGODB_URI` in `backend/.env`
- For Atlas: Check network access settings (allow your IP)

**Error: Port 5000 already in use**
- Change `PORT` in `backend/.env`
- Update `VITE_API_URL` in `frontend/.env`

### Frontend won't start

**Error: Port 5173 already in use**
- Close other Vite servers
- Or change port in `vite.config.js`

**Error: API connection failed**
- Ensure backend is running
- Check `VITE_API_URL` in `frontend/.env`
- Check CORS settings in `backend/server.js`

### Database Issues

**Error: Authentication failed**
- For MongoDB Atlas: Check username/password
- For local: Remove auth from connection string

**Error: Database not found**
- Database will be created automatically on first connection
- Ensure MongoDB service is running

## Project Structure

```
note-app/
├── backend/          # Express API
│   ├── controllers/  # Business logic
│   ├── models/       # Database schemas
│   ├── routes/       # API endpoints
│   ├── middleware/   # Auth & validation
│   └── server.js     # Entry point
│
├── frontend/         # React app
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── pages/       # Page views
│   │   ├── store/       # State management
│   │   └── utils/       # Helpers
│   └── public/
│
└── docker-compose.yml   # Docker config
```

## Default Database

**Database Name:** `notevault`

The application will automatically create this database and all required collections on first run.

## Security Notes

### For Production Deployment:

1. **Change JWT_SECRET** in `backend/.env` to a strong random string
2. **Use MongoDB Atlas** or secure your MongoDB instance
3. **Enable HTTPS** for frontend and backend
4. **Set strong passwords** for MongoDB users
5. **Update CORS_ORIGINS** to your production domain
6. **Review rate limiting** settings

### Generate Secure JWT Secret:

```bash
# In PowerShell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 64 | ForEach-Object {[char]$_})
```

## API Testing

Use the backend health check:
```
GET http://localhost:5000/api/health
```

Should return:
```json
{
  "status": "OK",
  "message": "NoteVault API is running",
  "timestamp": "2025-11-27T...",
  "environment": "development"
}
```

## Next Steps

1. **Create your account** - Register a new user
2. **Create notes** - Try different categories
3. **Explore features** - Pin, favorite, archive notes
4. **View dashboard** - Check your statistics
5. **Customize profile** - Add your avatar and bio

## Support

For issues or questions:
- Check the main README.md
- Review error messages in browser console
- Check backend logs in terminal
- Verify all services are running

Happy noting! 📝
