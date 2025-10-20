'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { apiGet, apiPost } from '../lib/api';
import Button from '../components/Button';
import Toast from '../components/Toast';
import Skeleton from '../components/Skeleton';
import { Heart, Search, Plus } from 'lucide-react';

export default function Welcome() {
  const router = useRouter();
  const [step, setStep] = useState('method'); // 'method', 'search', 'create'
  const [owners, setOwners] = useState([]);
  const [filteredOwners, setFilteredOwners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchEmail, setSearchEmail] = useState('');
  const [toast, setToast] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  // Fetch all owners on mount
  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const data = await apiGet('/api/owners');
        setOwners(data);
      } catch (err) {
        console.error('Failed to fetch owners:', err);
      }
    };
    fetchOwners();
  }, []);

  // Search owners by email
  const handleSearch = () => {
    if (!searchEmail.trim()) {
      setToast({ message: 'Please enter an email', type: 'error' });
      return;
    }
    
    const matches = owners.filter(o =>
      o.email.toLowerCase().includes(searchEmail.toLowerCase())
    );
    
    if (matches.length === 0) {
      setToast({ message: 'No owners found. You can create a new profile instead.', type: 'info' });
    } else {
      setFilteredOwners(matches);
    }
  };

  // Select existing owner
  const handleSelectOwner = (owner) => {
    localStorage.setItem('ownerId', owner.id);
    localStorage.setItem('ownerName', owner.name);
    router.push('/dashboard');
  };

  // Create new owner
  const handleCreateOwner = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone) {
      setToast({ message: 'Please fill in all fields', type: 'error' });
      return;
    }

    setLoading(true);
    try {
      const newOwner = await apiPost('/api/owners', formData);
      setToast({ message: 'Profile created successfully!', type: 'success' });
      
      setTimeout(() => {
        localStorage.setItem('ownerId', newOwner.id);
        localStorage.setItem('ownerName', newOwner.name);
        router.push('/dashboard');
      }, 1500);
    } catch (err) {
      setToast({ message: 'Failed to create profile: ' + err.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex justify-center mb-4">
            <div className="p-3 glass rounded-full">
              <Heart size={48} className="text-gold" />
            </div>
          </div>
          <h1 className="text-5xl font-display font-bold mb-2 text-gradient">
            VETCARE
          </h1>
          <p className="text-platinum/60 text-lg">
            Your Pet Owner Portal
          </p>
        </div>

        {/* Main Content */}
        <div className="glass-light p-8 md:p-12 space-y-8">
          {step === 'method' && (
            <div className="space-y-6 animate-slide-up">
              <h2 className="text-2xl font-display text-center">Welcome Back!</h2>
              <p className="text-center text-platinum/70">
                Manage your pets, book appointments, and view invoices all in one place.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={() => {
                    setStep('search');
                    setSearchEmail('');
                    setFilteredOwners([]);
                  }}
                >
                  <Search className="inline mr-2" size={20} />
                  Find My Profile
                </Button>
                
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full"
                  onClick={() => setStep('create')}
                >
                  <Plus className="inline mr-2" size={20} />
                  Create New Profile
                </Button>
              </div>
            </div>
          )}

          {step === 'search' && (
            <div className="space-y-6 animate-slide-up">
              <button
                onClick={() => {
                  setStep('method');
                  setFilteredOwners([]);
                }}
                className="text-gold/70 hover:text-gold text-sm transition-colors mb-2"
              >
                ← Back
              </button>

              <h2 className="text-2xl font-display">Find Your Profile</h2>
              
              <div className="space-y-3">
                <label className="block text-sm font-medium text-platinum">
                  Enter your email address
                </label>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={searchEmail}
                    onChange={(e) => setSearchEmail(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="your@email.com"
                    className="flex-1"
                  />
                  <Button
                    variant="primary"
                    onClick={handleSearch}
                  >
                    Search
                  </Button>
                </div>
              </div>

              {filteredOwners.length > 0 && (
                <div className="space-y-3 pt-4">
                  <p className="text-sm text-platinum/60">
                    Found {filteredOwners.length} profile(s):
                  </p>
                  {filteredOwners.map(owner => (
                    <button
                      key={owner.id}
                      onClick={() => handleSelectOwner(owner)}
                      className="w-full glass-light p-4 text-left hover:border-gold transition-all"
                    >
                      <div className="font-semibold text-gold">{owner.name}</div>
                      <div className="text-sm text-platinum/60">{owner.email}</div>
                    </button>
                  ))}
                </div>
              )}

              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full divider-gold" />
                </div>
                <div className="relative flex justify-center">
                  <span className="px-3 bg-obsidian text-platinum/60 text-sm">
                    or
                  </span>
                </div>
              </div>

              <Button
                variant="secondary"
                size="md"
                className="w-full"
                onClick={() => setStep('create')}
              >
                Create New Profile Instead
              </Button>
            </div>
          )}

          {step === 'create' && (
            <form onSubmit={handleCreateOwner} className="space-y-6 animate-slide-up">
              <button
                type="button"
                onClick={() => setStep('method')}
                className="text-gold/70 hover:text-gold text-sm transition-colors mb-2"
              >
                ← Back
              </button>

              <h2 className="text-2xl font-display">Create Your Profile</h2>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-platinum">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-platinum">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-platinum">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Creating Profile...' : 'Create Profile'}
              </Button>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-platinum/50 text-sm">
          <p>Your information is secure and private</p>
        </div>
      </div>

      <Toast
        message={toast?.message}
        type={toast?.type}
        onClose={() => setToast(null)}
      />
    </main>
  );
}

