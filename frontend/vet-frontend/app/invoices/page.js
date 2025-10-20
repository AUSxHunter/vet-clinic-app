'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { apiGet } from '../../lib/api';
import { motion } from 'framer-motion';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Toast from '../../components/Toast';
import Skeleton from '../../components/Skeleton';
import EmptyState from '../../components/EmptyState';
import Badge from '../../components/Badge';
import { FileText, Calendar, DollarSign, CheckCircle, Download, ArrowLeft, Heart } from 'lucide-react';

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const ownerId = typeof window !== 'undefined' ? localStorage.getItem('ownerId') : null;

  // Fetch invoices, appointments and pets
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [allInvoices, allAppointments, allPets] = await Promise.all([
          apiGet('/api/invoices'),
          apiGet('/api/appointments'),
          apiGet('/api/pets'),
        ]);

        // Filter by owner
        const ownerPets = allPets.filter(p => String(p.owner_id) === String(ownerId));
        const ownerPetIds = ownerPets.map(p => p.id);
        const ownerAppointments = allAppointments.filter(a =>
          ownerPetIds.includes(a.pet_id)
        );
        const ownerAppointmentIds = ownerAppointments.map(a => a.id);
        const ownerInvoices = allInvoices.filter(inv =>
          ownerAppointmentIds.includes(inv.appointment_id)
        );

        setPets(ownerPets);
        setAppointments(ownerAppointments);
        setInvoices(ownerInvoices);
      } catch (err) {
        setToast({ message: 'Failed to load invoices', type: 'error' });
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (ownerId) {
      fetchData();
    }
  }, [ownerId]);

  // Get appointment by ID
  const getAppointment = (appointmentId) => {
    return appointments.find(a => a.id === appointmentId);
  };

  // Get pet name by appointment
  const getPetName = (appointmentId) => {
    const appointment = getAppointment(appointmentId);
    if (!appointment) return '?';
    const pet = pets.find(p => p.id === appointment.pet_id);
    return pet?.name || '?';
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '?';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
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
        className="space-y-2"
      >
        <h1 className="text-4xl font-display font-bold mb-2">Invoices</h1>
        <p className="text-platinum/60">
          View and manage your appointment invoices
        </p>
      </motion.div>

      {/* Stats */}
      {!loading && invoices.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              label: 'Total Invoices',
              value: invoices.length,
              icon: FileText,
            },
            {
              label: 'Total Amount',
              value: `$${invoices.reduce((sum, inv) => sum + (inv.total || 0), 0).toFixed(2)}`,
              icon: DollarSign,
            },
            {
              label: 'Paid',
              value: invoices.filter(inv => inv.paid).length,
              icon: CheckCircle,
            },
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
                <div className="text-2xl font-display font-bold text-gradient">
                  {stat.value}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* Invoices List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="glass-light p-6">
              <Skeleton count={3} />
            </div>
          ))}
        </div>
      ) : invoices.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No Invoices Yet"
          description="Complete an appointment to generate your first invoice"
          actionLabel="Book Appointment"
          onAction={() => window.location.href = '/appointments/book'}
        />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          className="space-y-4"
        >
          {invoices.map((invoice, idx) => {
            const appointment = getAppointment(invoice.appointment_id);
            const isPaid = invoice.paid;

            return (
              <motion.div
                key={invoice.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card className={isPaid ? 'opacity-75' : ''}>
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-display font-bold mb-1">
                          📄 Invoice #{invoice.id}
                        </h3>
                        <p className="text-platinum/60 text-sm">
                          Pet: {getPetName(invoice.appointment_id)} • {appointment && formatDate(appointment.datetime)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {isPaid && (
                          <Badge variant="success" size="sm">
                            ✓ PAID
                          </Badge>
                        )}
                        {!isPaid && (
                          <Badge variant="warning" size="sm">
                            PENDING
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="divider-gold" />

                    {/* Services List */}
                    {appointment?.services && appointment.services.length > 0 ? (
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-platinum/80">Services</h4>
                        <div className="space-y-1 text-sm">
                          {appointment.services.map(service => (
                            <div
                              key={service.id}
                              className="flex items-center justify-between text-platinum/70"
                            >
                              <span>{service.name}</span>
                              <span className="text-gold">${service.price.toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-platinum/60 italic">No service details available</p>
                    )}

                    {/* Divider */}
                    <div className="divider-gold" />

                    {/* Total */}
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Total Amount</span>
                      <span className="text-2xl font-display font-bold text-gradient">
                        ${(invoice.total || 0).toFixed(2)}
                      </span>
                    </div>

                    {/* Notes */}
                    {invoice.notes && (
                      <div className="glass p-3 space-y-1">
                        <p className="text-xs font-semibold text-platinum/60">Notes</p>
                        <p className="text-sm text-platinum/70">{invoice.notes}</p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="flex-1"
                        onClick={() => {
                          // In a real app, this would trigger a download
                          setToast({ message: 'Download started...', type: 'info' });
                        }}
                      >
                        <Download size={16} className="inline mr-1" />
                        Download PDF
                      </Button>
                      {!isPaid && (
                        <Button
                          variant="primary"
                          size="sm"
                          className="flex-1"
                          onClick={() => {
                            setToast({ message: 'Payment feature coming soon', type: 'info' });
                          }}
                        >
                          Pay Now
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* Quick Navigation */}
      {invoices.length > 0 && (
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
          <Link href="/appointments">
            <Button variant="secondary" size="lg" className="w-full">
              <Calendar size={20} className="mr-2" />
              View Appointments
            </Button>
          </Link>
        </motion.div>
      )}

      {/* Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass p-6 space-y-3"
      >
        <h3 className="font-semibold text-gold flex items-center gap-2">
          <FileText size={18} />
          About Invoices
        </h3>
        <ul className="text-sm text-platinum/70 space-y-2">
          <li>• Invoices are generated when appointments are marked as complete</li>
          <li>• You can download invoices as PDF for your records</li>
          <li>• Payment functionality will be available soon</li>
          <li>• Keep your payment information updated in your profile</li>
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

