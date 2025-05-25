import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSave, FaBell, FaLock, FaUserCog } from 'react-icons/fa';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    autoBackup: true,
    twoFactorAuth: false,
    sessionTimeout: '30',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save settings to localStorage
    localStorage.setItem('adminSettings', JSON.stringify(settings));
    alert('Settings saved successfully');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <FaBell className="mr-2 text-primary" />
            Notifications
          </h3>
          <div className="space-y-4">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="emailNotifications"
                checked={settings.emailNotifications}
                onChange={handleChange}
                className="form-checkbox h-5 w-5 text-primary rounded"
              />
              <span>Email Notifications</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="autoBackup"
                checked={settings.autoBackup}
                onChange={handleChange}
                className="form-checkbox h-5 w-5 text-primary rounded"
              />
              <span>Automatic Data Backup</span>
            </label>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <FaLock className="mr-2 text-primary" />
            Security
          </h3>
          <div className="space-y-4">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="twoFactorAuth"
                checked={settings.twoFactorAuth}
                onChange={handleChange}
                className="form-checkbox h-5 w-5 text-primary rounded"
              />
              <span>Two-Factor Authentication</span>
            </label>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Session Timeout (minutes)
              </label>
              <select
                name="sessionTimeout"
                value={settings.sessionTimeout}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary rounded-md"
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="120">2 hours</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <FaUserCog className="mr-2 text-primary" />
            Account Settings
          </h3>
          <div className="space-y-4">
            <button
              type="button"
              className="text-red-600 hover:text-red-700 font-medium"
            >
              Reset Password
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
          >
            <FaSave className="mr-2" />
            Save Settings
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default AdminSettings;