const express = require('express');
const router = express.Router();
const { uploadImage, deleteImage } = require('../controllers/uploadController');
const { isAuthenticatedAdmin } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Upload image route (protected)
router.post('/image', 
    isAuthenticatedAdmin, 
    upload.single('image'), 
    uploadImage
);

// Delete image route (protected)
router.delete('/image',
    isAuthenticatedAdmin,
    deleteImage
);

module.exports = router;
