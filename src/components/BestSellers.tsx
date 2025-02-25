'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
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
  orderCount: number; 
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
    orderCount: 1250, 
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
    orderCount: 850,
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
    orderCount: 980,
  },
];

const BestSellers = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bestSellers, setBestSellers] = useState<Product[]>([]);

  useEffect(() => {
    const sortedProducts = [...products].sort((a, b) => b.orderCount - a.orderCount);
    setBestSellers(sortedProducts.slice(0, 3));
  }, []);

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <section className='py-6 bg-gray-50'>
      <div className='container mx-auto px-4'>
        <div className='flex justify-between items-center mb-8'>
          <div>
            <h2 className='text-2xl md:text-3xl font-bold'>Best Sellers</h2>
            <p className='text-gray-600 mt-1'>Most ordered by our customers</p>
          </div>
          <Link
            href='/products'
            className='text-blue-500 hover:text-blue-600 font-semibold text-sm md:text-base'
          >
            View All
          </Link>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {bestSellers.map((product) => (
            <div key={product.id} onClick={() => openModal(product)}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </section>
  );
};

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-duration-300 cursor-pointer'>
      <div className='relative'>
        <div className='relative h-64 w-full'>
          <Image
            src={product.image}
            alt={product.title}
            fill
            className='object-cover'
          />
        </div>
        {product.tag && (
          <span className='absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded text-sm'>
            {product.tag}
          </span>
        )}
        <span className='absolute bottom-2 right-2 bg-white/90 text-primary px-2 py-1 rounded text-sm font-medium'>
          {product.orderCount.toLocaleString()} Orders
        </span>
      </div>
      <div className='p-4'>
        <h3 className='font-semibold text-lg mb-1'>{product.title}</h3>
        <div className='flex items-center gap-2 mb-2'>
          <div className='flex items-center gap-1'>
            <FiStar className='text-yellow-400 fill-current' />
            <span className='text-sm font-medium'>{product.rating}</span>
          </div>
          <span className='text-sm text-gray-500'>({product.reviews} reviews)</span>
        </div>
        <div className='flex items-center justify-between'>
          <div>
            <span className='text-lg font-bold text-primary'>{product.price}</span>
            <span className='text-sm text-gray-500 line-through ml-2'>
              {product.originalPrice}
            </span>
          </div>
          <button className='p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors'>
            <FiShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BestSellers;
