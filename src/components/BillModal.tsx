'use client';

import { useCart } from '@/context/CartContext';
import { FiX } from 'react-icons/fi';
import { useEffect, useState } from 'react';

interface BillModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BillModal = ({ isOpen, onClose }: BillModalProps) => {
  const { cartItems } = useCart();
  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    pincode: ''
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (parseFloat(item.price.replace('₹', '')) * item.quantity);
    }, 0).toFixed(2);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const { name, address, phone, pincode } = formData;
    const message = `Bill Details:\nName: ${name}\nAddress: ${address}\nPhone: ${phone}\nPincode: ${pincode}\nGrand Total: ₹${calculateTotal()}`;
    const whatsappUrl = `https://wa.me/91${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-2 sm:px-0">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 my-auto max-h-[90vh] flex flex-col overflow-hidden">
        <div className="relative p-4 border rounded-lg shadow-md bg-gradient-to-r from-green-600 to-green-700 text-white">
          <button onClick={onClose} className="absolute top-2 right-2 text-white hover:text-yellow-200">
            <FiX size={20} />
          </button>
          <h2 className="font-bold text-lg">Cash/Credit Memo</h2>
          <p className="text-sm text-yellow-100">Invoice No.: 409</p>
          <p className="text-sm text-yellow-100">Dated: {currentDate}</p>
          <p className="text-sm mt-2 text-yellow-100">Billed to: Cash</p>
        </div>

        <div className="p-3 sm:p-6 overflow-y-auto flex-grow bg-gradient-to-b from-green-50 to-white">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-green-200">
                  <th className="text-left py-2 text-green-800">S.N.</th>
                  <th className="text-left py-2 text-green-800">Item Name</th>
                  <th className="text-left py-2 text-green-800">Qty.</th>
                  <th className="text-right py-2 text-green-800">Price</th>
                  <th className="text-right py-2 text-green-800">Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={item.id} className="border-b border-green-100 hover:bg-green-50">
                    <td className="py-2">{index + 1}.</td>
                    <td className="py-2 font-medium text-green-900">{item.title}</td>
                    <td className="py-2">{item.quantity}</td>
                    <td className="text-right py-2">₹{item.price.replace('₹', '')}</td>
                    <td className="text-right py-2 font-medium text-green-800">₹{(parseFloat(item.price.replace('₹', '')) * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 sm:mt-6 flex justify-end border-t border-green-200 pt-3">
            <p className="font-bold text-base sm:text-lg text-green-800">Grand Total ₹{calculateTotal()}</p>
          </div>
        </div>

        <div className="p-3 sm:p-6 border-t border-green-100 flex-shrink-0 bg-green-50">
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200"
            >
              Print Bill
            </button>
          ) : (
            <div className="p-4 border border-green-200 rounded-lg bg-white">
              <h3 className="font-bold text-lg mb-2 text-green-800">Enter Your Details</h3>
              <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} 
                className="w-full p-2 border border-green-200 rounded mb-2 focus:ring-2 focus:ring-green-500 focus:border-transparent" />
              <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} 
                className="w-full p-2 border border-green-200 rounded mb-2 focus:ring-2 focus:ring-green-500 focus:border-transparent" />
              <input type="text" name="phone" placeholder="Phone No." value={formData.phone} onChange={handleChange} 
                className="w-full p-2 border border-green-200 rounded mb-2 focus:ring-2 focus:ring-green-500 focus:border-transparent" />
              <input type="text" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} 
                className="w-full p-2 border border-green-200 rounded mb-2 focus:ring-2 focus:ring-green-500 focus:border-transparent" />
              <button onClick={handleSubmit} 
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200">
                Send to WhatsApp
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BillModal;