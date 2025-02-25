'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FiShoppingCart, FiStar } from 'react-icons/fi';
import ProductDetailModal from './ProductDetailModal';

interface Product {
  id: number;
  title: string;
  price: string;
  originalPrice: string;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  tag?: string;
  sizes: { size: string; price: string }[];
}

const products: Product[] = [
  {
    id: 1,
    title: 'DAP Fertilizer',
    price: '₹1200',
    originalPrice: '₹1499',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449',
    rating: 4.8,
    reviews: 245,
    category: 'Fertilizers',
    tag: 'Best Seller',
    sizes: [],
  },
  {
    id: 2,
    title: 'Bio Pesticide',
    price: '₹550',
    originalPrice: '₹699',
    image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9',
    rating: 4.6,
    reviews: 189,
    category: 'Pesticides',
    tag: 'Organic',
    sizes: [
      { size: '10ml', price: '₹100' },
      { size: '100ml', price: '₹200' },
      { size: '250ml', price: '₹400' },
      { size: '500ml', price: '₹600' },
      { size: '1L', price: '₹1200' },
    ],
  },
  {
    id: 3,
    title: 'Hybrid Wheat Seeds',
    price: '₹399',
    originalPrice: '₹499',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d',
    rating: 4.9,
    reviews: 321,
    category: 'Seeds',
    tag: 'Top Rated',
    sizes: [],
  },
];

const PopularProducts = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <section className='py-10 bg-gray-50'>
      <div className='container mx-auto px-4'>
        <div className='flex justify-between items-center mb-8'>
          <div>
            <h2 className='text-2xl md:text-3xl font-bold'>Popular Products</h2>
            <p className='text-gray-600 mt-1'>Most loved by our customers</p>
          </div>
          <Link
            href='/products'
            className='text-blue-500 hover:text-blue-600 font-semibold text-sm md:text-base'
          >
            View All
          </Link>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {products.map((product) => (
            <div key={product.id} onClick={() => openModal(product)}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </section>
  );
};

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className='bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group'>
      <div className='flex md:flex-row flex-col h-full'>
        {/* Image Section */}
        <div className='relative md:w-2/5 h-48 md:h-auto'>
          <Image
            src={product.image}
            alt={product.title}
            fill
            className='object-cover group-hover:scale-105 transition-transform duration-300'
          />
          {product.tag && (
            <span className='absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded'>
              {product.tag}
            </span>
          )}
        </div>

        {/* Content Section */}
        <div className='p-4 md:w-3/5 flex flex-col justify-between'>
          <div>
            <span className='text-sm text-gray-500'>{product.category}</span>
            <h3 className='font-semibold text-lg mt-1'>{product.title}</h3>

            {/* Rating */}
            <div className='flex items-center mt-2'>
              <div className='flex items-center text-yellow-400'>
                <FiStar className='w-4 h-4 fill-current' />
                <span className='ml-1 text-sm font-medium'>
                  {product.rating}
                </span>
              </div>
              <span className='text-xs text-gray-500 ml-2'>
                ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className='flex items-center mt-2'>
              <span className='text-lg font-bold text-gray-900'>
                {product.price}
              </span>
              <span className='text-sm text-gray-500 line-through ml-2'>
                {product.originalPrice}
              </span>
            </div>
          </div>

          {/* Button */}
          <button className='mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition duration-300'>
            <FiShoppingCart className='w-5 h-5' />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopularProducts;
