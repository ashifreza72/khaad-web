'use client';
import { useEffect } from 'react';
import { FiCheckCircle, FiX } from 'react-icons/fi';

interface ToastProps {
  message: string;
  type?: 'success' | 'error';
  onClose: () => void;
}

const Toast = ({ message, type = 'success', onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className={`flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
      } text-white min-w-[200px]`}>
        <div className="flex items-center gap-2 flex-1">
          {type === 'success' ? (
            <FiCheckCircle className="w-5 h-5" />
          ) : (
            <FiX className="w-5 h-5" />
          )}
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-white/20 rounded-full transition-colors"
        >
          <FiX className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
