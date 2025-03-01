'use client';
import React from 'react';

interface SuccessDialogProps {
  message: string;
  onClose: () => void;
}

const SuccessDialog: React.FC<SuccessDialogProps> = ({ message, onClose }) => {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center px-4'>
      <div
        className='absolute inset-0 bg-black/50 backdrop-blur-sm'
        onClick={onClose}
      />
      <div className='relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6'>
        <h3 className='text-lg font-bold text-gray-900 mb-4'>{message}</h3>
        <button
          onClick={onClose}
          className='w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg'
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessDialog;
