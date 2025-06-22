import express from 'express';
import {
  getAllCreativeWorks,
  getCreativeWorkById,
  createCreativeWork,
  updateCreativeWork,
  deleteCreativeWork,
  rateCreativeWork,
  toggleLikeCreativeWork
} from '../controllers/creativeController.js';

const router = express.Router();

// Test route to verify creative routes are working
router.get('/test', (req, res) => {
  res.json({ message: 'Creative routes are working!' });
});

// Test rating route to verify rating functionality
router.post('/test-rating', (req, res) => {
  res.json({ message: 'Rating route is working!', body: req.body });
});

// Get all creative works (with optional filtering)
router.get('/', getAllCreativeWorks);

// Rate a creative work (must come before /:id route)
router.post('/:id/rate', rateCreativeWork);

// Like/unlike a creative work (must come before /:id route)
router.post('/:id/like', toggleLikeCreativeWork);

// Create new creative work
router.post('/', createCreativeWork);

// Get creative work by ID (must come after specific routes)
router.get('/:id', getCreativeWorkById);

// Update creative work
router.put('/:id', updateCreativeWork);

// Delete creative work
router.delete('/:id', deleteCreativeWork);

export default router;
