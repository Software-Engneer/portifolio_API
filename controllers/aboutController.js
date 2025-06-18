// Sample about data (in a real app, this would come from a database)
const aboutData = {
  personal: {
    name: 'Your Name',
    title: 'Full Stack Developer',
    bio: 'A passionate developer with experience in building modern web applications.',
    location: 'Your Location',
    email: 'your.email@example.com'
  },
  skills: {
    frontend: ['React', 'Vue.js', 'HTML5', 'CSS3', 'JavaScript'],
    backend: ['Node.js', 'Express', 'Python', 'Django'],
    database: ['MongoDB', 'PostgreSQL', 'MySQL'],
    tools: ['Git', 'Docker', 'AWS', 'VS Code']
  },
  experience: [
    {
      title: 'Senior Developer',
      company: 'Tech Company',
      period: '2020 - Present',
      description: 'Leading development of enterprise applications'
    },
    {
      title: 'Full Stack Developer',
      company: 'Startup Inc',
      period: '2018 - 2020',
      description: 'Developed and maintained multiple web applications'
    }
  ],
  education: [
    {
      degree: 'Bachelor of Computer Science',
      school: 'University Name',
      year: '2018'
    }
  ]
};

// Get complete about data
export const getAboutData = async (req, res) => {
  try {
    res.status(200).json(aboutData);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch about data',
      message: error.message
    });
  }
};

// Get skills data
export const getSkillsData = async (req, res) => {
  try {
    res.status(200).json(aboutData.skills);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch skills data',
      message: error.message
    });
  }
};

// Update about data
export const updateAboutData = async (req, res) => {
  try {
    const { section, data } = req.body;

    if (!aboutData[section]) {
      return res.status(400).json({
        error: 'Invalid section',
        message: `Section '${section}' does not exist`
      });
    }

    aboutData[section] = { ...aboutData[section], ...data };
    res.status(200).json(aboutData[section]);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to update about data',
      message: error.message
    });
  }
}; 