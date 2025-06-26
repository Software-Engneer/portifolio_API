import express from 'express';
import {
  getAllCreativeWorks,
  getCreativeWorkById,
  createCreativeWork,
  updateCreativeWork,
  deleteCreativeWork,
  toggleLikeCreativeWork
} from '../controllers/creativeController.js';
import { upload, processImage } from '../middleware/upload.js';

const router = express.Router();

// Test route to verify creative routes are working
router.get('/test', (req, res) => {
  res.json({ message: 'Creative routes are working!' });
});

// Get all creative works (with optional filtering)
router.get('/', getAllCreativeWorks);

// Like/unlike a creative work
router.post('/:id/like', toggleLikeCreativeWork);

// Create new creative work
router.post('/', upload.single('image'), processImage, createCreativeWork);

// Get creative work by ID
router.get('/:id', getCreativeWorkById);

// Update creative work
router.put('/:id', upload.single('image'), processImage, updateCreativeWork);

// Delete creative work
router.delete('/:id', deleteCreativeWork);

export default router;
