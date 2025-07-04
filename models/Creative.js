import mongoose from 'mongoose';

const CreativeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  images: [String], // Will store full Cloudinary URLs
  technologies: [String],
  year: Number,
  featured: Boolean,
  likes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const Creative = mongoose.model('Creative', CreativeSchema);
export default Creative; 