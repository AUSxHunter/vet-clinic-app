'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({
  message,
  type = 'info',
  duration = 4000,
  onClose,
}) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const styles = {
    success: {
      icon: CheckCircle,
      bg: 'bg-green-500/10',
      border: 'border-green-500/30',
      text: 'text-green-300',
      progress: 'bg-green-500',
    },
    error: {
      icon: AlertCircle,
      bg: 'bg-red-500/10',
      border: 'border-red-500/30',
      text: 'text-red-300',
      progress: 'bg-red-500',
    },
    info: {
      icon: Info,
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
      text: 'text-blue-300',
      progress: 'bg-blue-500',
    },
  };

  const style = styles[type];
  const IconComponent = style.icon;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className={`fixed bottom-6 right-6 max-w-sm ${style.bg} border ${style.border} rounded-lg p-4 ${style.text} backdrop-blur-lg z-[60]`}
      >
        <div className="flex items-start gap-3">
          <IconComponent size={20} className="mt-1 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="text-current/50 hover:text-current transition-colors flex-shrink-0"
          >
            <X size={18} />
          </button>
        </div>
        <motion.div
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={{ duration: duration / 1000, ease: 'linear' }}
          className={`absolute bottom-0 left-0 right-0 h-1 ${style.progress} origin-left rounded-b-lg`}
        />
      </motion.div>
    </AnimatePresence>
  );
}
