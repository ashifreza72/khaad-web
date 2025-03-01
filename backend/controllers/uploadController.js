const cloudinary = require('../config/cloudinary');
const fs = require('fs');
const path = require('path');

exports.uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Please upload a file'
            });
        }

        // Get the full path of the uploaded file
        const filePath = path.join(__dirname, '..', req.file.path);

        // Upload to cloudinary
        const result = await cloudinary.uploader.upload(filePath, {
            folder: 'khaad-web',
            width: 1000,
            crop: 'scale'
        });

        // Delete file from server after upload
        fs.unlink(filePath, (err) => {
            if (err) console.error('Error deleting local file:', err);
        });

        res.status(200).json({
            success: true,
            message: 'Image uploaded successfully',
            data: {
                public_id: result.public_id,
                url: result.secure_url
            }
        });

    } catch (error) {
        console.error('Upload error:', error);
        
        // Delete file from server if upload fails
        if (req.file) {
            const filePath = path.join(__dirname, '..', req.file.path);
            fs.unlink(filePath, (err) => {
                if (err) console.error('Error deleting local file:', err);
            });
        }

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.deleteImage = async (req, res) => {
    try {
        const { public_id } = req.body;

        if (!public_id) {
            return res.status(400).json({
                success: false,
                message: 'Please provide public_id'
            });
        }

        // Delete from cloudinary
        await cloudinary.uploader.destroy(public_id);

        res.status(200).json({
            success: true,
            message: 'Image deleted successfully'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
