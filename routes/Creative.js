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
import { validateCreativeWork, validateQueryParams } from '../middleware/validation.js';
import { upload, processImage, handleUploadError } from '../middleware/upload.js';

const router = express.Router();

// Get all creative works (with optional filtering)
router.get('/', validateQueryParams, getAllCreativeWorks);

// Get creative work by ID
router.get('/:id', getCreativeWorkById);

// Rate a creative work
router.post('/:id/rate', rateCreativeWork);

// Like/unlike a creative work
router.post('/:id/like', toggleLikeCreativeWork);

// Create new creative work with image upload
router.post('/', 
  upload.single('image'),
  processImage,
  validateCreativeWork,
  createCreativeWork
);

// Update creative work with optional image upload
router.put('/:id',
  upload.single('image'),
  processImage,
  validateCreativeWork,
  updateCreativeWork
);

// Delete creative work
router.delete('/:id', deleteCreativeWork);

// Error handling for upload errors
router.use(handleUploadError);

export default router;
