'use client';
import { useState } from 'react';
 
import Link from 'next/link';
import { FiSearch, FiShoppingCart, FiMessageCircle, FiX } from 'react-icons/fi';
import { useCart } from '@/context/CartContext';
import Cart from './Cart';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems } = useCart();

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => {
        document.getElementById('search-input')?.focus();
      }, 100);
    }
  };

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  return (
    <nav className='bg-gradient-to-r from-green-600 to-green-500 shadow-lg fixed w-full top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <div className='flex-shrink-0'>
            <Link href='/' className='flex items-center'>
              <span className='ml-2 text-xl font-bold text-yellow-300'>
                Khaad Bhandar
              </span>
            </Link>
          </div>

          {/* Desktop Search Bar */}
          <div className='hidden md:block flex-1 max-w-md mx-4 lg:max-w-2xl'>
            <div className='relative'>
              <input
                type='text'
                placeholder='Search products...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='w-full px-6 py-2 text-sm md:text-base lg:text-lg rounded-full border border-gray-300 focus:outline-none focus:border-blue-500'
              />
              <FiSearch className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 w-5 h-5 lg:w-6 lg:h-6' />
            </div>
          </div>

          {/* Right Section */}
          <div className='flex items-center space-x-6'>
            {/* Mobile Search Icon */}
            <button
              className='md:hidden text-yellow-300 hover:text-white transition duration-300'
              onClick={toggleSearch}
            >
              <FiSearch className='w-6 h-6' />
            </button>

            {/* Cart Icon */}
            <button onClick={toggleCart} className='relative text-yellow-300 hover:text-white transition duration-300'>
              <FiShoppingCart className='w-6 h-6' />
              {cartItems.length > 0 && (
                <span className='absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1'>
                  {cartItems.length}
                </span>
              )}
            </button>

            {/* WhatsApp Icon */}
            <a
              href='https://wa.me/1234567890'
              target='_blank'
              rel='noopener noreferrer'
              className='text-yellow-300 hover:text-green-200 transition duration-300'
            >
              <FiMessageCircle className='w-6 h-6' />
            </a>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isSearchOpen ? 'max-h-16 opacity-100 mb-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className='relative'>
            <input
              id='search-input'
              type='text'
              placeholder='Search...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full px-6 py-2 text-base rounded-full border border-gray-300 focus:outline-none focus:border-blue-500'
            />
            <button
              onClick={toggleSearch}
              className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400'
            >
              <FiX className='w-5 h-5' />
            </button>
          </div>
        </div>
      </div>

      {/* Cart Component */}
      <Cart isOpen={isCartOpen} onClose={toggleCart} />
    </nav>
  );
};

export default Navbar;
