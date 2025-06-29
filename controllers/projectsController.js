import { v4 as uuidv4 } from 'uuid';

// Base64 encoded placeholder image (a simple gray rectangle)
const PLACEHOLDER_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2U5ZWNlZiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5Qcm9qZWN0IEltYWdlPC90ZXh0Pjwvc3ZnPg==';

// Sample projects data with static IDs
const projects = [
  {
    id: 'ecommerce-project-001',
    title: 'E-commerce Platform',
    description: 'A full-stack e-commerce solution with modern features and responsive design.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
    image: '/images/ecommerce.jpg',
    githubLink: 'https://github.com/Software-Engneer',
    projectLink: 'https://ecommerce-demo.com'
  },
  {
    id: 'taskmanager-project-002',
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates.',
    technologies: ['Vue.js', 'Express', 'PostgreSQL', 'Socket.io'],
    image: '/images/taskmanager.jpg',
    githubLink: 'https://github.com/Software-Engneer',
    projectLink: 'https://taskmanager-demo.com'
  },
  {
    id: 'portfolio-project-003',
    title: 'Portfolio Website',
    description: 'A modern portfolio website showcasing projects and skills.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
    image: '/images/portfolio.jpg',
    githubLink: 'https://github.com/Software-Engneer',
    projectLink: 'https://portfolio-demo.com'
  }
];

// Get all projects
export const getAllProjects = async (req, res) => {
  try {
    // Clean up any projects with undefined values
    const cleanProjects = projects.filter(project => 
      project.title && 
      project.title !== 'undefined' && 
      project.description && 
      project.description !== 'undefined'
    );
    
    console.log('📋 Returning projects to frontend:', cleanProjects);
    console.log('🔗 Projects with projectLink:', cleanProjects.filter(p => p.projectLink));
    
    res.status(200).json({ projects: cleanProjects });
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
    console.log('📝 Creating new project with data:', req.body);
    console.log('🔗 Project link received:', req.body.projectLink);
    console.log('🐙 GitHub link received:', req.body.githubLink);
    
    let { title, description, technologies, image, githubLink, projectLink } = req.body;
    
    // Validate required fields
    if (!title || title === 'undefined') {
      return res.status(400).json({
        error: 'Invalid title',
        message: 'Title is required and cannot be undefined'
      });
    }
    
    if (!description || description === 'undefined') {
      return res.status(400).json({
        error: 'Invalid description',
        message: 'Description is required and cannot be undefined'
      });
    }
    
    // Ensure technologies is always an array
    if (typeof technologies === 'string') {
      if (technologies === 'undefined') {
        technologies = [];
      } else {
        technologies = technologies.split(',').map(t => t.trim()).filter(Boolean);
      }
    } else if (!Array.isArray(technologies)) {
      technologies = [];
    }
    
    // Use processed image if available
    const finalImage = req.processedImage || image || PLACEHOLDER_IMAGE;
    
    const newProject = {
      id: uuidv4(),
      title: title.trim(),
      description: description.trim(),
      technologies,
      image: finalImage,
      githubLink: githubLink || '',
      projectLink: projectLink || ''
    };
    
    console.log('✅ New project created:', newProject);
    
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

    // Filter out undefined values from req.body
    const updateData = {};
    Object.keys(req.body).forEach(key => {
      if (req.body[key] !== undefined && req.body[key] !== 'undefined') {
        updateData[key] = req.body[key];
      }
    });

    // Use processed image if available
    const finalImage = req.processedImage || updateData.image || projects[projectIndex].image;
    
    const updatedProject = {
      ...projects[projectIndex],
      ...updateData,
      image: finalImage,
      id // Preserve the original ID
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