'use client';

export default function Skeleton({ 
  count = 1, 
  height = 'h-4', 
  width = 'w-full',
  className = '',
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`skeleton ${height} ${width}`}
        />
      ))}
    </div>
  );
}
