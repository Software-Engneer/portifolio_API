import express from 'express';
import { getHomeData, getHeroData } from '../controllers/homeController.js';

const router = express.Router();

// Get home page data
router.get('/', getHomeData);

// Get hero section data
router.get('/hero', getHeroData);

export default router; 