'use client';

import Cart from '@/components/Cart';
import { useState } from 'react';

const CartPage = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-6'>Shopping Cart</h1>
      <Cart isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default CartPage;
