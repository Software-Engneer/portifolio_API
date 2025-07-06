// Valid creative work types
const VALID_TYPES = ['digital-art', 'branding', 'photography', 'illustration', 'ui-design', '3d-art'];

// Validation middleware for creative works
export const validateCreativeWork = (req, res, next) => {
  const { title, type, description, images, technologies, year } = req.body;

  // Required fields validation
  if (!title || !type || !description) {
    return res.status(400).json({
      error: 'Missing required fields',
      message: 'Please provide title, type, and description'
    });
  }

  // Type validation
  if (!VALID_TYPES.includes(type)) {
    return res.status(400).json({
      error: 'Invalid type',
      message: `Type must be one of: ${VALID_TYPES.join(', ')}`
    });
  }

  // Title length validation
  if (title.length < 3 || title.length > 100) {
    return res.status(400).json({
      error: 'Invalid title length',
      message: 'Title must be between 3 and 100 characters'
    });
  }

  // Description length validation
  if (description.length < 10 || description.length > 1000) {
    return res.status(400).json({
      error: 'Invalid description length',
      message: 'Description must be between 10 and 1000 characters'
    });
  }

  // Year validation
  if (year && (year < 1900 || year > new Date().getFullYear())) {
    return res.status(400).json({
      error: 'Invalid year',
      message: `Year must be between 1900 and ${new Date().getFullYear()}`
    });
  }

  // Images array validation
  if (images && !Array.isArray(images)) {
    return res.status(400).json({
      error: 'Invalid images format',
      message: 'Images must be an array'
    });
  }

  // Technologies array validation
  if (technologies) {
    console.log('Validation middleware - technologies received:', technologies, 'type:', typeof technologies);
    let technologiesArray = technologies;
    
    // Handle JSON string from frontend
    if (typeof technologies === 'string') {
      try {
        technologiesArray = JSON.parse(technologies);
        console.log('Validation middleware - parsed JSON:', technologiesArray);
      } catch (e) {
        // If not JSON, treat as comma-separated string
        technologiesArray = technologies.split(',').map(t => t.trim()).filter(Boolean);
        console.log('Validation middleware - parsed comma-separated:', technologiesArray);
      }
    }
    
    if (!Array.isArray(technologiesArray)) {
      console.log('Validation middleware - technologies is not an array:', technologiesArray);
      return res.status(400).json({
        error: 'Invalid technologies format',
        message: 'Technologies must be an array or valid JSON string'
      });
    }
    
    // Update req.body with parsed technologies
    req.body.technologies = technologiesArray;
    console.log('Validation middleware - final technologies array:', req.body.technologies);
  }

  next();
};

// Validation middleware for query parameters
export const validateQueryParams = (req, res, next) => {
  const { type, featured, sort, page, limit } = req.query;

  // Type validation
  if (type && !VALID_TYPES.includes(type)) {
    return res.status(400).json({
      error: 'Invalid type',
      message: `Type must be one of: ${VALID_TYPES.join(', ')}`
    });
  }

  // Featured validation
  if (featured && !['true', 'false'].includes(featured)) {
    return res.status(400).json({
      error: 'Invalid featured value',
      message: 'Featured must be either true or false'
    });
  }

  // Sort validation
  if (sort && !['title', 'year', 'createdAt', 'rating', 'likes', 'views'].includes(sort)) {
    return res.status(400).json({
      error: 'Invalid sort field',
      message: 'Sort must be one of: title, year, createdAt, rating, likes, views'
    });
  }

  // Pagination validation
  if (page && (isNaN(page) || page < 1)) {
    return res.status(400).json({
      error: 'Invalid page number',
      message: 'Page must be a positive number'
    });
  }

  if (limit && (isNaN(limit) || limit < 1 || limit > 50)) {
    return res.status(400).json({
      error: 'Invalid limit',
      message: 'Limit must be between 1 and 50'
    });
  }

  next();
};

// Validation middleware for projects
export const validateProject = (req, res, next) => {
  const { title, description, technologies, githubLink, projectLink } = req.body;

  // Required fields validation
  if (!title || !description) {
    return res.status(400).json({
      error: 'Missing required fields',
      message: 'Please provide title and description'
    });
  }

  // Title length validation
  if (title.length < 3 || title.length > 100) {
    return res.status(400).json({
      error: 'Invalid title length',
      message: 'Title must be between 3 and 100 characters'
    });
  }

  // Description length validation
  if (description.length < 10 || description.length > 1000) {
    return res.status(400).json({
      error: 'Invalid description length',
      message: 'Description must be between 10 and 1000 characters'
    });
  }

  // Technologies array validation
  if (technologies) {
    console.log('Project validation - technologies received:', technologies, 'type:', typeof technologies);
    let technologiesArray = technologies;
    
    // Handle JSON string from frontend
    if (typeof technologies === 'string') {
      try {
        technologiesArray = JSON.parse(technologies);
        console.log('Project validation - parsed JSON:', technologiesArray);
      } catch (e) {
        // If not JSON, treat as comma-separated string
        technologiesArray = technologies.split(',').map(t => t.trim()).filter(Boolean);
        console.log('Project validation - parsed comma-separated:', technologiesArray);
      }
    }
    
    if (!Array.isArray(technologiesArray)) {
      console.log('Project validation - technologies is not an array:', technologiesArray);
      return res.status(400).json({
        error: 'Invalid technologies format',
        message: 'Technologies must be an array or valid JSON string'
      });
    }
    
    // Update req.body with parsed technologies
    req.body.technologies = technologiesArray;
    console.log('Project validation - final technologies array:', req.body.technologies);
  }

  // URL validation for links (optional)
  if (githubLink && !isValidUrl(githubLink)) {
    return res.status(400).json({
      error: 'Invalid GitHub link',
      message: 'Please provide a valid URL for GitHub link'
    });
  }

  if (projectLink && !isValidUrl(projectLink)) {
    return res.status(400).json({
      error: 'Invalid project link',
      message: 'Please provide a valid URL for project link'
    });
  }

  next();
};

// Helper function to validate URLs
function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

// Input sanitization function
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  
  // Remove potentially dangerous characters and scripts
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .replace(/<[^>]*>/g, '')
    .trim();
};

// Enhanced email validation
const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email) && email.length <= 254;
};

// Phone number validation
const isValidPhone = (phone) => {
  // Remove all non-digit characters except + for international numbers
  const cleanPhone = phone.replace(/[^\d+]/g, '');
  // Check if it's a valid phone number (7-15 digits, optionally starting with +)
  const phoneRegex = /^[\+]?[1-9][\d]{6,14}$/;
  return phoneRegex.test(cleanPhone);
};

// Validation middleware for contact messages
export const validateContactMessage = (req, res, next) => {
  const { firstName, lastName, email, phoneNumber, message } = req.body;

  // Required fields validation
  if (!firstName || !lastName || !email || !phoneNumber || !message) {
    return res.status(400).json({
      error: 'Missing required fields',
      message: 'Please provide first name, last name, email, phone number, and message'
    });
  }

  // First name length validation
  if (firstName.length < 2 || firstName.length > 30) {
    return res.status(400).json({
      error: 'Invalid first name length',
      message: 'First name must be between 2 and 30 characters'
    });
  }

  // Last name length validation
  if (lastName.length < 2 || lastName.length > 30) {
    return res.status(400).json({
      error: 'Invalid last name length',
      message: 'Last name must be between 2 and 30 characters'
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      error: 'Invalid email format',
      message: 'Please provide a valid email address'
    });
  }

  // Phone number validation (basic format)
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  if (!phoneRegex.test(phoneNumber.replace(/[\s\-\(\)]/g, ''))) {
    return res.status(400).json({
      error: 'Invalid phone number format',
      message: 'Please provide a valid phone number'
    });
  }

  // Message length validation
  if (message.length < 10 || message.length > 1000) {
    return res.status(400).json({
      error: 'Invalid message length',
      message: 'Message must be between 10 and 1000 characters'
    });
  }

  next();
}; 