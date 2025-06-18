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
  'https://your-frontend-domain.com' // Add your production frontend URL
].filter(Boolean); // Remove any undefined values

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use('/uploads', express.static(join(__dirname, process.env.UPLOAD_PATH || 'public/uploads')));

// Routes
app.use(`${API_PREFIX}/home`, homeRoutes);
app.use(`${API_PREFIX}/projects`, projectsRoutes);
app.use(`${API_PREFIX}/about`, aboutRoutes);
app.use(`${API_PREFIX}/contact`, contactRoutes);
app.use(`${API_PREFIX}/creative`, creativeRoutes);

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
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested resource does not exist'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});
