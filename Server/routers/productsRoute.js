import express from 'express';
import { authenticateUser } from '../middlewares/authMiddleware.js';
import { createProduct, deleteProduct, getAllProducts } from '../controllers/productsController.js';
import { productUploadOptions } from '../config/multerConfig.js';

const router = express.Router();

router.post('/add-product',authenticateUser, productUploadOptions, createProduct)
router.get('/all-products',authenticateUser, productUploadOptions, getAllProducts)
router.delete('/delete-products/:productId', authenticateUser, deleteProduct);




export default router;
