'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export interface Admin {
  id: string;
  name: string;
  email: string;
  role: string;
}

export function useAuth() {
  const router = useRouter();
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = Cookies.get('token');
      const storedAdmin = localStorage.getItem('admin');

      if (token && storedAdmin) {
        try {
          setAdmin(JSON.parse(storedAdmin));
        } catch (error) {
          console.error('Error parsing admin data:', error);
          logout();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Invalid credentials');
      }

      if (!data.token || !data.admin) {
        throw new Error('Invalid response from server');
      }

      // Set cookie and local storage
      Cookies.set('token', data.token, { expires: 7 }); // Expires in 7 days
      localStorage.setItem('admin', JSON.stringify(data.admin));
      setAdmin(data.admin);

      // Force a hard navigation to dashboard
      window.location.href = '/dashboard';
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(error.message || 'Failed to login');
    }
  };

  const logout = () => {
    Cookies.remove('token');
    localStorage.removeItem('admin');
    setAdmin(null);
    window.location.href = '/login';
  };

  return {
    admin,
    loading,
    login,
    logout,
    isAuthenticated: !!admin,
  };
}
