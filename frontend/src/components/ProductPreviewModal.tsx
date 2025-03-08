'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FiMinus, FiPlus, FiX } from 'react-icons/fi';
import { CartItem } from '@/types/cart';

interface ProductImage {
  public_id: string;
  url: string;
}

interface Product {
  _id: string;
  title: string;
  price: string;
  originalPrice: string;
  description: string;
  discount: string;
  category: string;
  sizes: Array<{ size: string; price: string }>;
  stock: number;
  image: ProductImage;
}

interface ProductPreviewModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

export default function ProductPreviewModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
}: ProductPreviewModalProps) {
  const [selectedSize, setSelectedSize] = useState(
    product.sizes[0]?.size || ''
  );
  const [selectedPrice, setSelectedPrice] = useState(
    product.sizes[0]?.price || product.price
  );
  const [quantity, setQuantity] = useState(1);

  if (!isOpen) return null;

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    const sizeObj = product.sizes.find((s) => s.size === size);
    if (sizeObj) {
      setSelectedPrice(sizeObj.price);
    }
  };

  const handleAddToCart = () => {
    const selectedSizeObj = product.sizes.find((s) => s.size === selectedSize);
    const cartItem: CartItem = {
      id: product._id, // Make sure to include id field
      productId: product._id,
      title: product.title,
      price: selectedPrice,
      size: selectedSize,
      quantity,
      image: product.image?.url || '/placeholder-product.jpg',
    };
    onAddToCart(cartItem);
    onClose();
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4'>
      <div className='relative w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden'>
        <button
          onClick={onClose}
          className='absolute right-4 top-4 text-gray-500 hover:text-gray-700 z-10'
        >
          <FiX size={24} />
        </button>

        <div className='flex flex-col md:flex-row'>
          {/* Product Image */}
          <div className='w-full md:w-1/2 relative'>
            <div className='relative h-[300px] md:h-[500px]'>
              <Image
                src={product.image?.url || '/placeholder-product.jpg'}
                alt={product.title}
                fill
                className='object-cover'
                sizes='(max-width: 768px) 100vw, 50vw'
                priority
              />
              {product.discount && product.discount !== '0%' && (
                <div className='absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full'>
                  {product.discount}
                </div>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className='w-full md:w-1/2 p-6 md:p-8'>
            <h2 className='text-2xl font-bold mb-4'>{product.title}</h2>
            <p className='text-gray-600 mb-6'>{product.description}</p>
            {/* Price - Updated to use selectedPrice */}
            <div className='mb-6'>
              <span className='text-2xl font-bold text-green-600'>
                ₹{selectedPrice}
              </span>
              {product.originalPrice !== selectedPrice && (
                <span className='ml-3 text-lg text-gray-500 line-through'>
                  ₹{product.originalPrice}
                </span>
              )}
            </div>
            {/* Sizes - Updated to show price with each size and use handleSizeChange */}
            {product.sizes.length > 0 && (
              <div className='mb-6'>
                <h3 className='text-lg font-semibold mb-2'>
                  {product.category === 'Pesticides'
                    ? 'Select Volume'
                    : 'Select Size'}
                </h3>
                <div className='flex flex-wrap gap-2'>
                  {product.sizes.map((size) => (
                    <button
                      key={size.size}
                      onClick={() => handleSizeChange(size.size)}
                      className={`px-4 py-2 rounded-lg border ${
                        selectedSize === size.size
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <span className='block'>{size.size}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {/* Quantity */}
            <div className='mb-6'>
              <h3 className='text-lg font-semibold mb-2'>Quantity</h3>
              <div className='flex items-center space-x-4'>
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className='p-2 rounded-full border border-gray-300 hover:bg-gray-100'
                  disabled={quantity <= 1}
                >
                  <FiMinus />
                </button>
                <span className='text-xl font-semibold'>{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className='p-2 rounded-full border border-gray-300 hover:bg-gray-100'
                  disabled={quantity >= product.stock}
                >
                  <FiPlus />
                </button>
              </div>
            </div>
            {/* Stock Status */}
            <div className='mb-6'>
              {product.stock > 0 ? (
                <div className='flex items-center'>
                  <span className='inline-block w-3 h-3 bg-green-500 rounded-full mr-2'></span>
                  <span className='text-sm text-green-600'>
                    {product.stock} items in stock
                  </span>
                </div>
              ) : (
                <div className='flex items-center'>
                  <span className='inline-block w-3 h-3 bg-red-500 rounded-full mr-2'></span>
                  <span className='text-sm text-red-600'>Out of Stock</span>
                </div>
              )}
            </div>{' '}
            {/* Quantity - Existing code remains the same */}
            {/* Stock Status - Existing code remains the same */}
            {/* Add to Cart Button - Updated to use green theme */}
            <button
              onClick={handleAddToCart}
              disabled={
                product.stock === 0 ||
                (product.sizes.length > 0 && !selectedSize)
              }
              className='w-full py-3 px-6 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-semibold
                transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed'
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
