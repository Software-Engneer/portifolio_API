import express from 'express';
import {
  getContactInfo,
  receiveMessage,
  getAllMessages,
  deleteMessage,
  markMessageAsRead
} from '../controllers/contactController.js';
import { validateContactMessage } from '../middleware/validation.js';

const router = express.Router();

// Get contact information
router.get('/', getContactInfo);

// Submit contact form
router.post('/message', validateContactMessage, receiveMessage);

// Get all messages (protected route in real app)
router.get('/messages', getAllMessages);

// Mark message as read
router.patch('/messages/:id/read', markMessageAsRead);

// Delete a specific message
router.delete('/messages/:id', deleteMessage);

export default router; 