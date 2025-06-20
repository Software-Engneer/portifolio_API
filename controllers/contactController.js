import { v4 as uuidv4 } from 'uuid';

// Sample contact data (in a real app, this would come from a database)
const contactData = {
  email: 'your.email@example.com',
  phone: '+1 234 567 890',
  location: 'Your Location',
  social: {
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
    twitter: 'https://twitter.com/yourusername'
  }
};

// Store messages (in a real app, this would be in a database)
const messages = [];

// Get contact information
export const getContactInfo = async (req, res) => {
  try {
    res.status(200).json(contactData);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch contact information',
      message: error.message
    });
  }
};

// Submit contact form
export const submitContactForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Please provide all required fields: name, email, subject, and message'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Invalid email format',
        message: 'Please provide a valid email address'
      });
    }

    // Create new message
    const newMessage = {
      id: uuidv4(),
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString()
    };

    // Store message
    messages.push(newMessage);

    // In a real application, you would:
    // 1. Send an email notification
    // 2. Store in database
    // 3. Maybe trigger other notifications

    res.status(201).json({
      success: true,
      message: 'Message received! I will get back to you soon.',
      data: newMessage
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to submit message',
      message: error.message
    });
  }
};

// Get all messages (protected route in real app)
export const getAllMessages = async (req, res) => {
  try {
    res.status(200).json({ messages });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch messages',
      message: error.message
    });
  }
}; 