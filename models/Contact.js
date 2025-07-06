import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

// Index for better query performance
ContactSchema.index({ createdAt: -1 });
ContactSchema.index({ email: 1 });

const Contact = mongoose.model('Contact', ContactSchema);
export default Contact; 