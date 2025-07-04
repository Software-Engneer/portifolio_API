import { v4 as uuidv4 } from 'uuid';
import Project from '../models/Project.js';

// Base64 encoded placeholder image (a simple gray rectangle)
const PLACEHOLDER_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2U5ZWNlZiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5Qcm9qZWN0IEltYWdlPC90ZXh0Pjwvc3ZnPg==';

// Get all projects
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    console.log('📋 Returning projects to frontend:', projects);
    
    res.status(200).json({ projects });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch projects',
      message: error.message
    });
  }
};

// Get project by ID
export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        error: 'Project not found',
        message: `No project found with id ${id}`
      });
    }

    // Increment views
    project.views += 1;
    await project.save();

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch project',
      message: error.message
    });
  }
};

// Create new project
export const createProject = async (req, res) => {
  try {
    console.log('📝 Creating new project with data:', req.body);
    
    let { title, description, technologies, githubLink, projectLink, featured } = req.body;
    
    // Handle technologies field (validation middleware should have already converted it to array)
    if (!Array.isArray(technologies)) {
      technologies = [];
    }
    
    // Use processed image if available
    const image = req.processedImage || '';
    
    const newProject = new Project({
      title: title.trim(),
      description: description.trim(),
      technologies,
      image,
      githubLink: githubLink || '',
      projectLink: projectLink || '',
      featured: featured || false
    });
    
    await newProject.save();
    console.log('✅ New project created:', newProject);
    
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to create project',
      message: error.message
    });
  }
};

// Update project
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    let { technologies } = req.body;
    
    // Handle technologies field (validation middleware should have already converted it to array)
    if (!Array.isArray(technologies)) {
      technologies = undefined;
    }
    
    const updateData = {
      ...req.body,
      ...(technologies !== undefined ? { technologies } : {})
    };
    
    // Use processed image if available
    if (req.processedImage) {
      updateData.image = req.processedImage;
    }
    
    const updatedProject = await Project.findByIdAndUpdate(id, updateData, { new: true });
    
    if (!updatedProject) {
      return res.status(404).json({
        error: 'Project not found',
        message: `No project found with id ${id}`
      });
    }
    
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to update project',
      message: error.message
    });
  }
};

// Delete project
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProject = await Project.findByIdAndDelete(id);
    
    if (!deletedProject) {
      return res.status(404).json({
        error: 'Project not found',
        message: `No project found with id ${id}`
      });
    }
    
    res.status(200).json(deletedProject);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to delete project',
      message: error.message
    });
  }
}; 