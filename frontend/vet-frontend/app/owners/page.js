'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { apiGet } from '../../lib/api';
import { motion } from 'framer-motion';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { Users, ArrowLeft, Home } from 'lucide-react';

export default function OwnersPage() {
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const data = await apiGet('/api/owners');
        setOwners(data);
      } catch (err) {
        console.error('Failed to fetch owners:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOwners();
  }, []);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Navigation Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex gap-3"
      >
        <Link href="/dashboard">
          <Button variant="ghost" size="sm">
            <ArrowLeft size={16} className="mr-2" />
            Back to Dashboard
          </Button>
        </Link>
        <Link href="/">
          <Button variant="ghost" size="sm">
            <Home size={16} className="mr-2" />
            Home
          </Button>
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-4xl font-display font-bold mb-2">All Owners</h1>
          <p className="text-platinum/60">View all registered pet owners</p>
        </div>
        <div className="p-3 glass rounded-full">
          <Users size={32} className="text-gold" />
        </div>
      </motion.div>

      {/* Owners Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gold/20">
                  <th className="text-left p-4 font-semibold text-gold">Name</th>
                  <th className="text-left p-4 font-semibold text-gold">Email</th>
                  <th className="text-left p-4 font-semibold text-gold">Phone</th>
                  <th className="text-left p-4 font-semibold text-gold">ID</th>
                </tr>
              </thead>
              <tbody>
                {owners.map(o => (
                  <tr key={o.id} className="border-b border-gold/10 hover:bg-gold/5 transition-colors">
                    <td className="p-4">{o.name}</td>
                    <td className="p-4 text-platinum/70">{o.email}</td>
                    <td className="p-4 text-platinum/70">{o.phone}</td>
                    <td className="p-4 font-mono text-xs text-platinum/50">{o.id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <Link href="/pets">
          <Button variant="secondary" size="lg" className="w-full">
            View All Pets
          </Button>
        </Link>
        <Link href="/appointments">
          <Button variant="secondary" size="lg" className="w-full">
            View Appointments
          </Button>
        </Link>
        <Link href="/invoices">
          <Button variant="secondary" size="lg" className="w-full">
            View Invoices
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}

