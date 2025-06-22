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

// Get all creative works (with optional filtering)
router.get('/', getAllCreativeWorks);

// Rate a creative work (must come before /:id route)
router.post('/:id/rate', rateCreativeWork);

// Like/unlike a creative work (must come before /:id route)
router.post('/:id/like', toggleLikeCreativeWork);

// Get creative work by ID
router.get('/:id', getCreativeWorkById);

// Create new creative work
router.post('/', createCreativeWork);

// Update creative work
router.put('/:id', updateCreativeWork);

// Delete creative work
router.delete('/:id', deleteCreativeWork);

export default router;
