import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUserMd, FaBriefcase } from 'react-icons/fa';
import JobListings from '../components/careers/JobListings';
import ApplicationForm from '../components/careers/ApplicationForm';
import CurrentOpenings from '../components/careers/CurrentOpenings';

const Careers = () => {
  const [selectedPosition, setSelectedPosition] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-tertiary mb-4">Medical Staff Careers</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join our team of dedicated healthcare professionals at Specialist Doctors International.
              We offer exceptional opportunities for career growth and development.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {selectedPosition ? (
                <ApplicationForm 
                  position={selectedPosition}
                  onBack={() => setSelectedPosition(null)}
                />
              ) : (
                <JobListings onSelectPosition={setSelectedPosition} />
              )}
            </div>

            <div>
              <CurrentOpenings />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Careers;