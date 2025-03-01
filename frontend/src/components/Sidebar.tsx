'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function Sidebar() {
  const router = useRouter();
  const { logout } = useAuth();

  return (
    <div className="h-screen w-64 bg-indigo-800 text-white fixed left-0 top-0">
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-8">Khaad Web Admin</h2>
        <nav className="space-y-2">
          <button
            onClick={() => router.push('/dashboard')}
            className="w-full text-left px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
          >
            Dashboard
          </button>
          <button
            onClick={() => router.push('/dashboard/products')}
            className="w-full text-left px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
          >
            Products
          </button>
          <button
            onClick={() => router.push('/dashboard/orders')}
            className="w-full text-left px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
          >
            Orders
          </button>
          <button
            onClick={logout}
            className="w-full text-left px-4 py-2 rounded hover:bg-indigo-700 transition-colors text-red-300"
          >
            Logout
          </button>
        </nav>
      </div>
    </div>
  );
}
