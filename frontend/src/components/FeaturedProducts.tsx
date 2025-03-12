'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import ProductPreviewModal from './ProductPreviewModal';

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

export default function FeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/products');
        if (response.data?.success) {
          // Show all products instead of just featured ones
          setFeaturedProducts(response.data.products);
        } else {
          setError('Failed to fetch products');
        }
      } catch (err) {
        setError('Error loading products');
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart({
      productId: product._id,
      title: product.title,
      price: product.price,
      quantity: 1,
      image: product.image.url,
      size: product.sizes[0]?.size || 'default',
    });
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center h-32'>
        <div className='animate-spin h-12 w-12 border-t-2 border-b-2 border-green-500'></div>
      </div>
    );
  }

  if (error) {
    return <div className='text-center text-red-500 py-16'>{error}</div>;
  }

  return (
    <section className='py-12 bg-gradient-to-b from-white to-green-50'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-800'>
            Featured Products
          </h2>
          <div className='w-24 h-1 bg-green-500 mx-auto my-3'></div>
          <p className='text-gray-600 max-w-2xl mx-auto'>
            Discover our handpicked selection of premium products.
          </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {featuredProducts.map((product) => (
            <div
              key={product._id}
              className='bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-4 flex flex-col cursor-pointer'
              onClick={() => setSelectedProduct(product)}
            >
              <div className='w-full h-48 relative'>
                <Image
                  src={product.image?.url || '/placeholder.jpg'}
                  alt={product.title}
                  fill
                  className='object-contain'
                />
              </div>
              <h3 className='text-lg font-bold mt-4 text-gray-800'>
                {product.title}
              </h3>
              <p className='text-sm text-gray-600 line-clamp-2 flex-grow'>
                {product.description}
              </p>
              <div className='flex justify-between items-center mt-4'>
                <div>
                  <span className='text-xl font-bold text-green-600'>
                    ₹{product.price}
                  </span>
                  {product.originalPrice !== product.price && (
                    <span className='text-sm text-gray-500 line-through ml-2'>
                      ₹{product.originalPrice}
                    </span>
                  )}
                </div>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    product.stock > 0
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product);
                }}
                className='mt-4 w-full py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all disabled:opacity-50'
                disabled={product.stock <= 0}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        <div className='text-center mt-10'>
          <Link
            href='/products'
            className='inline-flex items-center px-6 py-3 border border-green-600 text-green-600 hover:bg-green-600 hover:text-white rounded-lg transition-colors'
          >
            View All Products
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
