import express from 'express';
import {
  getAboutData,
  getSkillsData,
  updateAboutData
} from '../controllers/aboutController.js';

const router = express.Router();

// Get complete about data
router.get('/', getAboutData);

// Get skills data
router.get('/skills', getSkillsData);

// Update about data
router.put('/:section', updateAboutData);

export default router; 