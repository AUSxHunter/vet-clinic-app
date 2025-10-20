'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { apiGet, apiPost } from '../../lib/api';
import { motion } from 'framer-motion';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Toast from '../../components/Toast';
import Skeleton from '../../components/Skeleton';
import EmptyState from '../../components/EmptyState';
import Badge from '../../components/Badge';
import { Calendar, Clock, User, Stethoscope, Plus, CheckCircle, Trash2, ArrowLeft, Heart, FileText } from 'lucide-react';

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'scheduled', 'done'

  const ownerId = typeof window !== 'undefined' ? localStorage.getItem('ownerId') : null;

  // Fetch appointments and pets
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [allAppointments, allPets] = await Promise.all([
          apiGet('/api/appointments'),
          apiGet('/api/pets'),
        ]);

        const ownerPets = allPets.filter(p => String(p.owner_id) === String(ownerId));
        const ownerPetIds = ownerPets.map(p => p.id);
        const ownerAppointments = allAppointments.filter(a =>
          ownerPetIds.includes(a.pet_id)
        );

        setPets(ownerPets);
        setAppointments(ownerAppointments);
      } catch (err) {
        setToast({ message: 'Failed to load appointments', type: 'error' });
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (ownerId) {
      fetchData();
    }
  }, [ownerId]);

  // Handle mark done
  const handleMarkDone = async (appointmentId) => {
    try {
      const updated = await apiPost(`/api/appointments/${appointmentId}/complete`, {});
      setAppointments(
        appointments.map(a => a.id === appointmentId ? updated : a)
      );
      setToast({ message: 'Appointment marked as done!', type: 'success' });
    } catch (err) {
      setToast({ message: 'Failed to update appointment', type: 'error' });
    }
  };

  // Handle cancel (client-side)
  const handleCancel = (appointmentId) => {
    setAppointments(appointments.filter(a => a.id !== appointmentId));
    setToast({ message: 'Appointment cancelled', type: 'info' });
  };

  // Get pet name by ID
  const getPetName = (petId) => {
    const pet = pets.find(p => p.id === petId);
    return pet?.name || '?';
  };

  // Filter appointments
  const filteredAppointments = appointments.filter(a => {
    if (filter === 'scheduled') return a.status === 'SCHEDULED';
    if (filter === 'done') return a.status === 'DONE';
    return true;
  });

  // Format datetime
  const formatDateTime = (dt) => {
    if (!dt) return '?';
    const date = new Date(dt);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Navigation */}
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
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-4xl font-display font-bold mb-2">My Appointments</h1>
          <p className="text-platinum/60">Schedule and manage your pet's visits</p>
        </div>
        <Link href="/appointments/book">
          <Button variant="primary" size="lg">
            <Plus size={20} className="inline mr-2" />
            Book Appointment
          </Button>
        </Link>
      </motion.div>

      {/* Filter Tabs */}
      {!loading && appointments.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-3 flex-wrap"
        >
          {[
            { label: 'All', value: 'all', count: appointments.length },
            { label: 'Scheduled', value: 'scheduled', count: appointments.filter(a => a.status === 'SCHEDULED').length },
            { label: 'Done', value: 'done', count: appointments.filter(a => a.status === 'DONE').length },
          ].map(tab => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={`px-6 py-2 rounded-full transition-all duration-300 font-medium ${
                filter === tab.value
                  ? 'bg-gold text-obsidian shadow-glow'
                  : 'glass border border-gold/30 text-gold hover:border-gold'
              }`}
            >
              {tab.label}
              <span className="ml-2 text-xs opacity-70">({tab.count})</span>
            </button>
          ))}
        </motion.div>
      )}

      {/* Appointments List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="glass-light p-6">
              <Skeleton count={3} />
            </div>
          ))}
        </div>
      ) : filteredAppointments.length === 0 ? (
        <EmptyState
          icon={Calendar}
          title={filter === 'all' ? 'No Appointments' : `No ${filter} appointments`}
          description={
            filter === 'all'
              ? 'Start by booking your first appointment for your pet'
              : 'No appointments in this category'
          }
          actionLabel={filter === 'all' ? 'Book First Appointment' : undefined}
          onAction={() => window.location.href = '/appointments/book'}
        />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          className="space-y-4"
        >
          {filteredAppointments.map((appointment, idx) => {
            const isDone = appointment.status === 'DONE';
            return (
              <motion.div
                key={appointment.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card className={isDone ? 'opacity-70' : ''}>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    {/* Left Content */}
                    <div className="flex-1 space-y-3">
                      {/* Pet & Status */}
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-display font-bold mb-1">
                            🐾 {getPetName(appointment.pet_id)}
                          </h3>
                          <Badge
                            variant={isDone ? 'done' : 'scheduled'}
                            size="sm"
                          >
                            {isDone ? '✓ DONE' : 'SCHEDULED'}
                          </Badge>
                        </div>
                      </div>

                      {/* Details Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2 text-platinum/70">
                          <Calendar size={16} className="text-gold" />
                          <span>{formatDateTime(appointment.datetime)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-platinum/70">
                          <User size={16} className="text-gold" />
                          <span>{appointment.vet_name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-platinum/70">
                          <Stethoscope size={16} className="text-gold" />
                          <span>
                            {appointment.services && appointment.services.length > 0
                              ? appointment.services.map(s => s.name).join(', ')
                              : 'Services TBD'}
                          </span>
                        </div>
                        {appointment.id && (
                          <div className="flex items-center gap-2 text-platinum/70">
                            <span className="text-xs">ID: #{appointment.id}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 flex-wrap md:flex-nowrap">
                      {!isDone && (
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleMarkDone(appointment.id)}
                        >
                          <CheckCircle size={16} className="inline mr-1" />
                          Mark Done
                        </Button>
                      )}
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleCancel(appointment.id)}
                      >
                        <Trash2 size={16} className="inline mr-1" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* Quick Navigation */}
      {filteredAppointments.length > 0 && (
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
          <Link href="/invoices">
            <Button variant="secondary" size="lg" className="w-full">
              <FileText size={20} className="mr-2" />
              View My Invoices
            </Button>
          </Link>
        </motion.div>
      )}

      {/* Info Card */}
      {filteredAppointments.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass p-6 space-y-3"
        >
          <h3 className="font-semibold text-gold">📋 Important Notes</h3>
          <ul className="text-sm text-platinum/70 space-y-2">
            <li>• Appointments marked as "Done" will generate an invoice</li>
            <li>• Cancellations are immediate and cannot be undone</li>
            <li>• Contact us directly if you need to reschedule</li>
          </ul>
        </motion.div>
      )}

      <Toast
        message={toast?.message}
        type={toast?.type}
        onClose={() => setToast(null)}
      />
    </div>
  );
}

