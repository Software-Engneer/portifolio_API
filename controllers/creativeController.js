import { v4 as uuidv4 } from 'uuid';

// Base64 encoded placeholder images for different creative types
const PLACEHOLDER_IMAGES = {
  digitalArt: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2YwZjhmZiIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwMCIgcj0iNDAiIGZpbGw9IiNmZjY2NjYiLz48Y2lyY2xlIGN4PSIyMDAiIGN5PSIxMDAiIHI9IjQwIiBmaWxsPSIjNjZmZjY2Ii8+PGNpcmNsZSBjeD0iMTUwIiBjeT0iMTUwIiByPSI0MCIgZmlsbD0iIzY2NjZmZiIvPjx0ZXh0IHg9IjUwJSIgeT0iMTkwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkRpZ2l0YWwgQXJ0PC90ZXh0Pjwvc3ZnPg==',
  branding: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y5ZjlmOSIvPjxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiMzMzMiLz48dGV4dCB4PSIxNTAiIHk9IjEwNSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE2IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+QnJhbmQ8L3RleHQ+PHRleHQgeD0iNTAlIiB5PSIxOTAiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+QnJhbmRpbmc8L3RleHQ+PC9zdmc+',
  photography: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzMzMyIvPjxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjI4MCIgaGVpZ2h0PSIxODAiIGZpbGw9IiM2NjYiLz48Y2lyY2xlIGN4PSIxNTAiIGN5PSIxMDAiIHI9IjMwIiBmaWxsPSIjOTk5Ii8+PGNpcmNsZSBjeD0iMTUwIiBjeT0iMTAwIiByPSIyMCIgZmlsbD0iI2NjYyIvPjx0ZXh0IHg9IjUwJSIgeT0iMTkwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5QaG90b2dyYXBoeTwvdGV4dD48L3N2Zz4=',
  illustration: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2ZmZjlmZiIvPjxwYXRoIGQ9Ik01MCAxNTAgTDEwMCA1MCBMMTUwIDEwMCBMMjAwIDUwIEwyNTAgMTUwIiBzdHJva2U9IiMzMzMiIHN0cm9rZS13aWR0aD0iMyIgZmlsbD0ibm9uZSIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjUwIiByPSI4IiBmaWxsPSIjZmY2NjY2Ii8+PGNpcmNsZSBjeD0iMTUwIiBjeT0iMTAwIiByPSI4IiBmaWxsPSIjNjZmZjY2Ii8+PGNpcmNsZSBjeD0iMjAwIiBjeT0iNTAiIHI9IjgiIGZpbGw9IiM2NjY2ZmYiLz48dGV4dCB4PSI1MCUiIHk9IjE5MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSIjNjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5JbGx1c3RyYXRpb248L3RleHQ+PC9zdmc+',
  webDesign: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2YwZjhmZiIvPjxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiM2NjYiLz48cmVjdCB4PSI2MCIgeT0iNzAiIHdpZHRoPSIxODAiIGhlaWdodD0iMTUiIGZpbGw9IiM5OTkiLz48cmVjdCB4PSI2MCIgeT0iOTAiIHdpZHRoPSIxNDAiIGhlaWdodD0iMTUiIGZpbGw9IiM5OTkiLz48cmVjdCB4PSI2MCIgeT0iMTEwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjE1IiBmaWxsPSIjOTk5Ii8+PHRleHQgeD0iNTAlIiB5PSIxOTAiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+V2ViIERlc2lnbjwvdGV4dD48L3N2Zz4=',
  animation: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y5ZjlmOSIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwMCIgcj0iMzAiIGZpbGw9IiNmZjY2NjYiLz48Y2lyY2xlIGN4PSIyMDAiIGN5PSIxMDAiIHI9IjMwIiBmaWxsPSIjNjZmZjY2Ii8+PGxpbmUgeDE9IjEzMCIgeTE9IjEwMCIgeDI9IjE3MCIgeTI9IjEwMCIgc3Ryb2tlPSIjMzMzIiBzdHJva2Utd2lkdGg9IjMiLz48dGV4dCB4PSI1MCUiIHk9IjE5MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSIjNjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5BbmltYXRpb248L3RleHQ+PC9zdmc+'
};

// Sample creative works data (in a real app, this would come from a database)
const creativeWorks = [
  {
    id: uuidv4(),
    title: 'Digital Art Collection',
    type: 'digital-art',
    description: 'A collection of digital artworks exploring modern aesthetics and color theory',
    images: [
      PLACEHOLDER_IMAGES.digitalArt,
      PLACEHOLDER_IMAGES.illustration
    ],
    technologies: ['Photoshop', 'Illustrator', 'Procreate'],
    year: 2023,
    featured: true,
    rating: 4.2,
    totalRatings: 15,
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
      PLACEHOLDER_IMAGES.branding,
      PLACEHOLDER_IMAGES.digitalArt
    ],
    technologies: ['Illustrator', 'InDesign', 'Photoshop'],
    year: 2023,
    featured: true,
    rating: 4.8,
    totalRatings: 23,
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
      PLACEHOLDER_IMAGES.photography,
      PLACEHOLDER_IMAGES.digitalArt
    ],
    technologies: ['Lightroom', 'Photoshop', 'Canon EOS R'],
    year: 2022,
    featured: false,
    rating: 4.5,
    totalRatings: 18,
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
      PLACEHOLDER_IMAGES.illustration,
      PLACEHOLDER_IMAGES.digitalArt
    ],
    technologies: ['Procreate', 'Photoshop', 'Wacom Tablet'],
    year: 2023,
    featured: true,
    rating: 4.7,
    totalRatings: 31,
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
      PLACEHOLDER_IMAGES.webDesign,
      PLACEHOLDER_IMAGES.branding
    ],
    technologies: ['Figma', 'Adobe XD', 'Sketch'],
    year: 2023,
    featured: false,
    rating: 4.3,
    totalRatings: 12,
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
      PLACEHOLDER_IMAGES.animation,
      PLACEHOLDER_IMAGES.branding
    ],
    technologies: ['After Effects', 'Illustrator', 'Premiere Pro'],
    year: 2022,
    featured: true,
    rating: 4.6,
    totalRatings: 27,
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
      PLACEHOLDER_IMAGES.digitalArt,
      PLACEHOLDER_IMAGES.illustration
    ],
    technologies: ['Procreate', 'Photoshop', 'Corel Painter'],
    year: 2022,
    featured: false,
    rating: 4.1,
    totalRatings: 9,
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
      PLACEHOLDER_IMAGES.photography,
      PLACEHOLDER_IMAGES.webDesign
    ],
    technologies: ['Lightroom', 'Photoshop', 'Studio Lighting'],
    year: 2023,
    featured: false,
    rating: 4.4,
    totalRatings: 16,
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
        case 'rating':
          return b.rating - a.rating;
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

// Rate a creative work (1-5 stars)
export const rateCreativeWork = async (req, res) => {
  try {
    console.log('rateCreativeWork called with:', req.params, req.body);
    const { id } = req.params;
    const { rating } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        error: 'Invalid rating',
        message: 'Rating must be between 1 and 5'
      });
    }

    const work = creativeWorks.find(w => w.id === id);
    console.log('Found work:', work);

    if (!work) {
      return res.status(404).json({
        error: 'Creative work not found',
        message: `No creative work found with id ${id}`
      });
    }

    // Update rating
    const totalRating = work.rating * work.totalRatings + rating;
    work.totalRatings += 1;
    work.rating = totalRating / work.totalRatings;

    console.log('Updated rating:', work.rating);

    res.status(200).json({
      message: 'Rating updated successfully',
      work: {
        id: work.id,
        title: work.title,
        rating: work.rating,
        totalRatings: work.totalRatings
      }
    });
  } catch (error) {
    console.error('Error in rateCreativeWork:', error);
    res.status(500).json({
      error: 'Failed to rate creative work',
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
      rating: 0,
      totalRatings: 0,
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