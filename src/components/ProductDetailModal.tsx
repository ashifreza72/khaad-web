'use client';
import { useEffect, useState } from 'react';
import { FiX, FiShoppingCart } from 'react-icons/fi';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
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
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
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
      addToCart(itemToAdd);
      setShowToast(true);
      onClose();
    }
  };

  const handleQuantityChange = (size: string, change: number) => {
    setQuantities((prev) => ({
      ...prev,
      [size]: Math.max((prev[size] || 0) + change, 0),
    }));
  };

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
    <>
      <div className='fixed inset-0 z-50 flex items-center justify-center px-4'>
        {/* Backdrop */}
        <div
          className='absolute inset-0 bg-black/50 backdrop-blur-sm'
          onClick={onClose}
        />

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
          <div className='p-2'>
            <div className='text-center'>
              <h3 className='text-2xl font-bold text-gray-900 mb-2'>
                {product.title}
              </h3>
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
              <div className='flex justify-center items-center mb-2'>
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
                  <h4 className='text-lg font-semibold mb-2'>Select Size:</h4>
                  <div className='flex flex-wrap justify-center gap-2'>
                    {(product.sizes || []).map((size) => (
                      <button
                        key={size.size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-0 px-2 border rounded-lg transition duration-300 ${
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
                <div className='mb-1'>
                  <h4 className='text-lg font-semibold mb-0'>Quantity:</h4>
                  <div className='flex items-center justify-center'>
                    <button
                      onClick={() => handleQuantityChange(selectedSize.size, -1)}
                      className='bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-l-lg'
                    >
                      -
                    </button>
                    <span className='px-2 py-1 bg-gray-50'>
                      {quantities[selectedSize.size] || 0}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(selectedSize.size, 1)}
                      className='bg-gray-100 hover:bg-gray-200 px-4 py-1 rounded-r-lg'
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {/* Total Price Display */}
              <div className='text-lg font-bold text-gray-900 mb-4'>
                Total Price: ₹{totalPrice}
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!selectedSize || quantities[selectedSize.size] === 0}
                className='w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition duration-300'
              >
                <FiShoppingCart className='w-5 h-5' />
                <span>Add to Cart</span>
              </button>
            </div>
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
