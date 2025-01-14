import express from 'express'
import { authenticateUser } from '../middlewares/authMiddleware.js';
import { productUploadOptions } from '../config/multerConfig.js';
import { createBanner, getBanners } from '../controllers/bannerController.js';

const router = express.Router();



router.post("/add-banner",authenticateUser,productUploadOptions, createBanner);

router.get('/get-banners', getBanners);


export default router