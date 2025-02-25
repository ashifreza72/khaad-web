'use client';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

interface Offer {
  id: number;
  title: string;
  description: string;
  image: string;
  discount: string;
  validTill: string;
  link: string;
  bgColor: string;
}

const offers: Offer[] = [
  {
    id: 1,
    title: 'Rabi Season Special',
    description: 'Get up to 30% off on all wheat and mustard seeds',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d',
    discount: '30% OFF',
    validTill: 'Valid till 30th April',
    link: '/offers/rabi-season',
    bgColor: 'from-green-500/90 to-green-600/90',
  },
  {
    id: 2,
    title: 'Monsoon Offer',
    description: 'Special discount on premium quality fertilizers',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449',
    discount: '25% OFF',
    validTill: 'Valid till 31st July',
    link: '/offers/monsoon',
    bgColor: 'from-blue-500/90 to-blue-600/90',
  },
  {
    id: 3,
    title: 'Organic Package',
    description: 'Complete organic farming solution at best price',
    image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9',
    discount: '20% OFF',
    validTill: 'Limited time offer',
    link: '/offers/organic',
    bgColor: 'from-orange-500/90 to-orange-600/90',
  },
];

const SeasonalOffers = () => {
  return (
    <section className='py-12  bg-white'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-10'>
          <h2 className='text-2xl md:text-3xl font-bold'>Seasonal Offers</h2>
          <p className='text-gray-600 mt-2'>
            Special discounts for different farming seasons
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {offers.map((offer) => (
            <Link
              href={offer.link}
              key={offer.id}
              className='group relative overflow-hidden rounded-2xl'
            >
              <div className='aspect-[4/3] relative'>
                <Image
                  src={offer.image}
                  alt={offer.title}
                  fill
                  className='object-cover group-hover:scale-110 transition-transform duration-300'
                />
                {/* Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${offer.bgColor}`}
                />

                {/* Content */}
                <div className='absolute inset-0 p-6 flex flex-col justify-between text-white'>
                  <div>
                    <div className='bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-sm inline-block'>
                      {offer.discount}
                    </div>
                    <h3 className='text-2xl font-bold mt-4'>{offer.title}</h3>
                    <p className='mt-2 text-white/90'>{offer.description}</p>
                  </div>

                  <div className='flex items-center justify-between'>
                    <span className='text-sm text-white/80'>
                      {offer.validTill}
                    </span>
                    <span className='flex items-center gap-2 font-medium group-hover:gap-3 transition-all duration-300'>
                      Shop Now
                      <FiArrowRight className='group-hover:translate-x-1 transition-transform duration-300' />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className='mt-10 relative overflow-hidden rounded-2xl'>
          <div className='aspect-[5/2] relative'>
            <Image
              src='https://images.unsplash.com/photo-1625246333195-78d9c38ad449'
              alt='Special Offer'
              fill
              className='object-cover'
            />
            <div className='absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-900/40' />
            <div className='absolute inset-0 flex items-center'>
              <div className='container mx-auto px-6 md:px-10'>
                <div className='max-w-lg'>
                  <h3 className='text-3xl md:text-4xl font-bold text-white mb-4'>
                    Bulk Purchase Offer
                  </h3>
                  <p className='text-white/90 text-lg mb-6'>
                    Get additional 10% discount on bulk orders above ₹10,000
                  </p>
                  <Link
                    href='/contact'
                    className='inline-flex items-center gap-2 bg-white text-blue-900 px-6 py-3 rounded-full font-semibold hover:bg-blue-50 transition duration-300'
                  >
                    Contact Sales
                    <FiArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeasonalOffers;
