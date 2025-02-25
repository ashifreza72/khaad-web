'use client';
import Image from 'next/image';
import Link from 'next/link';
import { FiClock, FiArrowRight } from 'react-icons/fi';

interface Tip {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  readTime: string;
  date: string;
  author: {
    name: string;
    role: string;
    image: string;
  };
}

const tips: Tip[] = [
  {
    id: 1,
    title: 'Best Practices for Using NPK Fertilizers',
    excerpt:
      'Learn about the right timing and methods to apply NPK fertilizers for maximum crop yield.',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449',
    category: 'Fertilizers',
    readTime: '5 min read',
    date: 'Apr 15, 2024',
    author: {
      name: 'Dr. Rajesh Kumar',
      role: 'Agricultural Expert',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    },
  },
  {
    id: 2,
    title: 'Organic Pest Control Methods',
    excerpt:
      'Discover natural and effective ways to protect your crops from pests without harmful chemicals.',
    image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9',
    category: 'Organic Farming',
    readTime: '4 min read',
    date: 'Apr 12, 2024',
    author: {
      name: 'Priya Singh',
      role: 'Organic Farming Specialist',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    },
  },
  {
    id: 3,
    title: 'Seasonal Planting Guide',
    excerpt:
      'Month-by-month guide for planting different crops according to seasons in India.',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d',
    category: 'Farming Guide',
    readTime: '6 min read',
    date: 'Apr 10, 2024',
    author: {
      name: 'Amit Patel',
      role: 'Farm Advisor',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    },
  },
];

const FarmingTips = () => {
  return (
    <section className='py-12 bg-gray-50'>
      <div className='container mx-auto px-4'>
        <div className='flex justify-between items-center mb-8'>
          <div>
            <h2 className='text-2xl md:text-3xl font-bold'>Farming Tips</h2>
            <p className='text-gray-600 mt-2'>
              Expert advice for better farming practices
            </p>
          </div>
          <Link
            href='/blog'
            className='text-blue-500 hover:text-blue-600 font-semibold flex items-center gap-2'
          >
            View All
            <FiArrowRight className='group-hover:translate-x-1' />
          </Link>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {tips.map((tip) => (
            <article
              key={tip.id}
              className='bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col'
            >
              {/* Image */}
              <div className='relative h-48 overflow-hidden'>
                <Image
                  src={tip.image}
                  alt={tip.title}
                  fill
                  className='object-cover'
                />
                <div className='absolute top-4 left-4'>
                  <span className='bg-white/90 backdrop-blur-sm text-gray-800 text-sm font-medium px-3 py-1 rounded-full'>
                    {tip.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className='p-6 flex-1 flex flex-col'>
                <div className='flex-1'>
                  <h3 className='text-xl font-bold mb-2 text-gray-900'>
                    {tip.title}
                  </h3>
                  <p className='text-gray-600 mb-4'>{tip.excerpt}</p>
                </div>

                <div className='flex items-center justify-between mt-4 pt-4 border-t border-gray-100'>
                  {/* Author Info */}
                  <div className='flex items-center gap-3'>
                    <div className='relative w-8 h-8 rounded-full overflow-hidden'>
                      <Image
                        src={tip.author.image}
                        alt={tip.author.name}
                        fill
                        className='object-cover'
                      />
                    </div>
                    <div>
                      <p className='text-sm font-medium text-gray-900'>
                        {tip.author.name}
                      </p>
                      <p className='text-xs text-gray-500'>{tip.author.role}</p>
                    </div>
                  </div>

                  {/* Read Time */}
                  <div className='flex items-center text-gray-500 text-sm'>
                    <FiClock className='mr-1' />
                    {tip.readTime}
                  </div>
                </div>
              </div>

              {/* Read More Link */}
              <Link
                href={`/blog/${tip.id}`}
                className='px-6 py-3 bg-gray-50 text-blue-500 hover:text-blue-600 font-medium flex items-center justify-between group'
              >
                Read More
                <FiArrowRight className='group-hover:translate-x-1 transition-transform duration-300' />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FarmingTips;
