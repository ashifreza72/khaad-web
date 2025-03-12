'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
}

const fallbackCategories: Category[] = [
  {
    id: '1',
    name: 'Fertilizers',
    description: 'Boost your crop yield with our premium fertilizers',
    image: '/images/urea.png',
    slug: 'fertilizers',
  },
  {
    id: '2',
    name: 'Seeds',
    description: 'High-quality seeds for better germination and growth',
    image: '/images/seed.png',
    slug: 'seeds',
  },
  {
    id: '3',
    name: 'Pesticides',
    description: 'Protect your crops from harmful pests and diseases',
    image: '/images/pesticide.png',
    slug: 'pesticides',
  },
  {
    id: '4',
    name: 'Tools',
    description: 'Essential farming tools for efficient agriculture',
    image: '/images/regent.jpg',
    slug: 'tools',
  },
];

function CategorySection() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          'http://localhost:5000/api/products/categories'
        );

        if (response.data && Array.isArray(response.data.categories)) {
          const formattedCategories = response.data.categories.map(
            (cat: string) => ({
              id: cat.toLowerCase(),
              name: cat,
              description: `Browse our ${cat.toLowerCase()} collection`,
              image: `/images/${cat.toLowerCase()}.png`,
              slug: cat.toLowerCase(),
            })
          );
          setCategories(formattedCategories);
        } else {
          console.warn('Unexpected API response:', response.data);
          setCategories(fallbackCategories);
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
        setCategories(fallbackCategories);
        setError('Could not load categories from server');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className='flex justify-center items-center h-64'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500'></div>
      </div>
    );
  }

  return (
    <section className='py-16 bg-gray-50'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-800'>
            Shop by Category
          </h2>
        </div>

        {/* Swiper for Mobile, Grid for Desktop */}
        <div className='block lg:hidden'>
          <Swiper
            modules={[Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoHeight={true} // 🟢 Apply globally
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            className='my-6'
          >
            {categories.map((category) => (
              <SwiperSlide key={category.id}>
                <Link
                  href={`/products?category=${category.slug}`}
                  className='group'
                >
                  <div className='bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl flex items-stretch h-full'>
                    {/* Content on the Left */}
                    <div className='p-4 flex flex-col justify-between w-2/3'>
                      <h3 className='text-lg font-bold text-gray-800'>
                        {category.name}
                      </h3>
                      <p className='text-gray-600 text-sm flex-grow'>
                        {category.description}
                      </p>
                      <div>
                        <span className='text-green-600 font-medium'>
                          View Products
                        </span>
                      </div>
                    </div>

                    {/* Image on the Right */}
                    <div className='relative w-1/3 h-full'>
                      <Image
                        src={category.image || '/placeholder-category.jpg'}
                        alt={category.name}
                        width={120}
                        height={120}
                        className='object-cover'
                      />
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Desktop Grid View */}
        <div className='hidden lg:grid grid-cols-4 gap-6'>
          {categories.map((category) => (
            <Link
              href={`/products?category=${category.slug}`}
              key={category.id}
              className='group'
            >
              <div className='bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl flex items-stretch h-full'>
                {/* Content on the Left */}
                <div className='p-4 flex flex-col justify-between w-2/3'>
                  <h3 className='text-lg font-bold text-gray-800'>
                    {category.name}
                  </h3>
                  <p className='text-gray-600 text-sm flex-grow'>
                    {category.description}
                  </p>
                  <div>
                    <span className='text-green-600 font-medium'>
                      View Products
                    </span>
                  </div>
                </div>

                {/* Image on the Right */}
                <div className='relative w-1/3 h-full'>
                  <Image
                    src={category.image || '/placeholder-category.jpg'}
                    alt={category.name}
                    width={120}
                    height={120}
                    className='object-cover'
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategorySection;
