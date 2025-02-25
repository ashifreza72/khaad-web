'use client';
import Image from 'next/image';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useCallback, useEffect, useState } from 'react';

const HeroSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000 }),
  ]);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449',
      title: 'Khaad (Fertilizers)',
      description: 'Premium quality fertilizers for better crop yield',
    },
    {
      image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9',
      title: 'Pesticides (Keetnashak)',
      description: 'Effective pest control solutions for your crops',
    },
    {
      image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d',
      title: 'Beej (Seeds)',
      description: 'High-quality seeds for maximum productivity',
    },
  ];

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className='relative h-[50vh] md:h-[50vh]'>
      <div className='overflow-hidden h-full' ref={emblaRef}>
        <div className='flex h-full'>
          {slides.map((slide, index) => (
            <div key={index} className='relative flex-[0_0_100%] h-full'>
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className='object-cover'
                priority={index === 0}
              />
              <div className='absolute inset-0 bg-black bg-opacity-50'>
                <div className='container mx-auto h-full flex items-center justify-center text-center px-4'>
                  <div className='max-w-2xl'>
                    <h1 className='text-2xl md:text-4xl lg:text-5xl font-bold mb-2 text-white'>
                      {slide.title}
                    </h1>
                    <p className='text-sm md:text-base lg:text-lg mb-4 text-white/90'>
                      {slide.description}
                    </p>
                    <Link
                      href='/products'
                      className='bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full text-sm md:text-base font-semibold transition duration-300 inline-block'
                    >
                      View Products
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Dots */}
      <div className='absolute bottom-2 left-0 right-0'>
        <div className='flex justify-center gap-2'>
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === selectedIndex
                  ? 'bg-white scale-100'
                  : 'bg-white/50 scale-75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
