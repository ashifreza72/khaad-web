'use client';

import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';

const CartSidebar = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, addToCart } = useCart();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (parseFloat(item.price.replace('₹', '')) * item.quantity);
    }, 0).toFixed(2);
  };

  const handleQuantityChange = (item, change) => {
    if (change > 0) {
      addToCart({ ...item, quantity: 1 });
    } else if (item.quantity > 1) {
      removeFromCart(item.id);
      addToCart({ ...item, quantity: item.quantity - 1 });
    } else {
      removeFromCart(item.id);
    }
  };

  return (
    <div className={`fixed top-0 right-0 h-full max-w-[70%] w-full sm:w-96 bg-white shadow-lg transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {/* Header */}
      <div className="p-4 flex justify-between items-center border-b">
        <h2 className="text-2xl font-bold">Your Cart</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 p-2">
          ✕
        </button>
      </div>

      {/* Cart Items */}
      <div className="p-4 overflow-y-auto h-[calc(100%-150px)]">
        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Your cart is empty.</p>
        ) : (
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li key={`${item.id}-${item.size}`} className="flex flex-col p-4 border rounded-lg shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20">
                    <Image src={item.image} alt={item.title} fill className="object-contain rounded-md" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold text-gray-800">{item.title}</h3>
                    <p className="text-sm text-gray-600">Size: {item.size}</p>
                    <p className="text-sm font-medium text-gray-900">
                      ₹{(parseFloat(item.price.replace('₹', '')) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded">
                    <FiTrash2 size={18} />
                  </button>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center justify-center gap-3 mt-3 bg-gray-50 p-2 rounded">
                  <button onClick={() => handleQuantityChange(item, -1)} className="p-1 hover:bg-gray-200 rounded">
                    <FiMinus size={16} />
                  </button>
                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item, 1)} className="p-1 hover:bg-gray-200 rounded">
                    <FiPlus size={16} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Cart Total */}
      <div className="p-4 border-t">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold">Total:</span>
          <span className="text-lg font-bold">₹{calculateTotal()}</span>
        </div>
        <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartSidebar;
