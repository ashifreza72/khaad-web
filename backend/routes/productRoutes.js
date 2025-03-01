const express = require('express');
const router = express.Router();
const {
    createProduct,
    getAllProducts,
    getProductDetails,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');
const { isAuthenticatedAdmin } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public routes
router.get('/', getAllProducts);
router.get('/:id', getProductDetails);

// Protected routes (admin only)
router.post(
    '/create',
    isAuthenticatedAdmin,
    upload.single('image'),
    createProduct
);

router.put(
    '/:id',
    isAuthenticatedAdmin,
    upload.single('image'),
    updateProduct
);

router.delete(
    '/:id',
    isAuthenticatedAdmin,
    deleteProduct
);

module.exports = router;
