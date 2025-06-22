import 'dotenv/config';
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import cors from 'cors';
import homeRoutes from './routes/home.js';
import projectsRoutes from './routes/projects.js';
import aboutRoutes from './routes/about.js';
import contactRoutes from './routes/contact.js';
import creativeRoutes from './routes/Creative.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const API_PREFIX = process.env.API_PREFIX || '/api';

// CORS configuration
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:3000',
  'https://my-portifolio-sooty-two.vercel.app', // Remove trailing slash for exact match
].filter(Boolean); // Remove any undefined values

console.log('Allowed Origins:', allowedOrigins);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('Blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true
}));

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

// Serve static files from public directory
app.use('/public', express.static(join(__dirname, 'public')));
app.use('/uploads', express.static(join(__dirname, 'public', 'uploads')));

// API Routes
app.use(`${API_PREFIX}/home`, homeRoutes);
app.use(`${API_PREFIX}/projects`, projectsRoutes);
app.use(`${API_PREFIX}/about`, aboutRoutes);
app.use(`${API_PREFIX}/contact`, contactRoutes);
app.use(`${API_PREFIX}/creative`, creativeRoutes);

console.log('Creative routes registered at:', `${API_PREFIX}/creative`);
console.log('Available creative endpoints:');
console.log('- GET /api/creative/test');
console.log('- GET /api/creative/');
console.log('- POST /api/creative/:id/like');
console.log('- GET /api/creative/:id');
console.log('- POST /api/creative/');
console.log('- PUT /api/creative/:id');
console.log('- DELETE /api/creative/:id');

// Basic route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Portfolio API',
    status: 'active',
    version: process.env.API_VERSION || '1.0.0',
    environment: process.env.NODE_ENV,
    endpoints: {
      home: `${API_PREFIX}/home`,
      projects: `${API_PREFIX}/projects`,
      about: `${API_PREFIX}/about`,
      contact: `${API_PREFIX}/contact`,
      creative: `${API_PREFIX}/creative`
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({
      error: 'CORS Error',
      message: 'Origin not allowed'
    });
  }
  
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found`
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 API Base URL: http://localhost:${PORT}${API_PREFIX}`);
});
