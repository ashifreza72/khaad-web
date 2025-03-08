'use client';

import { useCart } from '@/context/CartContext';
import { useUI } from '@/context/UIContext';
import Image from 'next/image';
import { FiMinus, FiPlus, FiTrash2, FiX } from 'react-icons/fi';
import { useEffect, useState } from 'react';
// import BillModal from './BillModal';
import { CartItem } from '@/types/cart';
import BillModal from './BillModel';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, addToCart } = useCart();
  const { setIsCartOpen } = useUI();
  const [showBill, setShowBill] = useState(false);

  useEffect(() => {
    setIsCartOpen(isOpen);
  }, [isOpen, setIsCartOpen]);

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => {
        const price = parseFloat(item.price.replace('₹', ''));
        return total + price * item.quantity;
      }, 0)
      .toFixed(2);
  };

  const handleQuantityChange = (item: CartItem, change: number) => {
    if (change > 0) {
      addToCart({ ...item, quantity: 1 });
    } else if (item.quantity > 1) {
      removeFromCart(item.id, item.size);
      addToCart({ ...item, quantity: item.quantity - 1 });
    } else {
      removeFromCart(item.id, item.size);
    }
  };

  const handleCheckout = () => {
    setShowBill(true);
  };

  return (
    <>
      <div
        className={`fixed top-0 right-0 h-full max-w-[70%] w-full sm:w-96 bg-gradient-to-br from-green-50 to-white shadow-lg transition-transform duration-300 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className='p-3 sm:p-4 flex justify-between items-center border-b border-green-200 bg-gradient-to-r from-green-600 to-green-700'>
          <h2 className='text-xl sm:text-2xl font-bold text-white'>
            Your Cart
          </h2>
          <button
            onClick={onClose}
            className='text-red-500 hover:text-red-400 p-2'
            aria-label='Close cart'
          >
            <FiX size={25} />
          </button>
        </div>

        {/* Cart Items */}
        <div className='p-3 sm:p-4 overflow-y-auto flex-grow'>
          {cartItems.length === 0 ? (
            <p className='text-green-600 text-center py-8'>
              Your cart is empty.
            </p>
          ) : (
            <ul className='space-y-3 sm:space-y-4'>
              {cartItems.map((item) => (
                <li
                  key={`${item.id}-${item.size}`}
                  className='flex flex-col p-3 sm:p-4 border border-green-200 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white'
                >
                  <div className='flex items-center gap-3 sm:gap-4'>
                    <div className='relative w-16 h-16 sm:w-20 sm:h-20'>
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className='object-contain rounded-md'
                      />
                    </div>
                    <div className='flex-grow min-w-0'>
                      <h3 className='font-semibold text-green-800 text-sm sm:text-base truncate'>
                        {item.title}
                      </h3>
                      <p className='text-xs sm:text-sm text-green-600'>
                        Size: {item.size}
                      </p>
                      <p className='text-xs sm:text-sm font-medium text-green-700'>
                        ₹
                        {(
                          parseFloat(item.price.replace('₹', '')) *
                          item.quantity
                        ).toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id, item.size)}
                      className='text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded flex-shrink-0'
                      aria-label='Remove item'
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>

                  {/* Quantity Controls */}
                  <div className='flex items-center justify-center gap-3 mt-2 sm:mt-3 bg-green-50 p-2 rounded'>
                    <button
                      onClick={() => handleQuantityChange(item, -1)}
                      className='p-1 hover:bg-green-200 rounded text-green-700'
                      aria-label='Decrease quantity'
                    >
                      <FiMinus size={14} className='sm:h-4 sm:w-4' />
                    </button>
                    <span className='w-6 sm:w-8 text-center font-medium text-green-800'>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(item, 1)}
                      className='p-1 hover:bg-green-200 rounded text-green-700'
                      aria-label='Increase quantity'
                    >
                      <FiPlus size={14} className='sm:h-4 sm:w-4' />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Cart Total */}
        <div className='p-3 sm:p-4 border-t border-green-200 mt-auto bg-green-50'>
          <div className='flex justify-between items-center mb-3'>
            <span className='text-base sm:text-lg font-semibold text-green-800'>
              Total:
            </span>
            <span className='text-lg sm:text-xl font-bold text-green-700'>
              ₹{calculateTotal()}
            </span>
          </div>
          <button
            onClick={handleCheckout}
            className='w-full py-2 px-4 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 rounded-lg font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
            disabled={cartItems.length === 0}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>

      {showBill && (
        <BillModal
          isOpen={showBill}
          onClose={() => setShowBill(false)}
          cartItems={cartItems}
          total={calculateTotal()}
        />
      )}
    </>
  );
};

export default CartSidebar;
