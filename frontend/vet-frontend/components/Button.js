'use client';

import React from 'react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) {
  const baseStyles = 'font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gold hover:bg-gold-light text-obsidian shadow-glow hover:shadow-glow-lg',
    secondary: 'bg-obsidian-light border border-gold text-gold hover:bg-gold hover:text-obsidian',
    ghost: 'text-gold border border-gold/30 hover:border-gold hover:bg-gold/10',
    danger: 'bg-red-600/30 border border-red-500 text-red-300 hover:bg-red-600/50',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3.5 text-lg',
  };
  
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
