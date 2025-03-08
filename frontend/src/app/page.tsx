import HeroSection from '@/components/HeroSection';
// import CategorySection from '@/components/CategorySection';
import FeaturedProducts from '@/components/FeaturedProducts';
// import BestSellers from '@/components/BestSellers';
import SeasonalOffers from '@/components/SeasonalOffers';
import FarmingTips from '@/components/FarmingTips';
import PopularProducts from '@/components/PopularProducts';
import CategorySection from '@/components/CategorySection';

export default function Home() {
  return (
    <main className='min-h-screen'>
      <HeroSection />
      <CategorySection />
      <PopularProducts />
      {/* Make sure FeaturedProducts is not inside any conditional rendering */}
      <FeaturedProducts />

      <SeasonalOffers />
      <FarmingTips />
    </main>
  );
}
