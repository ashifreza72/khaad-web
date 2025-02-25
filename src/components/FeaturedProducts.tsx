'use client';
import Image from 'next/image';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import { useState } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import ProductDetailModal from './ProductDetailModal';

interface Product {
  id: number;
  title: string;
  price: string;
  originalPrice: string;
  image: string;
  discount: string;
  category: string;
  sizes: { size: string; price: string }[];
}

const products: Product[] = [
  {
    id: 1,
    title: 'NPK Fertilizer',
    price: '₹750',
    originalPrice: '₹999',
    image: 'https://images.tv9hindi.com/wp-content/uploads/2022/10/uriya-3.jpg',
    discount: '25%',
    category: 'Fertilizers',
    sizes: [],
  },
  {
    id: 2,
    title: 'Organic Pesticide',
    price: '₹450',
    originalPrice: '₹599',
    image: 'https://images.tv9hindi.com/wp-content/uploads/2022/10/uriya-3.jpg',
    discount: '20%',
    category: 'Pesticides',
    sizes: [
      { size: '10ml', price: '₹80' },
      { size: '100ml', price: '₹150' },
      { size: '250ml', price: '₹300' },
      { size: '500ml', price: '₹600' },
      { size: '1L', price: '₹750' },
    ],
  },
  {
    id: 3,
    title: 'Premium Seeds Pack',
    price: '₹299',
    originalPrice: '₹399',
    image: 'https://images.tv9hindi.com/wp-content/uploads/2022/10/uriya-3.jpg',
    discount: '25%',
    category: 'Seeds',
    sizes: ['10ml', '100ml', '250ml', '500ml', '1L'],
  },
  {
    id: 4,
    title: 'Urea Fertilizer',
    price: '₹550',
    originalPrice: '₹699',
    image: 'https://images.tv9hindi.com/wp-content/uploads/2022/10/uriya-3.jpg',
    discount: '20%',
    category: 'Fertilizers',
    sizes: ['10ml', '100ml', '250ml', '500ml', '1L'],
  },
];

const FeaturedProducts = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
  });

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <section className='py-5 bg-white'>
      <div className='container mx-auto px-4'>
        <div className='flex justify-between items-center mb-8'>
          <h2 className='text-2xl md:text-3xl font-bold'>Featured Products</h2>
          <Link
            href='/products'
            className='text-blue-500 hover:text-blue-600 font-semibold text-sm md:text-base'
          >
            View All
          </Link>
        </div>

        {/* Mobile Carousel */}
        <div className='md:hidden'>
          <div className='overflow-hidden' ref={emblaRef}>
            <div className='flex'>
              {products.map((product) => (
                <div
                  key={product.id}
                  className='flex-[0_0_80%] min-w-0 pl-4 first:pl-0'
                  onClick={() => openModal(product)}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Grid */}
        <div className='hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6'>
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
    <div className='bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden'>
      <div className='relative'>
        <div className='relative h-48 w-full'>
          <Image
            src={product.image}
            alt={product.title}
            fill
            className='object-cover'
          />
        </div>
        <div className='absolute top-2 left-2'>
          <span className='bg-red-500 text-white text-xs font-bold px-2 py-1 rounded'>
            {product.discount} OFF
          </span>
        </div>
      </div>
      <div className='p-4'>
        <span className='text-sm text-gray-500'>{product.category}</span>
        <h3 className='font-semibold text-lg mt-1'>{product.title}</h3>
        <div className='flex items-center mt-2'>
          <span className='text-lg font-bold text-gray-900'>
            {product.price}
          </span>
          <span className='text-sm text-gray-500 line-through ml-2'>
            {product.originalPrice}
          </span>
        </div>
        <button className='mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition duration-300'>
          <FiShoppingCart className='w-5 h-5' />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default FeaturedProducts;
