import { v4 as uuidv4 } from 'uuid';

// Real image paths for different creative types
const CREATIVE_IMAGES = {
  digitalArt: '/images/digital-art.jpg',
  branding: '/images/branding.jpg',
  photography: '/images/photography.jpg',
  illustration: '/images/illustration.jpg',
  webDesign: '/images/web-design.jpg',
  animation: '/images/animation.jpg'
};

// Sample creative works data (in a real app, this would come from a database)
const creativeWorks = [
  {
    id: uuidv4(),
    title: 'Digital Art Collection',
    type: 'digital-art',
    description: 'A collection of digital artworks exploring modern aesthetics and color theory',
    images: [
      CREATIVE_IMAGES.digitalArt,
      CREATIVE_IMAGES.illustration
    ],
    technologies: ['Photoshop', 'Illustrator', 'Procreate'],
    year: 2023,
    featured: true,
    likes: 42,
    views: 156,
    createdAt: '2023-12-01T00:00:00.000Z'
  },
  {
    id: uuidv4(),
    title: 'Brand Identity Design',
    type: 'branding',
    description: 'Complete brand identity design for a tech startup including logo, color palette, and style guide',
    images: [
      CREATIVE_IMAGES.branding,
      CREATIVE_IMAGES.digitalArt
    ],
    technologies: ['Illustrator', 'InDesign', 'Photoshop'],
    year: 2023,
    featured: true,
    likes: 67,
    views: 234,
    createdAt: '2023-11-15T00:00:00.000Z'
  },
  {
    id: uuidv4(),
    title: 'Urban Photography Series',
    type: 'photography',
    description: 'Urban landscape photography series capturing the essence of city life',
    images: [
      CREATIVE_IMAGES.photography,
      CREATIVE_IMAGES.digitalArt
    ],
    technologies: ['Lightroom', 'Photoshop', 'Canon EOS R'],
    year: 2022,
    featured: false,
    likes: 38,
    views: 189,
    createdAt: '2022-12-01T00:00:00.000Z'
  },
  {
    id: uuidv4(),
    title: 'Character Illustration Set',
    type: 'illustration',
    description: 'A series of character illustrations for a children\'s book project',
    images: [
      CREATIVE_IMAGES.illustration,
      CREATIVE_IMAGES.digitalArt
    ],
    technologies: ['Procreate', 'Photoshop', 'Wacom Tablet'],
    year: 2023,
    featured: true,
    likes: 89,
    views: 312,
    createdAt: '2023-10-20T00:00:00.000Z'
  },
  {
    id: uuidv4(),
    title: 'E-commerce Website Design',
    type: 'web-design',
    description: 'Modern e-commerce website design with focus on user experience and conversion',
    images: [
      CREATIVE_IMAGES.webDesign,
      CREATIVE_IMAGES.branding
    ],
    technologies: ['Figma', 'Adobe XD', 'Sketch'],
    year: 2023,
    featured: false,
    likes: 45,
    views: 178,
    createdAt: '2023-09-15T00:00:00.000Z'
  },
  {
    id: uuidv4(),
    title: 'Animated Logo Design',
    type: 'animation',
    description: 'Animated logo design with smooth transitions and modern motion graphics',
    images: [
      CREATIVE_IMAGES.animation,
      CREATIVE_IMAGES.branding
    ],
    technologies: ['After Effects', 'Illustrator', 'Premiere Pro'],
    year: 2022,
    featured: true,
    likes: 73,
    views: 245,
    createdAt: '2022-11-10T00:00:00.000Z'
  },
  {
    id: uuidv4(),
    title: 'Abstract Digital Paintings',
    type: 'digital-art',
    description: 'Collection of abstract digital paintings exploring emotions through color and form',
    images: [
      CREATIVE_IMAGES.digitalArt,
      CREATIVE_IMAGES.illustration
    ],
    technologies: ['Procreate', 'Photoshop', 'Corel Painter'],
    year: 2022,
    featured: false,
    likes: 28,
    views: 134,
    createdAt: '2022-08-20T00:00:00.000Z'
  },
  {
    id: uuidv4(),
    title: 'Product Photography',
    type: 'photography',
    description: 'Professional product photography for e-commerce and marketing materials',
    images: [
      CREATIVE_IMAGES.photography,
      CREATIVE_IMAGES.webDesign
    ],
    technologies: ['Lightroom', 'Photoshop', 'Studio Lighting'],
    year: 2023,
    featured: false,
    likes: 52,
    views: 201,
    createdAt: '2023-07-05T00:00:00.000Z'
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
        case 'likes':
          return b.likes - a.likes;
        case 'views':
          return b.views - a.views;
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

    // Increment views when work is viewed
    work.views += 1;

    res.status(200).json(work);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch creative work',
      message: error.message
    });
  }
};

// Like/unlike a creative work
export const toggleLikeCreativeWork = async (req, res) => {
  try {
    const { id } = req.params;
    const work = creativeWorks.find(w => w.id === id);

    if (!work) {
      return res.status(404).json({
        error: 'Creative work not found',
        message: `No creative work found with id ${id}`
      });
    }

    // Toggle like (in a real app, you'd track user-specific likes)
    work.likes += 1;

    res.status(200).json({
      message: 'Like updated successfully',
      work: {
        id: work.id,
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
      likes: 0,
      views: 0,
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