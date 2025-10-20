'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { apiGet, apiPost } from '../../lib/api';
import { motion } from 'framer-motion';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import Toast from '../../components/Toast';
import Skeleton from '../../components/Skeleton';
import EmptyState from '../../components/EmptyState';
import Badge from '../../components/Badge';
import { Heart, Plus, Calendar, ArrowLeft, FileText } from 'lucide-react';

export default function PetsPage() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    breed: '',
    dob: '',
  });

  const ownerId = typeof window !== 'undefined' ? localStorage.getItem('ownerId') : null;

  // Fetch pets
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const allPets = await apiGet('/api/pets');
        const ownerPets = allPets.filter(p => String(p.owner_id) === String(ownerId));
        setPets(ownerPets);
      } catch (err) {
        setToast({ message: 'Failed to load pets', type: 'error' });
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (ownerId) {
      fetchPets();
    }
  }, [ownerId]);

  // Calculate age from DOB
  const calculateAge = (dob) => {
    if (!dob) return '?';
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Handle add pet
  const handleAddPet = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.species || !formData.breed || !formData.dob) {
      setToast({ message: 'Please fill in all fields', type: 'error' });
      return;
    }

    try {
      const newPet = await apiPost('/api/pets', {
        ...formData,
        owner_id: String(ownerId),
      });

      setPets([...pets, newPet]);
      setToast({ message: 'Pet added successfully!', type: 'success' });
      setIsModalOpen(false);
      setFormData({ name: '', species: '', breed: '', dob: '' });
    } catch (err) {
      setToast({ message: 'Failed to add pet: ' + err.message, type: 'error' });
    }
  };

  const speciesOptions = ['Dog', 'Cat', 'Rabbit', 'Bird', 'Hamster', 'Guinea Pig', 'Other'];

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
          <h1 className="text-4xl font-display font-bold mb-2">My Pets</h1>
          <p className="text-platinum/60">Manage your beloved companions</p>
        </div>
        <Button
          variant="primary"
          size="lg"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={20} className="inline mr-2" />
          Add Pet
        </Button>
      </motion.div>

      {/* Pets Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="glass-light p-6">
              <Skeleton count={3} />
            </div>
          ))}
        </div>
      ) : pets.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="No Pets Yet"
          description="Start by adding your first pet to manage appointments and invoices"
          actionLabel="Add First Pet"
          onAction={() => setIsModalOpen(true)}
        />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {pets.map((pet, idx) => {
            const age = calculateAge(pet.dob);
            const speciesEmoji = {
              Dog: '🐕',
              Cat: '🐈',
              Rabbit: '🐰',
              Bird: '🦜',
              Hamster: '🐹',
              'Guinea Pig': '🐹',
              Other: '🐾',
            };
            const emoji = speciesEmoji[pet.species] || '🐾';

            return (
              <motion.div
                key={pet.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card>
                  <div className="space-y-4">
                    {/* Pet Header */}
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-2xl font-display font-bold mb-1">
                          {emoji} {pet.name}
                        </h3>
                        <p className="text-platinum/60 text-sm">ID: #{pet.id}</p>
                      </div>
                    </div>

                    {/* Pet Info */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-platinum/60 text-sm">Species</span>
                        <Badge variant="default" size="sm">
                          {pet.species}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-platinum/60 text-sm">Breed</span>
                        <span className="font-medium">{pet.breed}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-platinum/60 text-sm">Age</span>
                        <span className="font-medium text-gold">{age} years</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-platinum/60 text-sm">DOB</span>
                        <span className="font-medium text-sm">
                          {new Date(pet.dob).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="divider-gold" />

                    {/* Action Button */}
                    <Link href="/appointments/book" className="w-full">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gold/10 border border-gold/30 text-gold hover:bg-gold/20 transition-all"
                      >
                        <Calendar size={16} />
                        Book Appointment
                      </motion.button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* Quick Navigation */}
      {pets.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <Link href="/appointments">
            <Button variant="secondary" size="lg" className="w-full">
              <Calendar size={20} className="mr-2" />
              View My Appointments
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

      {/* Add Pet Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Pet"
        size="md"
      >
        <form onSubmit={handleAddPet} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-platinum">
              Pet Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Max, Whiskers"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-platinum">
              Species *
            </label>
            <select
              value={formData.species}
              onChange={(e) => setFormData({ ...formData, species: e.target.value })}
              required
            >
              <option value="">Select a species</option>
              {speciesOptions.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-platinum">
              Breed *
            </label>
            <input
              type="text"
              value={formData.breed}
              onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
              placeholder="e.g., Golden Retriever"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-platinum">
              Date of Birth *
            </label>
            <input
              type="date"
              value={formData.dob}
              onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="ghost"
              className="flex-1"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="flex-1"
            >
              Add Pet
            </Button>
          </div>
        </form>
      </Modal>

      <Toast
        message={toast?.message}
        type={toast?.type}
        onClose={() => setToast(null)}
      />
    </div>
  );
}

