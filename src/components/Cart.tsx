'use client';

import { useCart } from '@/context/CartContext';
import Image from 'next/image';

const CartSidebar = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart } = useCart();

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-end transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className='bg-white w-80 h-full shadow-lg p-4 overflow-y-auto'>
        <button onClick={onClose} className='text-gray-500 hover:text-gray-700'>
          Close
        </button>
        <h2 className='text-2xl font-bold mb-4'>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p className='text-gray-500'>Your cart is empty.</p>
        ) : (
          <ul className='space-y-4'>
            {cartItems.map((item) => (
              <li
                key={`${item.id}-${item.size}`}
                className='flex items-center p-2 border-b'
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={50}
                  height={50}
                  className='rounded mr-2'
                />
                <div className='flex-grow'>
                  <h3 className='font-semibold'>{item.title}</h3>
                  <p>Size: {item.size}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>
                    Price: ₹
                    {(
                      parseFloat(item.price.replace('₹', '')) * item.quantity
                    ).toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className='text-red-500 hover:text-red-700'
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;
