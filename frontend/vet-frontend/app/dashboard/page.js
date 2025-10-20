'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiGet } from '../../lib/api';
import { motion } from 'framer-motion';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Skeleton from '../../components/Skeleton';
import { Heart, Calendar, FileText, Settings, Plus, ArrowRight } from 'lucide-react';

export default function Dashboard() {
  const [ownerName, setOwnerName] = useState('');
  const [stats, setStats] = useState({
    pets: 0,
    appointments: 0,
    invoices: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const name = localStorage.getItem('ownerName');
    const ownerId = localStorage.getItem('ownerId');
    setOwnerName(name || 'Guest');

    const fetchStats = async () => {
      try {
        const [pets, appointments, invoices] = await Promise.all([
          apiGet('/api/pets'),
          apiGet('/api/appointments'),
          apiGet('/api/invoices'),
        ]);

        // Filter by current owner's pets
        const ownerPets = pets.filter(p => String(p.owner_id) === String(ownerId));
        const ownerPetIds = ownerPets.map(p => p.id);
        const ownerAppointments = appointments.filter(a =>
          ownerPetIds.includes(a.pet_id)
        );
        const ownerInvoices = invoices.filter(inv =>
          ownerAppointments.some(a => a.id === inv.appointment_id)
        );

        setStats({
          pets: ownerPets.length,
          appointments: ownerAppointments.length,
          invoices: ownerInvoices.length,
        });
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      } finally {
        setLoading(false);
      }
    };

    if (ownerId) {
      fetchStats();
    }
  }, []);

  const quickLinks = [
    {
      icon: Heart,
      label: 'My Pets',
      description: 'Manage your pets',
      href: '/pets',
      color: 'from-pink-500 to-rose-500',
    },
    {
      icon: Calendar,
      label: 'Appointments',
      description: 'View & book appointments',
      href: '/appointments',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: FileText,
      label: 'Invoices',
      description: 'View invoices',
      href: '/invoices',
      color: 'from-amber-500 to-orange-500',
    },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-4xl md:text-5xl font-display font-bold">
          Welcome back, <span className="text-gradient">{ownerName}</span>!
        </h1>
        <p className="text-platinum/60 text-lg">
          Manage your pets and appointments with ease
        </p>
      </motion.div>

      {/* Stats Cards */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="glass-light p-6">
              <Skeleton count={2} />
            </div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { label: 'Pets', value: stats.pets, icon: Heart },
            { label: 'Appointments', value: stats.appointments, icon: Calendar },
            { label: 'Invoices', value: stats.invoices, icon: FileText },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (idx + 1) }}
                className="glass-light p-6 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-platinum/60 text-sm font-medium">
                    {stat.label}
                  </span>
                  <div className="p-2 bg-gold/10 rounded-lg">
                    <Icon size={20} className="text-gold" />
                  </div>
                </div>
                <div className="text-3xl font-display font-bold text-gradient">
                  {stat.value}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* Quick Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl font-display font-bold mb-4">Quick Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickLinks.map((link, idx) => {
            const Icon = link.icon;
            return (
              <Link key={link.href} href={link.href}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + 0.05 * idx }}
                  whileHover={{ y: -8 }}
                  className="glass-light p-6 h-full cursor-pointer group"
                >
                  <div className={`inline-block p-3 rounded-lg bg-gradient-to-br ${link.color} bg-opacity-10 mb-4`}>
                    <Icon size={24} className="text-gold" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1 group-hover:text-gold transition-colors">
                    {link.label}
                  </h3>
                  <p className="text-platinum/60 text-sm">
                    {link.description}
                  </p>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </motion.div>

      {/* Quick Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-2xl font-display font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/pets">
            <Button variant="primary" size="lg" className="w-full">
              <Plus size={20} className="mr-2" />
              Add New Pet
            </Button>
          </Link>
          <Link href="/appointments/book">
            <Button variant="secondary" size="lg" className="w-full">
              <Calendar size={20} className="mr-2" />
              Book Appointment
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Info Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass p-6 border-l-4 border-gold"
      >
        <h3 className="font-semibold text-gold mb-2">💡 Tip</h3>
        <p className="text-platinum/60">
          Keep your pet information up to date to ensure smooth appointment scheduling and accurate medical records.
        </p>
      </motion.div>
    </div>
  );
}
