'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Toast from '../../components/Toast';

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    setMounted(true);
    // Check if user is logged in
    const ownerId = localStorage.getItem('ownerId');
    if (!ownerId) {
      router.push('/');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('ownerId');
    localStorage.removeItem('ownerName');
    setToast({ message: 'Logged out successfully', type: 'info' });
    setTimeout(() => {
      router.push('/');
    }, 1000);
  };

  if (!mounted) return null;

  return (
    <div className="flex h-screen">
      <Sidebar onLogout={handleLogout} />
      
      <main className="flex-1 overflow-auto">
        <div className="md:p-8 p-6 pt-20 md:pt-8">
          {children}
        </div>
      </main>

      <Toast
        message={toast?.message}
        type={toast?.type}
        onClose={() => setToast(null)}
      />
    </div>
  );
}
