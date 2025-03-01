'use client';

import Link from 'next/link';
import { FiPhone, FiMessageCircle, FiMail, FiMapPin } from 'react-icons/fi';
import { useUI } from '@/context/UIContext';

const Footer = () => {
  const { isCartOpen } = useUI();

  return (
    <footer className='bg-gray-900 text-gray-300'>
      <div className='container mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {/* Company Info */}
          <div>
            <h3 className='text-white text-lg font-bold mb-4'>Khaad Bhandar</h3>
            <p className='text-gray-400 mb-4'>
              Your trusted partner for agricultural supplies and farming
              solutions.
            </p>
            <div className='space-y-2'>
              <a
                href='tel:+1234567890'
                className='flex items-center gap-2 hover:text-white transition-colors'
              >
                <FiPhone className='h-5 w-5' />
                <span>+91 1234567890</span>
              </a>
              <a
                href='mailto:info@khaadbhandar.com'
                className='flex items-center gap-2 hover:text-white transition-colors'
              >
                <FiMail className='h-5 w-5' />
                <span>info@khaadbhandar.com</span>
              </a>
              <div className='flex items-center gap-2'>
                <FiMapPin className='h-5 w-5 flex-shrink-0' />
                <span>123, Main Street, City Name, State - 123456</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className='text-white text-lg font-bold mb-4'>Quick Links</h3>
            <ul className='space-y-2'>
              <li>
                <Link
                  href='/products'
                  className='hover:text-white transition-colors'
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href='/about'
                  className='hover:text-white transition-colors'
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href='/blog'
                  className='hover:text-white transition-colors'
                >
                  Farming Tips
                </Link>
              </li>
              <li>
                <Link
                  href='/contact'
                  className='hover:text-white transition-colors'
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className='text-white text-lg font-bold mb-4'>Products</h3>
            <ul className='space-y-2'>
              <li>
                <Link
                  href='/products/fertilizers'
                  className='hover:text-white transition-colors'
                >
                  Fertilizers
                </Link>
              </li>
              <li>
                <Link
                  href='/products/pesticides'
                  className='hover:text-white transition-colors'
                >
                  Pesticides
                </Link>
              </li>
              <li>
                <Link
                  href='/products/seeds'
                  className='hover:text-white transition-colors'
                >
                  Seeds
                </Link>
              </li>
              <li>
                <Link
                  href='/products/tools'
                  className='hover:text-white transition-colors'
                >
                  Farming Tools
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Buttons */}
          <div>
            <h3 className='text-white text-lg font-bold mb-4'>
              Connect With Us
            </h3>
            <div className='flex flex-col gap-4'>
              {!isCartOpen && (
                <a
                  href='https://wa.me/1234567890'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg flex items-center gap-2 transition-colors'
                >
                  <FiMessageCircle className='h-5 w-5' />
                  <span>Chat on WhatsApp</span>
                </a>
              )}
              <a
                href='tel:+1234567890'
                className='bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center gap-2 transition-colors'
              >
                <FiPhone className='h-5 w-5' />
                <span>Call Us</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='mt-12 pt-8 border-t border-gray-800 text-center text-sm'>
          <p>
            {new Date().getFullYear()} Khaad Bhandar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
