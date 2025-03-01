const Admin = require('../models/adminModel');
const jwt = require('jsonwebtoken');

// Register a new admin
exports.registerAdmin = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({
                success: false,
                message: 'Admin already exists with this email'
            });
        }

        // Create new admin
        const admin = await Admin.create({
            name,
            email,
            password,
            role
        });

        const token = admin.getJwtToken();

        res.status(201).json({
            success: true,
            token,
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Login admin
exports.loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password'
            });
        }

        // Find admin in database
        const admin = await Admin.findOne({ email }).select('+password');
        if (!admin) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Check if password matches
        const isPasswordMatched = await admin.comparePassword(password);
        if (!isPasswordMatched) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        const token = admin.getJwtToken();

        res.status(200).json({
            success: true,
            token,
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get admin profile
exports.getAdminProfile = async (req, res) => {
    try {
        const admin = await Admin.findById(req.admin.id);

        res.status(200).json({
            success: true,
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role,
                createdAt: admin.createdAt
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update admin profile
exports.updateProfile = async (req, res) => {
    try {
        const newData = {
            name: req.body.name,
            email: req.body.email
        };

        const admin = await Admin.findByIdAndUpdate(req.admin.id, newData, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
