'use client';
import { useState } from 'react';
import {
  FiPhone,
  FiMessageCircle,
  FiMail,
  FiUser,
  FiSend,
} from 'react-icons/fi';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <section className='py-12 bg-white'>
      {/* Floating Contact Buttons */}
      <div className='fixed bottom-6 right-6 flex flex-col gap-4 z-50'>
        {/* WhatsApp Button */}
        {/* <a
          href='https://wa.me/1234567890' // Replace with your WhatsApp number
          target='_blank'
          rel='noopener noreferrer'
          className='bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition duration-300 flex items-center justify-center'
          aria-label='Contact on WhatsApp'
        >
          <FiMessageCircle className='h-6 w-6' />
        </a> */}

        {/* Call Button */}
        {/* <a
          href='tel:+1234567890' // Replace with your phone number
          className='bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition duration-300 flex items-center justify-center'
          aria-label='Call us'
        >
          <FiPhone className='h-6 w-6' />
        </a> */}
      </div>
    </section>
  );
};

export default ContactSection;
