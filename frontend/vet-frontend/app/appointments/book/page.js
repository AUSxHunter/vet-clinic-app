'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiGet, apiPost } from '../../../lib/api';
import { motion } from 'framer-motion';
import Button from '../../../components/Button';
import MultiSelect from '../../../components/MultiSelect';
import Toast from '../../../components/Toast';
import Skeleton from '../../../components/Skeleton';
import { Calendar, ArrowRight, Heart, Home } from 'lucide-react';

export default function BookAppointmentPage() {
  const router = useRouter();
  const [pets, setPets] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const ownerId = typeof window !== 'undefined' ? localStorage.getItem('ownerId') : null;

  const [formData, setFormData] = useState({
    pet_id: '',
    vet_name: '',
    datetime: '',
    service_ids: [],
  });

  // Fetch pets and services
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [allPets, allServices] = await Promise.all([
          apiGet('/api/pets'),
          apiGet('/api/services'),
        ]);

        const ownerPets = allPets.filter(p => String(p.owner_id) === String(ownerId));
        setPets(ownerPets);
        setServices(allServices);
      } catch (err) {
        setToast({ message: 'Failed to load data', type: 'error' });
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (ownerId) {
      fetchData();
    }
  }, [ownerId]);

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.pet_id || !formData.vet_name || !formData.datetime || formData.service_ids.length === 0) {
      setToast({ message: 'Please fill in all fields', type: 'error' });
      return;
    }

    setSubmitting(true);
    try {
      await apiPost('/api/appointments', {
        ...formData,
        pet_id: parseInt(formData.pet_id),
        service_ids: formData.service_ids,
      });

      setToast({ message: 'Appointment booked successfully!', type: 'success' });
      setTimeout(() => {
        router.push('/appointments');
      }, 1500);
    } catch (err) {
      setToast({ message: 'Failed to book appointment: ' + err.message, type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  const serviceOptions = services.map(s => ({
    id: s.id,
    label: s.name,
    price: s.price,
  }));

  // Get tomorrow's date as minimum
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateTime = tomorrow.toISOString().slice(0, 16);

  // Calculate total price
  const selectedServices = services.filter(s => formData.service_ids.includes(s.id));
  const totalPrice = selectedServices.reduce((sum, s) => sum + s.price, 0);

  if (loading) {
    return (
      <div className="space-y-8 max-w-2xl mx-auto">
        <Skeleton count={5} height="h-20" />
      </div>
    );
  }

  if (pets.length === 0) {
    return (
      <div className="space-y-8 max-w-2xl mx-auto text-center">
        <h1 className="text-3xl font-display font-bold mb-4">Book Appointment</h1>
        <div className="glass-light p-8 space-y-4">
          <p className="text-platinum/60 mb-4">
            You need to add a pet before booking an appointment.
          </p>
          <Link href="/pets">
            <Button variant="primary" size="lg">
              Go to My Pets
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <Link href="/appointments" className="text-gold/70 hover:text-gold text-sm transition-colors flex items-center gap-1 mb-4">
          ← Back to Appointments
        </Link>
        <h1 className="text-4xl font-display font-bold">Book Appointment</h1>
        <p className="text-platinum/60">Schedule a visit for your pet</p>
      </motion.div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-light p-8 space-y-6"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Pet Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-platinum">
              Select Your Pet *
            </label>
            <select
              value={formData.pet_id}
              onChange={(e) => setFormData({ ...formData, pet_id: e.target.value })}
              required
              className="w-full"
            >
              <option value="">Choose a pet</option>
              {pets.map(pet => (
                <option key={pet.id} value={pet.id}>
                  {pet.name} ({pet.species})
                </option>
              ))}
            </select>
          </div>

          {/* Vet Name */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-platinum">
              Veterinarian Name *
            </label>
            <input
              type="text"
              value={formData.vet_name}
              onChange={(e) => setFormData({ ...formData, vet_name: e.target.value })}
              placeholder="e.g., Dr. Sarah Johnson"
              required
            />
          </div>

          {/* DateTime */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-platinum">
              Appointment Date & Time *
            </label>
            <input
              type="datetime-local"
              value={formData.datetime}
              onChange={(e) => setFormData({ ...formData, datetime: e.target.value })}
              min={minDateTime}
              required
            />
            <p className="text-xs text-platinum/50">
              Schedule at least 1 day in advance
            </p>
          </div>

          {/* Services */}
          <MultiSelect
            label="Select Services *"
            options={serviceOptions}
            selected={formData.service_ids}
            onChange={(ids) => setFormData({ ...formData, service_ids: ids })}
            placeholder="Choose services..."
          />

          {/* Price Summary */}
          {formData.service_ids.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass p-4 border-l-4 border-gold space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-platinum/60">Subtotal</span>
                <span className="font-semibold">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="divider-gold" />
              <div className="flex items-center justify-between">
                <span className="font-semibold">Total</span>
                <span className="text-xl font-display font-bold text-gradient">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
            </motion.div>
          )}

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <Link href="/appointments" className="flex-1">
              <Button variant="ghost" size="lg" className="w-full">
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="flex-1"
              disabled={submitting || !formData.pet_id}
            >
              {submitting ? 'Booking...' : (
                <>
                  Book Appointment
                  <ArrowRight size={18} className="inline ml-2" />
                </>
              )}
            </Button>
          </div>
        </form>
      </motion.div>

      {/* Quick Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <Link href="/pets">
          <Button variant="secondary" size="lg" className="w-full">
            <Heart size={20} className="mr-2" />
            View My Pets
          </Button>
        </Link>
        <Link href="/dashboard">
          <Button variant="secondary" size="lg" className="w-full">
            <Home size={20} className="mr-2" />
            Go to Dashboard
          </Button>
        </Link>
      </motion.div>

      {/* Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass p-6 space-y-3"
      >
        <h3 className="font-semibold text-gold flex items-center gap-2">
          <Calendar size={18} />
          About Your Appointment
        </h3>
        <ul className="text-sm text-platinum/70 space-y-2">
          <li>• Appointments are available 1+ days in advance</li>
          <li>• You can manage multiple services in one visit</li>
          <li>• An invoice will be generated after completion</li>
          <li>• You'll receive a confirmation after booking</li>
        </ul>
      </motion.div>

      <Toast
        message={toast?.message}
        type={toast?.type}
        onClose={() => setToast(null)}
      />
    </div>
  );
}
