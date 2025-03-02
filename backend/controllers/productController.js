const Product = require('../models/productModel');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');
const path = require('path');

// Create new product
exports.createProduct = async (req, res) => {
    try {
        const { title, price, originalPrice, description, discount, category, sizes, stock } = req.body;

        // Check if image exists
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Please upload product image'
            });
        }

        // Upload image to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'khaad-web/products',
            width: 1000,
            crop: 'scale'
        });

        // Delete the temporary file
        fs.unlink(req.file.path, (err) => {
            if (err) console.error('Error deleting local file:', err);
        });

        // Parse sizes if it's a string
        let parsedSizes = [];
        try {
            parsedSizes = sizes ? (typeof sizes === 'string' ? JSON.parse(sizes) : sizes) : [];
        } catch (error) {
            console.error('Error parsing sizes:', error);
        }

        // Create product
        const product = await Product.create({
            title: title || 'Untitled Product',
            price: price || '0',
            originalPrice: originalPrice || price || '0',
            description: description || 'No description provided',
            discount: discount || '0%',
            category: category || 'Uncategorized',
            sizes: parsedSizes,
            stock: parseInt(stock) || 1,
            image: {
                public_id: result.public_id,
                url: result.secure_url
            },
            createdBy: req.admin.id
        });

        res.status(201).json({
            success: true,
            product
        });
    } catch (error) {
        console.error('Error creating product:', error);
        
        // Clean up uploaded file if it exists
        if (req.file) {
            fs.unlink(req.file.path, (err) => {
                if (err) console.error('Error deleting local file:', err);
            });
        }

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        
        res.status(200).json({
            success: true,
            count: products.length,
            products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get single product details
exports.getProductDetails = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update product
exports.updateProduct = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);
        
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        // Check if new image is uploaded
        if (req.file) {
            // Delete old image from cloudinary
            await cloudinary.uploader.destroy(product.image.public_id);
            
            // Upload new image
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'khaad-web/products',
                width: 1000,
                crop: 'scale'
            });

            // Delete the temporary file
            fs.unlink(req.file.path, (err) => {
                if (err) console.error('Error deleting local file:', err);
            });

            req.body.image = {
                public_id: result.public_id,
                url: result.secure_url
            };
        }

        // Parse sizes if provided
        if (req.body.sizes) {
            try {
                req.body.sizes = typeof req.body.sizes === 'string' ? JSON.parse(req.body.sizes) : req.body.sizes;
            } catch (error) {
                console.error('Error parsing sizes:', error);
                return res.status(400).json({
                    success: false,
                    message: 'Invalid sizes format'
                });
            }
        }

        // Remove fields that shouldn't be updated
        delete req.body.createdBy;
        delete req.body.createdAt;

        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        console.error('Error updating product:', error);
        
        // Clean up uploaded file if it exists
        if (req.file) {
            fs.unlink(req.file.path, (err) => {
                if (err) console.error('Error deleting local file:', err);
            });
        }

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Delete product
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        // Delete image from cloudinary
        if (product.image.public_id) {
            await cloudinary.uploader.destroy(product.image.public_id);
        }

        await product.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
