'use client';
import { useState } from 'react';
import { products } from '@/data/products';
import ProductDetailModal from '@/components/ProductDetailModal';
import ProductCard from '@/components/ProductCard';

const ProductsPage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredProducts, setFilteredProducts] = useState(products);

  const categories = ['All', ...new Set(products.map((product) => product.category))];

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
      setFilteredProducts(filtered);
    }
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="container mx-auto px-4 py-4 sm:py-6 lg:py-8">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6 lg:mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-sm sm:text-base transition-colors duration-300 ${
              selectedCategory === category
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={handleProductClick}
            showDiscount={false}
          />
        ))}
        {filteredProducts.length === 0 && (
          <div className="col-span-full text-center py-8 text-gray-500">
            No products found in this category
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default ProductsPage;
