// src/pages/AdminPanel.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaChartBar, FaCalendarAlt, FaCog, FaBlog, FaBriefcase } from 'react-icons/fa';
import DashboardStats from '../components/admin/DashboardStats';
import PatientRecords from '../components/admin/PatientRecords';
import Analytics from '../components/admin/Analytics';
import AdminSettings from '../components/admin/AdminSettings';
import AdminLogin from '../components/admin/AdminLogin';
import BlogManagement from '../components/admin/BlogManagement';
import JobsManagement from '../components/admin/JobsManagement';

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: FaChartBar },
    { id: 'patients', label: 'Patient Records', icon: FaUsers },
    { id: 'blog', label: 'Blog Management', icon: FaBlog },
    { id: 'jobs', label: 'Jobs Management', icon: FaBriefcase },
    { id: 'analytics', label: 'Analytics', icon: FaCalendarAlt },
    { id: 'settings', label: 'Settings', icon: FaCog },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardStats />;
      case 'patients':
        return <PatientRecords />;
      case 'blog':
        return <BlogManagement />;
      case 'jobs':
        return <JobsManagement />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <AdminSettings />;
      default:
        return <DashboardStats />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="flex border-b overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="mr-2" />
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-6">
              {renderContent()}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPanel;