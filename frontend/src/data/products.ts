export interface Product {
  id: number;
  title: string;
  price: string;
  originalPrice: string;
  image: string;
  discount: string;
  category: string;
  sizes: { size: string; price: string }[];
  description?: string;
}

export const products: Product[] = [
  {
    id: 1,
    title: 'NPK Fertilizer',
    price: '₹750',
    originalPrice: '₹999',
    image: '/images/urea.png',
    discount: '25%',
    category: 'Fertilizers',
    description: 'Complete nutrition for your crops',
    sizes: [
      { size: '1 kg', price: '₹300' },
      { size: '5 kg', price: '₹750' },
      { size: '10 kg', price: '₹1400' }
    ],
  },  
  {
    id: 2,
    title: 'Organic Pesticide',
    price: '₹450',
    originalPrice: '₹599',
    image: '/images/pesticide.png',
    discount: '20%',
    category: 'Pesticides',
    description: 'Natural pest control solution',
    sizes: [
      { size: '10ml', price: '₹80' },
      { size: '100ml', price: '₹150' },
      { size: '250ml', price: '₹300' },
      { size: '500ml', price: '₹600' },
      { size: '1L', price: '₹750' },
    ],
  },
  {
    id: 3,
    title: 'Premium Seeds Pack',
    price: '₹299',
    originalPrice: '₹399',
    image: '/images/seed.png',
    discount: '25%',
    category: 'Seeds',
    description: 'High-quality seeds for better yield',
    sizes: [
      { size: '100g', price: '₹299' },
      { size: '250g', price: '₹599' },
      { size: '500g', price: '₹999' }
    ],
  },
  {
    id: 4,
    title: 'Urea Fertilizer',
    price: '₹550',
    originalPrice: '₹699',
    image: '/images/urea.png',
    discount: '20%',
    category: 'Fertilizers',
    description: 'High-quality urea fertilizer for better crop yield',
    sizes: [
      { size: '1 kg', price: '₹550' },
      { size: '5 kg', price: '₹2500' },
      { size: '10 kg', price: '₹4500' }
    ],
  },
];

// Helper function to get products by category
export const getProductsByCategory = (category: string) => {
  if (category.toLowerCase() === 'all') return products;
  return products.filter(product => 
    product.category.toLowerCase() === category.toLowerCase()
  );
};

// Helper function to get featured products (products with highest discount)
export const getFeaturedProducts = (limit: number = 4) => {
  return [...products]
    .sort((a, b) => parseInt(b.discount) - parseInt(a.discount))
    .slice(0, limit);
};
