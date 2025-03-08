'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
}

// Sample categories in case API fails
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
  // {
  //   id: '4',
  //   name: 'Tools',
  //   description: 'Essential farming tools for efficient agriculture',
  //   image: '/images/tools.jpg',
  //   slug: 'tools',
  // },
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
          'http://localhost:5000/api/categories'
        );

        if (response.data?.success) {
          setCategories(response.data.categories);
        } else {
          // Use fallback categories if API doesn't return expected format
          setCategories(fallbackCategories);
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
        // Use fallback categories if API fails
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
      <section className='py-12 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <div className='flex justify-center'>
            <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500'></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className='py-16 bg-gradient-to-b from-white to-green-50'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-bold mb-3 text-gray-800'>
            Shop by Category
          </h2>
          <div className='w-24 h-1 bg-gradient-to-r from-green-500 to-green-600 mx-auto mb-4'></div>
          <p className='text-gray-600 max-w-2xl mx-auto'>
            Browse our wide range of agricultural products designed to help your
            farm thrive
          </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
          {categories.map((category) => (
            <Link
              href={`/products?category=${category.slug}`}
              key={category.id}
              className='group'
            >
              <div className='bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl group-hover:transform group-hover:-translate-y-1'>
                <div className='relative h-48 w-full overflow-hidden'>
                  <Image
                    src={category.image || '/placeholder-category.jpg'}
                    alt={category.name}
                    fill
                    className='object-cover group-hover:scale-110 transition-transform duration-500'
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80'></div>
                  <div className='absolute bottom-0 left-0 right-0 p-4 text-white'>
                    <h3 className='text-xl font-bold mb-1'>{category.name}</h3>
                    <p className='text-sm text-gray-200 line-clamp-2'>
                      {category.description}
                    </p>
                  </div>
                </div>
                <div className='p-4 flex justify-between items-center'>
                  <span className='text-green-600 font-medium'>
                    View Products
                  </span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5 text-green-600 transform group-hover:translate-x-1 transition-transform'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z'
                      clipRule='evenodd'
                    />
                  </svg>
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
