'use client';

import React from 'react';
import Button from './Button';

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {Icon && (
        <div className="mb-4 p-3 glass rounded-full">
          <Icon size={40} className="text-gold" />
        </div>
      )}
      <h3 className="text-xl font-display text-center mb-2">{title}</h3>
      <p className="text-center text-platinum/60 mb-6 max-w-sm">{description}</p>
      {actionLabel && (
        <Button 
          variant="primary" 
          onClick={onAction}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
