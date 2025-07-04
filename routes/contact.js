import express from 'express';
import {
  getContactInfo,
  receiveMessage,
  getAllMessages,
  deleteMessage
} from '../controllers/contactController.js';

const router = express.Router();

// Get contact information
router.get('/', getContactInfo);

// Submit contact form
router.post('/message', receiveMessage);

// Get all messages (protected route in real app)
router.get('/messages', getAllMessages);

// Delete a specific message
router.delete('/messages/:id', deleteMessage);

export default router; 