'use client';
import { useEffect, useState } from 'react';
import { FiCheckCircle, FiX } from 'react-icons/fi';

interface ToastProps {
  message: string;
  type?: 'success' | 'error';
  onClose: () => void;
}

const Toast = ({ message, type = 'success', onClose }: ToastProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300); // Wait for animation to complete before unmounting
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ease-out ${
        visible ? 'top-4 opacity-100' : 'top-[-100px] opacity-0'
      }`}
    >
      <div
        className={`flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg transition-transform ${
          type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white min-w-[250px]`}
      >
        <div className="flex items-center gap-2 flex-1">
          {type === 'success' ? (
            <FiCheckCircle className="w-5 h-5" />
          ) : (
            <FiX className="w-5 h-5" />
          )}
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="p-1 hover:bg-white/20 rounded-full transition-colors"
        >
          <FiX className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
