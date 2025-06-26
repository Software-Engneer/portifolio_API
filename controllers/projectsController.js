import { v4 as uuidv4 } from 'uuid';

// Base64 encoded placeholder image (a simple gray rectangle)
const PLACEHOLDER_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2U5ZWNlZiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5Qcm9qZWN0IEltYWdlPC90ZXh0Pjwvc3ZnPg==';

// Sample projects data (in a real app, this would come from a database)
const projects = [
  {
    id: uuidv4(),
    title: 'E-commerce Platform',
    description: 'A full-stack e-commerce solution with modern features and responsive design.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
    image: '/images/ecommerce.jpg',
    githubLink: 'https://github.com/Software-Engneer'
  },
  {
    id: uuidv4(),
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates.',
    technologies: ['Vue.js', 'Express', 'PostgreSQL', 'Socket.io'],
    image: '/images/taskmanager.jpg',
    githubLink: 'https://github.com/Software-Engneer'
  },
  {
    id: uuidv4(),
    title: 'Portfolio Website',
    description: 'A modern portfolio website showcasing projects and skills.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
    image: '/images/portfolio.jpg',
    githubLink: 'https://github.com/Software-Engneer'
  }
];

// Get all projects
export const getAllProjects = async (req, res) => {
  try {
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
    const project = projects.find(p => p.id === id);

    if (!project) {
      return res.status(404).json({
        error: 'Project not found',
        message: `No project found with id ${id}`
      });
    }

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
    let { title, description, technologies, image, githubLink } = req.body;
    // Ensure technologies is always an array
    if (typeof technologies === 'string') {
      technologies = technologies.split(',').map(t => t.trim()).filter(Boolean);
    } else if (!Array.isArray(technologies)) {
      technologies = [];
    }
    const newProject = {
      id: uuidv4(),
      title,
      description,
      technologies,
      image,
      githubLink
    };
    projects.push(newProject);
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
    const projectIndex = projects.findIndex(p => p.id === id);

    if (projectIndex === -1) {
      return res.status(404).json({
        error: 'Project not found',
        message: `No project found with id ${id}`
      });
    }

    const updatedProject = {
      ...projects[projectIndex],
      ...req.body,
      id // Preserve the original UUID
    };

    projects[projectIndex] = updatedProject;
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
    const projectIndex = projects.findIndex(p => p.id === id);

    if (projectIndex === -1) {
      return res.status(404).json({
        error: 'Project not found',
        message: `No project found with id ${id}`
      });
    }

    const deletedProject = projects.splice(projectIndex, 1)[0];
    res.status(200).json(deletedProject);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to delete project',
      message: error.message
    });
  }
}; 