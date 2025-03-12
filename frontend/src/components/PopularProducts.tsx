'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import ProductCard from './ProductCard';
import ProductPreviewModal from './ProductPreviewModal';
import { useCart } from '@/context/CartContext';

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
  featured?: boolean;
}

export default function PopularProducts() {
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          'http://localhost:5000/api/products'
        );

        // Check if response has the expected structure
        if (response.data?.success) {
          // Handle response with success property (standard API format)
          const products = response.data.products || [];
          
          // First try to filter featured products
          let popular = products.filter((p: Product) => p.featured);

          // If no featured products found, just take the first 4 products
          if (popular.length === 0) {
            popular = products.slice(0, 4);
          } else if (popular.length > 4) {
            // If we have more than 4 featured products, limit to 4
            popular = popular.slice(0, 4);
          }

          setPopularProducts(popular);
        } else if (Array.isArray(response.data)) {
          // Handle direct array response
          const products = response.data;
          
          // First try to filter featured products
          let popular = products.filter((p: Product) => p.featured);

          // If no featured products found, just take the first 4 products
          if (popular.length === 0) {
            popular = products.slice(0, 4);
          } else if (popular.length > 4) {
            // If we have more than 4 featured products, limit to 4
            popular = popular.slice(0, 4);
          }

          setPopularProducts(popular);
        } else {
          throw new Error('Unexpected API response format');
        }
      } catch (err) {
        console.error('Error fetching popular products:', err);
        setError('Error loading products');
      } finally {
        setLoading(false);
      }
    };

    fetchPopularProducts();
  }, []);

  // Loading state
  if (loading) {
    return (
      <section className='py-12 bg-gradient-to-b from-white to-green-50 w-full'>
        <div className='container mx-auto px-4 text-center'>
          <p className='text-green-600'>Loading popular products...</p>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className='py-12 bg-gradient-to-b from-white to-green-50 w-full'>
        <div className='container mx-auto px-4 text-center'>
          <p className='text-red-600'>{error}</p>
        </div>
      </section>
    );
  }

  // Fallback for empty products
  if (popularProducts.length === 0) {
    return (
      <section className='py-12 bg-gradient-to-b from-white to-green-50 w-full'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl md:text-4xl font-bold mb-3 text-gray-800'>
              Popular Products
            </h2>
            <div className='w-24 h-1 bg-gradient-to-r from-green-500 to-green-600 mx-auto mb-4'></div>
            <p className='text-gray-600 max-w-2xl mx-auto'>
              Our popular products will be available soon.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className='py-12 bg-gradient-to-b from-white to-green-50'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-bold mb-3 text-gray-800'>
            Popular Products
          </h2>
          <div className='w-24 h-1 bg-gradient-to-r from-green-500 to-green-600 mx-auto mb-4'></div>
          <p className='text-gray-600 max-w-2xl mx-auto'>
            Our best-selling agricultural products that farmers trust for
            consistent results.
          </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8'>
          {popularProducts.map((product) => (
            <div 
              key={product._id} 
              onClick={() => setSelectedProduct(product)}
              className="cursor-pointer"
            >
              <ProductCard key={product._id} product={product} />
            </div>
          ))}
        </div>

        <div className='text-center mt-10'>
          <Link
            href='/products'
            className='inline-flex items-center px-6 py-3 border border-green-600 text-green-600 bg-white hover:bg-green-600 hover:text-white rounded-lg font-medium transition-colors duration-300'
          >
            View All Products
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5 ml-2'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z'
                clipRule='evenodd'
              />
            </svg>
          </Link>
        </div>
        
        {selectedProduct && (
          <ProductPreviewModal
            product={selectedProduct}
            isOpen={!!selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={(item) => {
              addToCart(item);
            }}
          />
        )}
      </div>
    </section>
  );
}
