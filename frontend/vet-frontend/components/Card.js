'use client';

import { motion } from 'framer-motion';

export default function Card({
  children,
  className = '',
  hoverEffect = true,
  onClick,
  ...props
}) {
  return (
    <motion.div
      whileHover={hoverEffect ? { scale: 1.01, y: -4 } : undefined}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={`glass-light p-6 transition-all duration-300 ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
