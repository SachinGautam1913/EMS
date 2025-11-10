import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Toast from './Toast';
import { useAppContext } from '../context/AppContext';

/**
 * Main Layout Component
 * Wraps all pages with sidebar, topbar, and toast notifications
 */
const Layout = ({ children }) => {
  const { toast, hideToast } = useAppContext();

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="ml-64 pt-16">
        <Topbar />
        <main className="p-6">{children}</main>
      </div>
      <Toast
        isVisible={toast.isVisible}
        message={toast.message}
        type={toast.type}
        onClose={hideToast}
      />
    </div>
  );
};

export default Layout;

