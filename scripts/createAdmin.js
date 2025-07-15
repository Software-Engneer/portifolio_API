import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Admin from '../models/Admin.js';
import 'dotenv/config';

const MONGODB_URI = process.env.MONGODB_URI;

const createAdmin = async () => {
  if (!MONGODB_URI) {
    console.error('MONGODB_URI not set in environment variables.');
    process.exit(1);
  }
  await mongoose.connect(MONGODB_URI);
  const email = 'admin@example.com';
  const password = 'admin123';
  const name = 'Admin User';
  const hashedPassword = await bcrypt.hash(password, 10);
  let admin = await Admin.findOne({ email });
  if (admin) {
    console.log('Admin already exists.');
  } else {
    admin = new Admin({ email, password: hashedPassword, name });
    await admin.save();
    console.log('Admin user created:', email);
  }
  mongoose.disconnect();
};

createAdmin(); 