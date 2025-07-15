import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Hashed password
  name: { type: String, default: 'Admin User' }
});

const Admin = mongoose.model('Admin', AdminSchema);
export default Admin; 