'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, LogOut, Home, Heart, Calendar, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Sidebar({ onLogout }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '/dashboard', icon: Home },
    { label: 'My Pets', href: '/pets', icon: Heart },
    { label: 'Appointments', href: '/appointments', icon: Calendar },
    { label: 'Invoices', href: '/invoices', icon: FileText },
  ];

  const isActive = (href) => pathname === href;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-6 left-6 z-[100] glass p-2 text-gold"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 md:hidden z-40"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: isOpen ? 0 : -280 }}
        transition={{ duration: 0.3 }}
        className="fixed left-0 top-0 h-screen w-72 glass z-50 p-6 flex flex-col border-r border-gold/10 md:translate-x-0 md:relative md:translate-x-0"
      >
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-2xl font-display font-bold text-gradient mb-1">
            VETCARE
          </h1>
          <p className="text-xs text-platinum/60">Pet Owner Portal</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {navItems.map(item => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                    active
                      ? 'bg-gold/10 text-gold border border-gold/30'
                      : 'text-platinum/70 hover:text-platinum hover:bg-white/5'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* Divider */}
        <div className="divider-gold my-4" />

        {/* Logout Button */}
        <button
          onClick={() => {
            onLogout();
            setIsOpen(false);
          }}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-red-300 hover:bg-red-500/10 transition-all duration-300 border border-red-500/30 hover:border-red-500/50"
        >
          <LogOut size={20} />
          <span className="font-medium">Switch Owner</span>
        </button>
      </motion.aside>

      {/* Mobile backdrop close */}
      {isOpen && (
        <div
          className="fixed inset-0 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
