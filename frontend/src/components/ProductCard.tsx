'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

interface ProductImage {
  public_id: number;
  url: string;
}

interface Product {
  _id: number;
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

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
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
      image: product.image?.url || '/placeholder-product.jpg',
      size: defaultSize.size,
    });
  };

  return (
    <div className='bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full'>
      {/* Product image section */}
      <div className='relative h-48 sm:h-56 w-full overflow-hidden group'>
        <div className='p-4 w-full h-full flex items-center justify-center bg-gray-100'>
          <Image
            src={product.image?.url || '/placeholder-product.jpg'}
            alt={product.title}
            fill
            className='object-contain group-hover:scale-110 transition-transform duration-500'
          />
        </div>

        {product.discount && product.discount !== '0%' && (
          <div className='absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg'>
            {product.discount} OFF
          </div>
        )}
        <div className='absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
          <Link
            href={`/products/${product._id}`}
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
          onClick={handleAddToCart}
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
  );
};

export default ProductCard;
