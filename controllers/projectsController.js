import { v4 as uuidv4 } from 'uuid';

// Sample projects data (in a real app, this would come from a database)
const projects = [
  {
    id: uuidv4(),
    title: 'E-commerce Platform',
    description: 'A full-stack e-commerce solution',
    technologies: ['React', 'Node.js', 'MongoDB'],
    image: '/images/project1.jpg',
    githubLink: 'https://github.com/Software-Engneer'
  },
  {
    id: uuidv4(),
    title: 'Task Management App',
    description: 'A collaborative task management application',
    technologies: ['Vue.js', 'Express', 'PostgreSQL'],
    image: '/images/project2.jpg',
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
    const newProject = {
      id: uuidv4(),
      ...req.body
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