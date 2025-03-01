const express = require('express');
const router = express.Router();
const {
    registerAdmin,
    loginAdmin,
    getAdminProfile,
    updateProfile
} = require('../controllers/adminController');
const { isAuthenticatedAdmin, authorizeRoles } = require('../middleware/auth');

// Public routes
router.post('/register', registerAdmin);
router.post('/login', loginAdmin);

// Protected routes
router.get('/profile', isAuthenticatedAdmin, getAdminProfile);
router.put('/profile/update', isAuthenticatedAdmin, updateProfile);

// Super admin only routes
router.get('/all', isAuthenticatedAdmin, authorizeRoles('superadmin'), async (req, res) => {
    try {
        const admins = await Admin.find().select('-password');
        res.status(200).json({
            success: true,
            admins
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;
