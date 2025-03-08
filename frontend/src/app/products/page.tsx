'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ProductPreviewModal from '@/components/ProductPreviewModal';
import { CartItem } from '@/types/cart';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import api from '@/utils/api'; // Import our API utility

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
              className='group bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden transition-all duration-300 hover:scale-102 cursor-pointer'
              onClick={() => setSelectedProduct(product)}
            >
              {/* Product card content */}
              <div className='relative h-56 w-full overflow-hidden'>
                <Image
                  src={product.image?.url || '/placeholder-product.jpg'}
                  alt={product.title}
                  fill
                  className='object-cover group-hover:scale-110 transition-transform duration-300'
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                  priority={false}
                />
                {product.discount && product.discount !== '0%' && (
                  <div className='absolute top-3 right-3 bg-red-500 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg transform -rotate-12'>
                    {product.discount} OFF
                  </div>
                )}
              </div>

              <div className='p-5'>
                <h3 className='text-xl font-bold mb-2 line-clamp-1 text-gray-800'>
                  {product.title}
                </h3>
                <p className='text-gray-600 text-sm mb-3 line-clamp-2'>
                  {product.description}
                </p>

                <div className='flex items-center justify-between mb-4'>
                  <div className='flex flex-col'>
                    <span className='text-2xl font-bold text-green-600'>
                      ₹{product.price}
                    </span>
                    {product.originalPrice !== product.price && (
                      <span className='text-sm text-gray-500 line-through'>
                        ₹{product.originalPrice}
                      </span>
                    )}
                  </div>
                  {product.stock > 0 ? (
                    <span className='px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full'>
                      In Stock
                    </span>
                  ) : (
                    <span className='px-3 py-1 bg-red-100 text-red-700 text-sm font-medium rounded-full'>
                      Out of Stock
                    </span>
                  )}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart({
                      productId: product._id,
                      title: product.title,
                      price: product.price,
                      quantity: 1,
                      image: product.image.url,
                      size: product.sizes[0]?.size || 'default',
                    });
                  }}
                  className='w-full py-3 px-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none'
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
