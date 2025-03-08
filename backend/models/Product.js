const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    sold: { type: Number, default: 0 }, // Used for popularity
    views: { type: Number, default: 0 }, // Used for popularity
    rating: { type: Number, default: 0 }, // Used for popularity
    isFeatured: { type: Boolean, default: false }, // Used for featured products
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Product', productSchema);
