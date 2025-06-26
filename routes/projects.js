import express from 'express';
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
} from '../controllers/projectsController.js';
import { upload, processImage, handleUploadError } from '../middleware/upload.js';

const router = express.Router();

// Get all projects
router.get('/', getAllProjects);

// Get project by ID
router.get('/:id', getProjectById);

// Create new project
router.post('/', upload.single('image'), processImage, handleUploadError, createProject);

// Update project
router.put('/:id', upload.single('image'), processImage, handleUploadError, updateProject);

// Delete project
router.delete('/:id', deleteProject);

export default router; 