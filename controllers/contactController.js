import { v4 as uuidv4 } from 'uuid';
import Contact from '../models/Contact.js';

// Get contact information
export const getContactInfo = async (req, res) => {
  try {
    res.status(200).json({
      email: 'your.email@example.com',
      phone: '+1 234 567 890',
      location: 'Your Location',
      social: {
        github: 'https://github.com/yourusername',
        linkedin: 'https://linkedin.com/in/yourusername',
        twitter: 'https://twitter.com/yourusername'
      }
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch contact information',
      message: error.message
    });
  }
};

// Receive a new message from the frontend (contact form)
export const receiveMessage = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, message } = req.body;

    // Create new message in database
    const newMessage = new Contact({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phoneNumber: phoneNumber.trim(),
      message: message.trim()
    });

    await newMessage.save();

    // In a real application, you would:
    // 1. Send an email notification
    // 2. Maybe trigger other notifications

    res.status(201).json({
      success: true,
      message: 'Message received!',
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
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ messages });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch messages',
      message: error.message
    });
  }
};

// Delete a specific message
export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedMessage = await Contact.findByIdAndDelete(id);
    
    if (!deletedMessage) {
      return res.status(404).json({
        error: 'Message not found',
        message: 'The specified message does not exist'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Message deleted successfully',
      data: deletedMessage
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to delete message',
      message: error.message
    });
  }
};

// Mark message as read
export const markMessageAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    
    const updatedMessage = await Contact.findByIdAndUpdate(
      id, 
      { read: true }, 
      { new: true }
    );
    
    if (!updatedMessage) {
      return res.status(404).json({
        error: 'Message not found',
        message: 'The specified message does not exist'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Message marked as read',
      data: updatedMessage
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to mark message as read',
      message: error.message
    });
  }
}; 