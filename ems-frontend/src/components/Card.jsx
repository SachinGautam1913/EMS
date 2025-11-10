import React from 'react';

/**
 * Reusable Card Component
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.title - Optional card title
 * @param {React.ReactNode} props.header - Optional header content
 * @param {React.ReactNode} props.footer - Optional footer content
 */
const Card = ({ children, className = '', title, header, footer, ...props }) => {
  return (
    <div className={`card ${className}`} {...props}>
      {(title || header) && (
        <div className="mb-4 pb-4 border-b border-gray-200">
          {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
          {header && <div>{header}</div>}
        </div>
      )}
      <div>{children}</div>
      {footer && (
        <div className="mt-4 pt-4 border-t border-gray-200">{footer}</div>
      )}
    </div>
  );
};

export default Card;

