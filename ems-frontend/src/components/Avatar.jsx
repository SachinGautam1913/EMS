import React from 'react';
import { User } from 'lucide-react';

/**
 * Avatar Component
 * @param {Object} props
 * @param {string} props.src - Image source URL
 * @param {string} props.alt - Alt text
 * @param {string} props.name - Name for initials fallback
 * @param {string} props.size - 'sm' | 'md' | 'lg' | 'xl'
 * @param {string} props.className - Additional CSS classes
 */
const Avatar = ({ src, alt, name, size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
  };

  const getInitials = (name) => {
    if (!name) return '';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-semibold overflow-hidden ${className}`}
    >
      {src ? (
        <img src={src} alt={alt || name} className="w-full h-full object-cover" />
      ) : name ? (
        getInitials(name)
      ) : (
        <User size={size === 'sm' ? 16 : size === 'lg' ? 24 : size === 'xl' ? 32 : 20} />
      )}
    </div>
  );
};

export default Avatar;

