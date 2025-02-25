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
    sizes: [{ size: '1 Bg', price: '₹300' }],
  },
  {
    id: 2,
    title: 'Organic Pesticide',
    price: '₹450',
    originalPrice: '₹599',
    image: '/images/8ea4ef5b-6958-4e17-8249-e7f99ff2fddd.png',
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
    sizes: [],
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
    sizes: [],
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
