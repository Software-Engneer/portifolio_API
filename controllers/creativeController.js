import { v4 as uuidv4 } from 'uuid';

// Sample creative works data (in a real app, this would come from a database)
const creativeWorks = [
  {
    id: uuidv4(),
    title: 'Digital Art Collection',
    type: 'digital-art',
    description: 'A collection of digital artworks exploring modern aesthetics',
    images: [
      '/images/creative/art1.jpg',
      '/images/creative/art2.jpg'
    ],
    technologies: ['Photoshop', 'Illustrator', 'Procreate'],
    year: 2023,
    featured: true,
    createdAt: '2023-12-01T00:00:00.000Z'
  },
  {
    id: uuidv4(),
    title: 'Brand Identity Design',
    type: 'branding',
    description: 'Complete brand identity design for a tech startup',
    images: [
      '/images/creative/brand1.jpg',
      '/images/creative/brand2.jpg'
    ],
    technologies: ['Illustrator', 'InDesign'],
    year: 2023,
    featured: true,
    createdAt: '2023-11-15T00:00:00.000Z'
  },
  {
    id: uuidv4(),
    title: 'Photography Series',
    type: 'photography',
    description: 'Urban landscape photography series',
    images: [
      '/images/creative/photo1.jpg',
      '/images/creative/photo2.jpg'
    ],
    technologies: ['Lightroom', 'Photoshop'],
    year: 2022,
    featured: false,
    createdAt: '2022-12-01T00:00:00.000Z'
  }
];

// Get all creative works with filtering, sorting, and pagination
export const getAllCreativeWorks = async (req, res) => {
  try {
    const { type, featured, sort = 'createdAt', page = 1, limit = 10 } = req.query;
    let filteredWorks = [...creativeWorks];

    // Filter by type if provided
    if (type) {
      filteredWorks = filteredWorks.filter(work => work.type === type);
    }

    // Filter by featured if provided
    if (featured === 'true') {
      filteredWorks = filteredWorks.filter(work => work.featured);
    }

    // Sort works
    filteredWorks.sort((a, b) => {
      switch (sort) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'year':
          return b.year - a.year;
        case 'createdAt':
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

    // Calculate pagination
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const startIndex = (pageNumber - 1) * limitNumber;
    const endIndex = pageNumber * limitNumber;
    const totalItems = filteredWorks.length;
    const totalPages = Math.ceil(totalItems / limitNumber);

    // Get paginated results
    const paginatedWorks = filteredWorks.slice(startIndex, endIndex);

    res.status(200).json({
      works: paginatedWorks,
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
    const work = creativeWorks.find(w => w.id === id);

    if (!work) {
      return res.status(404).json({
        error: 'Creative work not found',
        message: `No creative work found with id ${id}`
      });
    }

    res.status(200).json(work);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch creative work',
      message: error.message
    });
  }
};

// Create new creative work
export const createCreativeWork = async (req, res) => {
  try {
    const { title, type, description, images, technologies, year, featured } = req.body;

    const newWork = {
      id: uuidv4(),
      title,
      type,
      description,
      images: images || [],
      technologies: technologies || [],
      year: year || new Date().getFullYear(),
      featured: featured || false,
      createdAt: new Date().toISOString()
    };

    creativeWorks.push(newWork);
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
    const workIndex = creativeWorks.findIndex(w => w.id === id);

    if (workIndex === -1) {
      return res.status(404).json({
        error: 'Creative work not found',
        message: `No creative work found with id ${id}`
      });
    }

    const updatedWork = {
      ...creativeWorks[workIndex],
      ...req.body,
      id, // Preserve the original UUID
      updatedAt: new Date().toISOString()
    };

    creativeWorks[workIndex] = updatedWork;
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
    const workIndex = creativeWorks.findIndex(w => w.id === id);

    if (workIndex === -1) {
      return res.status(404).json({
        error: 'Creative work not found',
        message: `No creative work found with id ${id}`
      });
    }

    const deletedWork = creativeWorks.splice(workIndex, 1)[0];
    res.status(200).json(deletedWork);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to delete creative work',
      message: error.message
    });
  }
}; 