import Creative from '../models/Creative.js';

// Real image paths for different creative types
const CREATIVE_IMAGES = {
  digitalArt: '/images/digital-art.jpg',
  branding: '/images/branding.jpg',
  photography: '/images/photography.jpg',
  illustration: '/images/illustration.jpg',
  webDesign: '/images/web-design.jpg',
  animation: '/images/animation.jpg'
};

// Get all creative works with filtering, sorting, and pagination
export const getAllCreativeWorks = async (req, res) => {
  try {
    const { type, featured, sort = 'createdAt', page = 1, limit = 10 } = req.query;
    const query = {};
    if (type) query.type = type;
    if (featured === 'true') query.featured = true;

    const sortOptions = {};
    switch (sort) {
      case 'title':
        sortOptions.title = 1;
        break;
      case 'year':
        sortOptions.year = -1;
        break;
      case 'likes':
        sortOptions.likes = -1;
        break;
      case 'views':
        sortOptions.views = -1;
        break;
      case 'createdAt':
      default:
        sortOptions.createdAt = -1;
        break;
    }

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const totalItems = await Creative.countDocuments(query);
    const totalPages = Math.ceil(totalItems / limitNumber);
    const works = await Creative.find(query)
      .sort(sortOptions)
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    res.status(200).json({
      works,
      pagination: {
        currentPage: pageNumber,
        totalPages,
        totalItems,
        itemsPerPage: limitNumber,
        hasNextPage: pageNumber < totalPages,
        hasPreviousPage: pageNumber > 1
      }
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch creative works',
      message: error.message
    });
  }
};

// Get creative work by ID
export const getCreativeWorkById = async (req, res) => {
  try {
    const { id } = req.params;
    const work = await Creative.findById(id);
    if (!work) {
      return res.status(404).json({
        error: 'Creative work not found',
        message: `No creative work found with id ${id}`
      });
    }
    // Increment views
    work.views += 1;
    await work.save();
    res.status(200).json(work);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch creative work',
      message: error.message
    });
  }
};

// Like a creative work
export const toggleLikeCreativeWork = async (req, res) => {
  try {
    const { id } = req.params;
    const work = await Creative.findById(id);
    if (!work) {
      return res.status(404).json({
        error: 'Creative work not found',
        message: `No creative work found with id ${id}`
      });
    }
    work.likes += 1;
    await work.save();
    res.status(200).json({
      message: 'Like updated successfully',
      work: {
        id: work._id,
        title: work.title,
        likes: work.likes
      }
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to update like',
      message: error.message
    });
  }
};

// Create new creative work
export const createCreativeWork = async (req, res) => {
  try {
    let { title, type, description, images, technologies, year, featured } = req.body;
    
    // Handle technologies field (validation middleware should have already converted it to array)
    if (!Array.isArray(technologies)) {
      technologies = [];
    }
    
    // Handle images field
    if (typeof images === 'string') {
      images = images.split(',').map(i => i.trim()).filter(Boolean);
    } else if (!Array.isArray(images)) {
      images = [];
    }
    
    // Add processed image if available
    if (req.processedImage) {
      images.push(req.processedImage);
    }
    
    const newWork = new Creative({
      title,
      type,
      description,
      images,
      technologies,
      year: year || new Date().getFullYear(),
      featured: featured || false
    });
    await newWork.save();
    res.status(201).json(newWork);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to create creative work',
      message: error.message
    });
  }
};

// Update creative work
export const updateCreativeWork = async (req, res) => {
  try {
    const { id } = req.params;
    let { technologies, images } = req.body;
    
    // Handle technologies field (validation middleware should have already converted it to array)
    if (!Array.isArray(technologies)) {
      technologies = undefined;
    }
    
    // Handle images field
    if (typeof images === 'string') {
      images = images.split(',').map(i => i.trim()).filter(Boolean);
    } else if (!Array.isArray(images)) {
      images = undefined;
    }
    
    // Add processed image if available
    if (req.processedImage && Array.isArray(images)) {
      images.push(req.processedImage);
    }
    
    const updateData = {
      ...req.body,
      ...(technologies !== undefined ? { technologies } : {}),
      ...(images !== undefined ? { images } : {})
    };
    
    const updatedWork = await Creative.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedWork) {
      return res.status(404).json({
        error: 'Creative work not found',
        message: `No creative work found with id ${id}`
      });
    }
    res.status(200).json(updatedWork);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to update creative work',
      message: error.message
    });
  }
};

// Delete creative work
export const deleteCreativeWork = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedWork = await Creative.findByIdAndDelete(id);
    if (!deletedWork) {
      return res.status(404).json({
        error: 'Creative work not found',
        message: `No creative work found with id ${id}`
      });
    }
    res.status(200).json(deletedWork);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to delete creative work',
      message: error.message
    });
  }
};

// Update only the status of a creative work
export const updateCreativeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!['Active', 'Inactive'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }
    const updatedWork = await Creative.findByIdAndUpdate(id, { status }, { new: true });
    if (!updatedWork) {
      return res.status(404).json({
        error: 'Creative work not found',
        message: `No creative work found with id ${id}`
      });
    }
    res.status(200).json(updatedWork);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to update creative work status',
      message: error.message
    });
  }
}; 