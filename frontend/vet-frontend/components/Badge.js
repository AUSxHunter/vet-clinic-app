'use client';

export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}) {
  const variants = {
    default: 'bg-gold/10 text-gold border border-gold/30',
    success: 'bg-green-500/10 text-green-300 border border-green-500/30',
    warning: 'bg-yellow-500/10 text-yellow-300 border border-yellow-500/30',
    danger: 'bg-red-500/10 text-red-300 border border-red-500/30',
    scheduled: 'bg-blue-500/10 text-blue-300 border border-blue-500/30',
    done: 'bg-green-500/10 text-green-300 border border-green-500/30',
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <span
      className={`inline-flex items-center font-semibold rounded-full ${
        variants[variant]
      } ${sizes[size]} ${className}`}
    >
      {children}
    </span>
  );
}
