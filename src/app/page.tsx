import HeroSection from '@/components/HeroSection';
import CategorySection from '@/components/CategorySection';
import FeaturedProducts from '@/components/FeaturedProducts';
import PopularProducts from '@/components/PopularProducts';
import SeasonalOffers from '@/components/SeasonalOffers';
import FarmingTips from '@/components/FarmingTips';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  return (
    <main className='min-h-screen'>
      <div className='h-screen flex flex-col'>
        <div className='flex-none'>
          <HeroSection />
        </div>
        <div className='flex-1'>
          <CategorySection />
        </div>
      </div>
      <PopularProducts />
      <FeaturedProducts />
      <SeasonalOffers />
      <FarmingTips />
      <ContactSection />
    </main>
  );
}
