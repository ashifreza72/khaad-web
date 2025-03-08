'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

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
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          'http://localhost:5000/api/products/popular'
        );

        if (response.data?.success) {
          setPopularProducts(response.data.products);
        } else {
          // Fallback: fetch all products and take the first 4
          const allProductsResponse = await axios.get(
            'http://localhost:5000/api/products'
          );
          if (allProductsResponse.data?.success) {
            // Take the first 4 products as popular products
            const popular = allProductsResponse.data.products.slice(0, 4);
            setPopularProducts(popular);
          } else {
            throw new Error('Failed to fetch products');
          }
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

  const handleAddToCart = (product: Product) => {
    // Get the default size or first available size
    const defaultSize =
      product.sizes && product.sizes.length > 0
        ? product.sizes[0]
        : { size: 'default', price: product.price };

    addToCart({
      id: product._id,
      productId: product._id,
      title: product.title,
      price: defaultSize.price,
      quantity: 1,
      image: product.image.url,
      size: defaultSize.size,
    });
  };

  // ... existing loading and error handling ...

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
              className='bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full'
            >
              {/* Product image section */}
              <div className='relative h-48 sm:h-56 w-full overflow-hidden group'>
                <Image
                  src={product.image?.url || '/placeholder-product.jpg'}
                  alt={product.title}
                  fill
                  className='object-cover group-hover:scale-110 transition-transform duration-500'
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
                />
                {product.discount && product.discount !== '0%' && (
                  <div className='absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg'>
                    {product.discount} OFF
                  </div>
                )}
                <div className='absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
                  <Link
                    href={`/products#${product._id}`}
                    className='bg-white text-green-600 hover:bg-green-600 hover:text-white transition-colors duration-300 rounded-full p-3'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-6 w-6'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                      />
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                      />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Product details section */}
              <div className='p-5 flex-grow flex flex-col'>
                <h3 className='text-lg font-bold mb-2 text-gray-800 line-clamp-1'>
                  {product.title}
                </h3>
                <p className='text-gray-600 text-sm mb-4 line-clamp-2 flex-grow'>
                  {product.description}
                </p>

                <div className='flex items-center justify-between mb-4'>
                  <div className='flex flex-col'>
                    <span className='text-xl font-bold text-green-600'>
                      ₹{product.price}
                    </span>
                    {product.originalPrice !== product.price && (
                      <span className='text-sm text-gray-500 line-through'>
                        ₹{product.originalPrice}
                      </span>
                    )}
                  </div>
                  {product.stock > 0 ? (
                    <span className='px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full'>
                      In Stock
                    </span>
                  ) : (
                    <span className='px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full'>
                      Out of Stock
                    </span>
                  )}
                </div>

                <button
                  onClick={() => handleAddToCart(product)}
                  className='w-full py-2 px-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
                  disabled={product.stock <= 0}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path d='M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z' />
                  </svg>
                  {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
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
      </div>
    </section>
  );
}
