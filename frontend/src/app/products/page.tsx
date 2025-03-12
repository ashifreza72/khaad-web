'use client';

import { useState, useEffect } from 'react';
import ProductPreviewModal from '@/components/ProductPreviewModal';
import { CartItem } from '@/types/cart';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import api from '@/utils/api'; // Import our API utility
import ProductCard from '@/components/ProductCard';

interface ProductImage {
  public_id: string;
  url: string;
}

interface Product {
  _id: string;
  title: string;
  price: string;
  originalPrice: string;
  description: string;
  discount: string;
  category: string;
  sizes: Array<{ size: string; price: string }>;
  stock: number;
  image: ProductImage;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Use our API utility instead of axios directly
        const response = await api.get('/products');
        if (response.data?.success) {
          setProducts(response.data.products);
        } else {
          throw new Error('Failed to fetch products');
        }
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (item: CartItem) => {
    try {
      addToCart(item);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen flex items-center justify-center text-red-500'>
        {error}
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-white'>
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-4xl md:text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600'>
          Our Products
        </h1>

        {/* Category Filter - Optional */}
        <div className='flex flex-wrap gap-2 mb-6 justify-center'>
          <button className='px-4 py-2 rounded-full bg-green-100 text-green-700 hover:bg-green-200 transition-colors'>
            All
          </button>
          <button className='px-4 py-2 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors'>
            Fertilizers
          </button>
          <button className='px-4 py-2 rounded-full bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors'>
            Seeds
          </button>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8'>
          {products.map((product) => (
            <div 
              key={product._id} 
              onClick={() => setSelectedProduct(product)}
              className="cursor-pointer"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className='text-center py-16'>
            <div className='text-gray-400 text-6xl mb-4'>🌱</div>
            <p className='text-xl text-gray-600'>
              No products available at the moment.
            </p>
          </div>
        )}

        {selectedProduct && (
          <ProductPreviewModal
            product={selectedProduct}
            isOpen={true}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={handleAddToCart}
          />
        )}
      </div>
    </div>
  );
}
