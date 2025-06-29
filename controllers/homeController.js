// Home page data
export const getHomeData = async (req, res) => {
  try {
    // In a real application, this data might come from a database
    const homeData = {
      title: 'Welcome to My Portfolio',
      hero: {
        title: 'Full Stack Developer',
        subtitle: 'Building modern web and mobile applications',
        description: 'Hello! am Chikondi Matumula, a passionate software developer with a strong interest in building web applications, mobile applications, and exploring emerging technologies'
      },
      featured: {
        title: 'Featured Projects',
        items: [] // This can be populated with actual data later
      }
    };

    res.status(200).json(homeData);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch home data',
      message: error.message
    });
  }
};

// Hero section data
export const getHeroData = async (req, res) => {
  try {
    const heroData = {
      title: 'Full Stack Developer',
      subtitle: 'Building modern web and mobile applications',
      description: 'Passionate about creating efficient and scalable solutions for web and mobile platforms'
    };

    res.status(200).json(heroData);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch hero data',
      message: error.message
    });
  }
}; 