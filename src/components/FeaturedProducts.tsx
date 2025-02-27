'use client';
import { useState } from 'react';
import { getFeaturedProducts } from '@/data/products';
import ProductDetailModal from './ProductDetailModal';
import ProductCard from './ProductCard';

const FeaturedProducts = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const featuredProducts = getFeaturedProducts();

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <section className="py-4 sm:py-6 lg:py-8 bg-gradient-to-r from-green-100 via-yellow-100 to-blue-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 lg:mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-green-800">Featured Products</h2>
            <p className="text-sm sm:text-base text-yellow-700 mt-1 sm:mt-2">
              Check out our special offers and discounts
            </p>
          </div>
        </div>

        {/* Scrolling container for mobile */}
        <div className="overflow-x-auto sm:overflow-visible">
          <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 flex-nowrap">
            {featuredProducts.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-1/2 sm:w-auto">
                <ProductCard 
                  product={product} 
                  onClick={handleProductClick} 
                  className="bg-white border border-green-300 hover:shadow-lg transition-shadow rounded-lg p-4"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <ProductDetailModal product={selectedProduct} isOpen={isModalOpen} onClose={handleCloseModal} />
    </section>
  );
};

export default FeaturedProducts;
