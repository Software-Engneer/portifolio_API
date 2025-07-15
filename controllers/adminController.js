import Admin from '../models/Admin.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

// Admin login
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }
    // Create JWT
    const token = jwt.sign({ id: admin._id, email: admin.email, name: admin.name }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, admin: { email: admin.email, name: admin.name } });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: error.message });
  }
}; 