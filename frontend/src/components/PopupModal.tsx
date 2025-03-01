'use client';
import { useState, useEffect } from 'react';
import { FiX, FiPhone, FiMessageCircle } from 'react-icons/fi';
import { useUI } from '@/context/UIContext';

const PopupModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isCartOpen } = useUI();

  useEffect(() => {
    // Initial delay before first popup
    const initialTimer = setTimeout(() => {
      setIsOpen(true);
    }, 100000); // Show first time after 10 seconds

    // Set up interval for recurring popups
    const intervalTimer = setInterval(() => {
      setIsOpen(true);
    }, 100000); // Show every 10 seconds

    // Cleanup function
    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalTimer);
    };
  }, []); // Empty dependency array means this runs once on mount

  if (!isOpen || isCartOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center px-4'>
      {/* Backdrop */}
      <div
        className='absolute inset-0 bg-black/50 backdrop-blur-sm'
        onClick={() => setIsOpen(false)}
      />

      {/* Modal */}
      <div className='relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 animate-scale-up'>
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className='absolute right-4 top-4 text-gray-400 hover:text-gray-600'
        >
          <FiX className='w-5 h-5' />
        </button>

        {/* Content */}
        <div className='text-center mb-6'>
          <h3 className='text-2xl font-bold text-gray-900 mb-2'>
            Need Assistance?
          </h3>
          <p className='text-gray-600'>
            Connect with our experts for personalized farming solutions
          </p>
        </div>

        {/* Contact Buttons */}
        <div className='space-y-4'>
          <a
            href='https://wa.me/1234567890'
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center justify-center gap-3 w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-xl transition-colors'
          >
            <FiMessageCircle className='w-5 h-5' />
            <span>Chat on WhatsApp</span>
          </a>
          <a
            href='tel:+1234567890'
            className='flex items-center justify-center gap-3 w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-xl transition-colors'
          >
            <FiPhone className='w-5 h-5' />
            <span>Call Us Now</span>
          </a>
        </div>

        {/* Additional Text */}
        <p className='text-sm text-gray-500 text-center mt-6'>
          Available 24/7 for your farming needs
        </p>
      </div>
    </div>
  );
};

export default PopupModal;
