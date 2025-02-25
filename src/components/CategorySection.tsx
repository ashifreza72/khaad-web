"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

const promotions = [
  {
    id: 1,
    title: 'Level up your farming with',
    highlight: 'PREMIUM FERTILIZERS',
    discount: 'Up to 50% off',
    description: 'High-quality fertilizers for better yield',
    image: '/fertilizers-promo.jpg',
    link: '/products/fertilizers',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-600',
  },
  {
    id: 2,
    title: 'Pay via MobiKwik & Get',
    highlight: '₹500 CASHBACK',
    description: 'Use code: MBK500',
    image: '/mobikwik-promo.jpg',
    link: '/payment/mobikwik',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-600',
  },
  {
    id: 3,
    title: 'Special Offer on',
    highlight: 'ORGANIC PESTICIDES',
    discount: '30% off',
    description: 'Effective & eco-friendly solutions',
    image: '/pesticides-promo.jpg',
    link: '/products/pesticides',
    bgColor: 'bg-green-50',
    textColor: 'text-green-600',
  },
];

const categories = [
  {
    id: 1,
    title: 'Khaad (Fertilizers)',
    description: 'High-quality fertilizers for better yield',
    image: 'https://images.tv9hindi.com/wp-content/uploads/2022/10/uriya-3.jpg',
    link: '/products/fertilizers',
  },
  {
    id: 2,
    title: 'Pesticides (Keetnashak)',
    description: 'Effective pest control solutions',
    image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9',
    link: '/products/pesticides',
  },
  {
    id: 3,
    title: 'Beej (Seeds)',
    description: 'Premium quality seeds for better farming',
    image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9',
    link: '/products/seeds',
  },
];

const CategorySection = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-8 px-4 md:px-8">
      {/* Navigation Buttons */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-lg hover:bg-gray-50"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-lg hover:bg-gray-50"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slider Container */}
      <div
        ref={sliderRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {promotions.map((promo) => (
          <Link
            href={promo.link}
            key={promo.id}
            className={`flex-shrink-0 w-full md:w-[600px] h-[200px] md:h-[240px] rounded-2xl overflow-hidden snap-center ${promo.bgColor} transition-transform hover:scale-[1.02] duration-300`}
          >
            <div className="flex h-full">
              {/* Content */}
              <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
                <div className={`text-sm md:text-base font-medium ${promo.textColor}`}>
                  {promo.title}
                </div>
                <h3 className="text-xl md:text-3xl font-bold mt-2 text-gray-900">
                  {promo.highlight}
                </h3>
                {promo.discount && (
                  <div className="inline-block px-4 py-1 mt-3 bg-white rounded-full font-semibold text-sm md:text-base text-gray-900">
                    {promo.discount}
                  </div>
                )}
                <p className="mt-2 text-sm md:text-base text-gray-600">
                  {promo.description}
                </p>
                <div className="mt-4 inline-flex items-center text-sm font-medium text-gray-900">
                  Shop Now
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
              
              {/* Image */}
              <div className="relative hidden md:block w-[240px]">
                <Image
                  src={promo.image}
                  alt={promo.highlight}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Mobile scroll view */}
      <div className='md:hidden flex-1 overflow-x-auto snap-x snap-mandatory mt-8'>
        <div className='flex h-full gap-4 pb-4 min-w-max px-2'>
          {categories.map((category) => (
            <Link
              href={category.link}
              key={category.id}
              className='group w-[280px] flex-shrink-0 snap-center overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300'
            >
              <div className='relative w-full h-full overflow-hidden'>
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className='object-cover group-hover:scale-110 transition-transform duration-300'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent' />
                <div className='absolute bottom-0 left-0 right-0 p-4'>
                  <h3 className='text-lg font-semibold mb-1 text-white'>
                    {category.title}
                  </h3>
                  <p className='text-sm text-gray-200'>
                    {category.description}
                  </p>
                  <div className='mt-2 inline-flex items-center text-sm font-medium text-white'>
                    View Products
                    <svg
                      className='ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M9 5l7 7-7 7'
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Desktop grid view */}
      <div className='hidden md:grid grid-cols-3 gap-6 mt-8'>
        {categories.map((category) => (
          <Link
            href={category.link}
            key={category.id}
            className='group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300'
          >
            <div className='relative h-48 overflow-hidden'>
              <Image
                src={category.image}
                alt={category.title}
                fill
                className='object-cover group-hover:scale-110 transition-transform duration-300'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent' />
              <div className='absolute bottom-0 left-0 right-0 p-4'>
                <h3 className='text-lg md:text-xl font-semibold mb-1 text-white'>
                  {category.title}
                </h3>
                <p className='text-xs md:text-sm text-gray-200'>
                  {category.description}
                </p>
                <div className='mt-2 inline-flex items-center text-xs md:text-sm font-medium text-white'>
                  View Products
                  <svg
                    className='ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 5l7 7-7 7'
                    />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
