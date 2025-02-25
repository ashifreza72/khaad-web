'use client';
import Image from 'next/image';
import { FiShoppingCart } from 'react-icons/fi';

interface Size {
  size: string;
  price: string;
}

interface Product {
  id: number;
  title: string;
  originalPrice: string;
  image: string;
  description: string;
  sizes?: Size[];
  category: string;
  discount?: string;
}

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
  showDiscount?: boolean;
}

const ProductCard = ({ product, onClick, showDiscount = true }: ProductCardProps) => {
  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent opening modal when clicking the Add to Cart button
    if (!(e.target as HTMLElement).closest('.cart-button')) {
      onClick(product);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event
    onClick(product); // Open modal for size selection
  };

  return (
    <div
    onClick={handleCardClick}
    className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col relative"
  >
    {/* Image Container */}
    <div className="relative w-full pt-[80%] overflow-hidden rounded-t-xl">
      <div className="absolute inset-0 flex items-center justify-center p-4 group-hover:scale-105 transition-transform duration-300">
        <Image
          src={product.image}
          alt={`${product.title} - ${product.description || 'Product'}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-contain"
          priority
        />
      </div>
      {showDiscount && product.discount && (
        <span className="absolute top-2 right-2 bg-red-500 text-white px-1 py-1 rounded-full text-xs sm:text-sm font-medium">
          {product.discount} OFF
        </span>
      )}
    </div>
  
    {/* Content Container */}
    <div className="flex flex-col flex-grow p-1 sm:p-4 pb-2">
      <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem] hover:text-blue-600 transition-colors duration-200">
        {product.title}
      </h3>
      <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-2 flex-grow">
        {product.description}
      </p>
  
      {/* Price and Category */}
      <div className="mt-auto flex justify-between items-center">
        {/* Category */}
        <span className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-full">
          {product.category}
        </span>
  
        {/* Price Section */}
        <div className="flex items-center gap-2">
          {product.discount && (
            <span className="text-xs sm:text-sm text-gray-500 line-through">
              {product.originalPrice}
            </span>
          )}
          <span className="text-base sm:text-lg font-bold text-gray-900">
            {product.sizes && product.sizes.length > 0
              ? product.sizes[0].price
              : product.originalPrice}
          </span>
        </div>
      </div>
      
    {/* Full-width Add to Cart Button */}
    <button
      onClick={handleAddToCart}
      className="cart-button w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white py-2 rounded-xl flex items-center justify-center gap-2 text-sm font-medium transition-all duration-200"
    >
      <FiShoppingCart className="w-4 h-4" />
      <span>Add to Cart</span>
    </button>
    </div>
  </div>
  
  );
};

export default ProductCard;
