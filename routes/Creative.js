import express from 'express';
import {
  getAllCreativeWorks,
  getCreativeWorkById,
  createCreativeWork,
  updateCreativeWork,
  deleteCreativeWork,
  toggleLikeCreativeWork,
  updateCreativeStatus
} from '../controllers/creativeController.js';
import { upload, processImage, handleUploadError } from '../middleware/upload.js';
import { validateCreativeWork } from '../middleware/validation.js';

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
router.post('/', upload.single('image'), processImage, handleUploadError, validateCreativeWork, createCreativeWork);

// Get creative work by ID
router.get('/:id', getCreativeWorkById);

// Update creative work
router.put('/:id', upload.single('image'), processImage, handleUploadError, validateCreativeWork, updateCreativeWork);

// Delete creative work
router.delete('/:id', deleteCreativeWork);

// Update only creative work status
router.patch('/:id/status', updateCreativeStatus);

export default router;
