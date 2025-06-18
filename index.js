import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import homeRoutes from './routes/home.js';
import projectsRoutes from './routes/projects.js';
import aboutRoutes from './routes/about.js';
import contactRoutes from './routes/contact.js';
import creativeRoutes from './routes/Creative.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use('/uploads', express.static(join(__dirname, 'public/uploads')));

// Routes
app.use('/api/home', homeRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/creative', creativeRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Portfolio API',
    status: 'active',
    version: '1.0.0',
    endpoints: {
      home: '/api/home',
      projects: '/api/projects',
      about: '/api/about',
      contact: '/api/contact',
      creative: '/api/creative'
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
});
