const mongoose = require('mongoose');

const sizeSchema = new mongoose.Schema({
    size: {
        type: String,
        // required: [true, 'Please enter size']
    },
    price: {
        type: String,
        // required: [true, 'Please enter price for this size']
    }
});

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        // required: [true, 'Please enter product title'],
        trim: true,
        maxLength: [100, 'Product title cannot exceed 100 characters']
    },
    price: {
        type: String,
        // required: [true, 'Please enter product price']
    },
    originalPrice: {
        type: String,
        // required: [true, 'Please enter original price']
    },
    description: {
        type: String,
        // required: [true, 'Please enter product description']
    },
    discount: {
        type: String,
        // required: [true, 'Please enter discount percentage']
    },
    image: {
        public_id: {
            type: String,
            // required: true
        },
        url: {
            type: String,
            // required: true
        }
    },
    category: {
        type: String,
        // required: [true, 'Please enter product category']
    },
    sizes: [sizeSchema],
    stock: {
        type: Number,
        // required: [true, 'Please enter product stock'],
        maxLength: [4, 'Stock cannot exceed 4 characters'],
        default: 1
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'Admin',
        // required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', productSchema);
