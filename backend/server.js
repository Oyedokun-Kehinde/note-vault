const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const prisma = require('./prisma/client');
const authRoutes = require('./routes/auth.routes.prisma');
const noteRoutes = require('./routes/note.routes.prisma');
// const userRoutes = require('./routes/user.routes.js');
// const tagRoutes = require('./routes/tag.routes.js');
// const { errorHandler } = require('./middleware/errorHandler.js');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());
app.use(compression());

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:5173'],
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Prisma Database connection test
async function testDatabaseConnection() {
  try {
    await prisma.$connect();
    console.log('✅ Supabase PostgreSQL Connected Successfully via Prisma');
  } catch (err) {
    console.error('❌ Database Connection Error:', err);
    process.exit(1);
  }
}

testDatabaseConnection();

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'NoteVault API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/tags', tagRoutes);

// Temporary test route
app.get('/api/test', async (req, res) => {
  try {
    const userCount = await prisma.user.count();
    const noteCount = await prisma.note.count();
    res.json({
      success: true,
      message: 'Prisma working!',
      data: { users: userCount, notes: noteCount }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handling middleware (temporarily disabled)
// app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
  console.log(`📝 API Health Check: http://localhost:${PORT}/api/health`);
  console.log(`🧪 Test Prisma: http://localhost:${PORT}/api/test`);
});

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

module.exports = app;
