import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [String],
  image: String,
  githubLink: String,
  projectLink: String,
  featured: { type: Boolean, default: false },
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const Project = mongoose.model('Project', ProjectSchema);
export default Project; 