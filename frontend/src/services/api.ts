import axios from 'axios';
import { ProductResponse } from '@/types/product';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const productApi = {
  getAll: async () => {
    try {
      const response = await api.get<ProductResponse[]>('/api/products');
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  },

  getByCategory: async (category: string) => {
    try {
      const response = await api.get<ProductResponse[]>(`/api/products?category=${category}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching products for category ${category}:`, error);
      return [];
    }
  },

  getById: async (id: string) => {
    try {
      const response = await api.get<ProductResponse>(`/api/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw error;
    }
  },
};

export default api;
