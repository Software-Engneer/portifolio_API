import express from 'express';
import {
  getContactInfo,
  submitContactForm,
  getAllMessages
} from '../controllers/contactController.js';

const router = express.Router();

// Get contact information
router.get('/', getContactInfo);

// Submit contact form
router.post('/message', submitContactForm);

// Get all messages (protected route in real app)
router.get('/messages', getAllMessages);

export default router; 