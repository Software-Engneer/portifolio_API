import express from 'express';
import {
  getContactInfo,
  receiveMessage,
  getAllMessages
} from '../controllers/contactController.js';

const router = express.Router();

// Get contact information
router.get('/', getContactInfo);

// Submit contact form
router.post('/message', receiveMessage);

// Get all messages (protected route in real app)
router.get('/messages', getAllMessages);

export default router; 