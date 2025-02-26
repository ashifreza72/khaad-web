'use client';
import { useEffect, useState } from 'react';
import { FiX, FiShoppingCart, FiMinus, FiPlus } from 'react-icons/fi';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import toast from 'react-hot-toast';
import Toast from './Toast';

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
  sizes?: Size[];
  category: string;
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
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [quantity, setQuantity] = useState<number>(0);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (isOpen && product) {
      document.body.style.overflow = 'hidden';
      setSelectedSize(null);
      setQuantity(0);
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen, product]);

  if (!isOpen || !product) return null;

  const handleSizeSelection = (size: Size) => {
    setSelectedSize(size);
    setQuantity(0); // Reset quantity to 1 when selecting a new size
  };

  const handleQuantityChange = (change: number) => {
    setQuantity((prev) => Math.max(prev + change, 0));
  };

  const handleAddToCart = () => {
    if (selectedSize && quantity > 0) {
      const itemToAdd = {
        id: product.id,
        title: product.title,
        size: selectedSize.size,
        quantity,
        price: selectedSize.price,
        image: product.image,
      };
      addToCart(itemToAdd);
      toast.success('Item added to cart successfully!', {
        duration: 2000,
        position: 'bottom-center',
        style: {
          background: '#4CAF50',
          color: '#fff',
          padding: '16px',
          borderRadius: '10px',
        },
      });
      // Reset the form
      setSelectedSize(null);
      setQuantity(0);
      onClose();
    }
  };

  const totalPrice = selectedSize
    ? (parseFloat(selectedSize.price.replace('₹', '')) * quantity).toFixed(2)
    : '0.00';

  return (
    <>
      <div className='fixed inset-0 z-50 flex items-center justify-center px-4'>
        {/* Backdrop */}
        <div className='absolute inset-0 bg-black/50 backdrop-blur-sm' onClick={onClose} />

        {/* Modal */}
        <div className='relative bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[75vh] overflow-y-auto'>
          {/* Close Button */}
          <button
            onClick={onClose}
            className='absolute right-4 top-4 z-10 text-gray-400 hover:text-gray-800'
          >
            <FiX className='w-5 h-5' />
          </button>

          {/* Content */}
          <div className='p-2 text-center'>
            <h3 className='text-2xl font-bold text-gray-900 mb-2'>{product.title}</h3>

            {/* Product Image */}
            <div className='relative h-52 mb-4'>
              <Image
                src={product.image}
                alt={product.title}
                fill
                className='object-contain'
                sizes="(max-width: 668px) 100vw, 300px"
              />
            </div>

            <p className='text-gray-600 mb-2'>{product.description}</p>

            {/* Price Display */}
            <div className='flex justify-center items-center mb-2'>
              <span className='text-lg font-bold text-gray-900'>
                {selectedSize ? selectedSize.price : product.originalPrice}
              </span>
              <span className='text-sm text-gray-500 line-through ml-2'>
                {product.originalPrice}
              </span>
            </div>

            {/* Size Selection */}
            <div className='mb-4'>
              <h4 className='text-lg font-semibold mb-2'>Select Size:</h4>
              <div className='flex flex-wrap justify-center gap-2'>
                {(product.sizes || []).map((size) => (
                  <button
                    key={size.size}
                    onClick={() => handleSizeSelection(size)}
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

            {/* Quantity Adjustment */}
            {selectedSize && (
              <div className='mb-1'>
                <h4 className='text-lg font-semibold mb-0'>Quantity:</h4>
                <div className='flex items-center justify-center gap-3 mt-3 bg-gray-50 p-2 rounded'>
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className='p-1 hover:bg-gray-200 rounded'
                  >
                    <FiMinus size={16} />
                  </button>
                  <span className='px-2 py-1 bg-gray-50'>{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className='p-1 hover:bg-gray-200 rounded'
                  >
                    <FiPlus size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Total Price Display */}
            <div className='text-lg font-bold text-gray-900 mb-4'>
              Total Price: ₹{totalPrice}
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize || quantity === 0}
              className='w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition duration-300'
            >
              <FiShoppingCart className='w-5 h-5' />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <Toast
          message={`${product.title} added to cart successfully!`}
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  );
};

export default ProductDetailModal;
