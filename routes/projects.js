import express from 'express';
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  updateProjectStatus
} from '../controllers/projectsController.js';
import { upload, processImage, handleUploadError } from '../middleware/upload.js';
import { validateProject } from '../middleware/validation.js';

const router = express.Router();

// Get all projects
router.get('/', getAllProjects);

// Get project by ID
router.get('/:id', getProjectById);

// Create new project
router.post('/', upload.single('image'), processImage, handleUploadError, validateProject, createProject);

// Update project
router.put('/:id', upload.single('image'), processImage, handleUploadError, validateProject, updateProject);

// Delete project
router.delete('/:id', deleteProject);

// Update only project status
router.patch('/:id/status', updateProjectStatus);

export default router; 