import express from 'express';
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  updateProjectRating
} from '../controllers/projectsController.js';

const router = express.Router();

// Get all projects
router.get('/', getAllProjects);

// Get project by ID
router.get('/:id', getProjectById);

// Create new project
router.post('/', createProject);

// Update project
router.put('/:id', updateProject);

// Update project rating
router.patch('/:id/rating', updateProjectRating);

// Delete project
router.delete('/:id', deleteProject);

export default router; 