'use client';
import { useEffect, useState } from 'react';
import { FiX, FiShoppingCart } from 'react-icons/fi';
import Image from 'next/image';
import { useCart } from '@/context/CartContext'; // Import the CartContext
import SuccessDialog from './SuccessDialog'; // Import the SuccessDialog

interface Size {
  size: string;
  price: string;
}

interface Product {
  id: number;
  title: string;
  originalPrice: string;
  image: string;
  description: string;
  sizes?: Size[]; // Array of sizes with prices
  category: string; // Add category to check
}

const ProductDetailModal = ({
  product,
  isOpen,
  onClose,
}: {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { addToCart } = useCart(); // Get the addToCart function from context
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({}); // Store quantities for each size
  const [showSuccessDialog, setShowSuccessDialog] = useState(false); // State for success dialog

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    } else {
      document.body.style.overflow = 'unset'; // Allow scrolling
    }
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    if (selectedSize) {
      const itemToAdd = {
        id: product.id,
        title: product.title,
        size: selectedSize.size,
        quantity: quantities[selectedSize.size] || 0,
        price: selectedSize.price,
        image: product.image,
      };
      addToCart(itemToAdd); // Add the item to the cart
      console.log(
        `Added to cart: ${itemToAdd.title}, Size: ${itemToAdd.size}, Quantity: ${itemToAdd.quantity}`
      );
      setShowSuccessDialog(true); // Show success dialog
      onClose(); // Close the modal after adding to cart
    }
  };

  const handleQuantityChange = (size: string, change: number) => {
    setQuantities((prev) => ({
      ...prev,
      [size]: Math.max((prev[size] || 0) + change, 0), // Ensure quantity is at least 0
    }));
  };

  // Calculate total price based on selected sizes and their quantities
  const totalPrice = Object.keys(quantities)
    .reduce((total, sizeKey) => {
      const size = product.sizes?.find((s) => s.size === sizeKey);
      if (size) {
        total +=
          parseFloat(size.price.replace('₹', '')) * (quantities[sizeKey] || 0);
      }
      return total;
    }, 0)
    .toFixed(2);

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center px-4'>
      {/* Backdrop */}
      <div
        className='absolute inset-0 bg-black/50 backdrop-blur-sm'
        onClick={onClose}
      />

      {/* Modal */}
      <div className='relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6'>
        {/* Close Button */}
        <button
          onClick={onClose}
          className='absolute right-4 top-4 text-gray-400 hover:text-gray-600'
        >
          <FiX className='w-5 h-5' />
        </button>

        {/* Content */}
        <div className='text-center mb-6'>
          <h3 className='text-2xl font-bold text-gray-900 mb-2'>
            {product.title}
          </h3>
          <Image
            src={product.image}
            alt={product.title}
            width={300}
            height={200}
            className='object-cover mb-4'
          />
          <p className='text-gray-600 mb-4'>{product.description}</p>
          <div className='flex justify-center items-center mb-4'>
            <span className='text-lg font-bold text-gray-900'>
              {selectedSize ? selectedSize.price : product.originalPrice}
            </span>
            <span className='text-sm text-gray-500 line-through ml-2'>
              {product.originalPrice}
            </span>
          </div>

          {/* Size Selection (only for pesticides) */}
          {product.category === 'Pesticides' && (
            <div className='mb-4'>
              <h4 className='text-lg font-semibold'>Select Size:</h4>
              <div className='flex justify-center space-x-2 mt-2'>
                {(product.sizes || []).map((size) => (
                  <button
                    key={size.size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-1 px-3 border rounded-lg transition duration-300 ${
                      selectedSize?.size === size.size
                        ? 'bg-blue-500 text-white'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    {size.size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Adjustment */}
          {selectedSize && (
            <div className='flex items-center justify-center mb-4'>
              <button
                onClick={() => handleQuantityChange(selectedSize.size, -1)}
                className='bg-gray-200 px-3 py-1 rounded-l-lg'
              >
                -
              </button>
              <span className='px-4'>{quantities[selectedSize.size] || 0}</span>
              <button
                onClick={() => handleQuantityChange(selectedSize.size, 1)}
                className='bg-gray-200 px-3 py-1 rounded-r-lg'
              >
                +
              </button>
            </div>
          )}

          {/* Total Price Display */}
          <div className='text-lg font-bold text-gray-900 mb-4'>
            Total Price: ₹{totalPrice}
          </div>

          <button
            onClick={handleAddToCart}
            className='w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition duration-300'
          >
            <FiShoppingCart className='w-5 h-5' />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>

      {/* Success Dialog */}
      {showSuccessDialog && (
        <SuccessDialog
          message='Item added to cart successfully!'
          onClose={() => setShowSuccessDialog(false)}
        />
      )}
    </div>
  );
};

export default ProductDetailModal;
