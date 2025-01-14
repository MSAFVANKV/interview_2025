import express from 'express';
import { authenticateUser } from '../middlewares/authMiddleware.js';
import { createProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct } from '../controllers/productsController.js';
import { productUploadOptions } from '../config/multerConfig.js';

const router = express.Router();

router.post('/add-product',authenticateUser, productUploadOptions, createProduct)
router.get('/all-products',authenticateUser, productUploadOptions, getAllProducts)
router.delete('/delete-products/:productId', authenticateUser, deleteProduct);

router.put(
    "/updateProduct/:id",
    authenticateUser,
    (req, res) => {
      productUploadOptions(req, res, function (err) {
        if (err) {
          return res.status(400).json({ msg: err });
        }
        updateProduct(req, res);
      });
    }
  );

  router.get(
    "/getSingleProduct/:id",
    authenticateUser,
    getSingleProduct
  );




export default router;
