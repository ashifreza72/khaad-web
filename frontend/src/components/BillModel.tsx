'use client';

import { FiX } from 'react-icons/fi';
import { useState } from 'react';

interface CartItem {
  id: number;
  title: string;
  size: string;
  quantity: number;
  price: string;
}

interface BillModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  total: string;
}

const BillModal = ({ isOpen, onClose, cartItems, total }: BillModalProps) => {
  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const [showForm, setShowForm] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    pincode: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePrint = () => {
    setShowForm(false);
  };

  const handleOrderNow = () => {
    const whatsappNumber = '91XXXXXXXXXX'; // Replace with your WhatsApp number (without +)
    const message = encodeURIComponent(
      `Order Details:
      Name: ${formData.name}
      Address: ${formData.address}
      Phone: ${formData.phone}
      Pincode: ${formData.pincode}
      --------------------------
      Items Ordered:\n` +
        cartItems
          .map(
            (item, index) =>
              `${index + 1}. ${item.title} - ${item.size} x ${
                item.quantity
              } = ₹${(
                parseFloat(item.price.replace('₹', '')) * item.quantity
              ).toFixed(2)}`
          )
          .join('\n') +
        `\n--------------------------
      Grand Total: ₹${total}`
    );

    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(whatsappURL, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-2 sm:px-0'>
      <div className='bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 my-auto max-h-[90vh] flex flex-col overflow-hidden'>
        <div className='relative p-4 border rounded-lg shadow-md bg-gradient-to-r from-green-600 to-green-700 text-white'>
          <button
            onClick={onClose}
            className='absolute top-2 right-2 text-red-500 hover:text-red-400'
          >
            <FiX size={25} />
          </button>
          <h2 className='font-bold text-lg'>Cash/Credit Memo</h2>
          <p className='text-sm text-yellow-100'>Invoice No.: 409</p>
          <p className='text-sm text-yellow-100'>Dated: {currentDate}</p>
        </div>

        <div className='p-3 sm:p-6 overflow-y-auto flex-grow bg-gradient-to-b from-green-50 to-white'>
          <div className='overflow-x-auto'>
            <table className='w-full text-sm'>
              <thead>
                <tr className='border-b border-green-200'>
                  <th className='text-left py-2 text-green-800'>S.N.</th>
                  <th className='text-left py-2 text-green-800'>Item Name</th>
                  <th className='text-left py-2 text-green-800'>Size</th>
                  <th className='text-left py-2 text-green-800'>Qty.</th>
                  <th className='text-right py-2 text-green-800'>Price</th>
                  <th className='text-right py-2 text-green-800'>Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr
                    key={item.id}
                    className='border-b border-green-100 hover:bg-green-50'
                  >
                    <td className='py-2'>{index + 1}.</td>
                    <td className='py-2 font-medium text-green-900'>
                      {item.title}
                    </td>
                    <td className='py-2'>{item.size}</td>
                    <td className='py-2'>{item.quantity}</td>
                    <td className='text-right py-2'>
                      ₹{item.price.replace('₹', '')}
                    </td>
                    <td className='text-right py-2 font-medium text-green-800'>
                      ₹
                      {(
                        parseFloat(item.price.replace('₹', '')) * item.quantity
                      ).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='mt-4 sm:mt-6 flex justify-end border-t border-green-200 pt-3'>
            <p className='font-bold text-base sm:text-lg text-green-800'>
              Grand Total ₹{total}
            </p>
          </div>
          <div className='mt-4 text-xs text-gray-600'>
            <p>
              <strong>Customer Details:</strong>
            </p>
            <p>Name: {formData.name || 'N/A'}</p>
            <p>Address: {formData.address || 'N/A'}</p>
            <p>Phone: {formData.phone || 'N/A'}</p>
            <p>Pincode: {formData.pincode || 'N/A'}</p>
            <p>
              <strong>Terms & Conditions:</strong>
            </p>
            <p>1. No Refund Policy</p>
            <p>2. Goods once sold cannot be returned</p>
          </div>
        </div>

        <div className='p-3 sm:p-6 border-t border-green-100 flex-shrink-0 bg-green-50'>
          {showForm ? (
            <div className='p-4 border border-green-200 rounded-lg bg-white'>
              <h3 className='font-bold text-lg mb-2 text-green-800'>
                Enter Your Details
              </h3>
              <input
                type='text'
                name='name'
                placeholder='Name'
                value={formData.name}
                onChange={handleChange}
                className='w-full p-2 border border-green-200 rounded mb-2'
              />
              <input
                type='text'
                name='address'
                placeholder='Address'
                value={formData.address}
                onChange={handleChange}
                className='w-full p-2 border border-green-200 rounded mb-2'
              />
              <input
                type='text'
                name='phone'
                placeholder='Phone No.'
                value={formData.phone}
                onChange={handleChange}
                className='w-full p-2 border border-green-200 rounded mb-2'
              />
              <input
                type='text'
                name='pincode'
                placeholder='Pincode'
                value={formData.pincode}
                onChange={handleChange}
                className='w-full p-2 border border-green-200 rounded mb-2'
              />
              <button
                onClick={handlePrint}
                className='w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200'
              >
                Submit
              </button>
            </div>
          ) : (
            <button
              onClick={handleOrderNow}
              className='w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200'
            >
              Order Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BillModal;
