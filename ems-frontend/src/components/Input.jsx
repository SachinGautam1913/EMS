import React from 'react';

/**
 * Reusable Input Component
 * @param {Object} props
 * @param {string} props.label - Input label
 * @param {string} props.error - Error message to display
 * @param {string} props.helperText - Helper text below input
 * @param {string} props.type - HTML input type
 * @param {string} props.className - Additional CSS classes
 */
const Input = ({
  label,
  error,
  helperText,
  className = '',
  type = 'text',
  id,
  ...props
}) => {
  const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`;
  
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        className={`input ${error ? 'border-red-500 focus:ring-red-500' : ''} ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

export default Input;

