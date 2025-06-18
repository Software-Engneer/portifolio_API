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
  if (technologies && !Array.isArray(technologies)) {
    return res.status(400).json({
      error: 'Invalid technologies format',
      message: 'Technologies must be an array'
    });
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
  if (sort && !['title', 'year', 'createdAt'].includes(sort)) {
    return res.status(400).json({
      error: 'Invalid sort field',
      message: 'Sort must be one of: title, year, createdAt'
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