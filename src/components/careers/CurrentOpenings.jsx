import { motion } from 'framer-motion';
import { FaBriefcase, FaUserMd, FaHospital } from 'react-icons/fa';

const stats = [
  { icon: FaBriefcase, label: 'Open Positions', value: '15+' },
  { icon: FaUserMd, label: 'Medical Specialties', value: '12' },
  { icon: FaHospital, label: 'Locations', value: '5' },
];

const CurrentOpenings = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold text-tertiary mb-6">Quick Stats</h3>
      
      <div className="space-y-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-center space-x-4"
          >
            <div className="bg-primary/10 p-3 rounded-full">
              <stat.icon className="text-primary text-xl" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-tertiary/10 rounded-lg">
        <h4 className="font-medium text-tertiary mb-2">Why Join Us?</h4>
        <ul className="text-sm text-gray-600 space-y-2">
          <li>• Competitive compensation</li>
          <li>• Advanced medical facilities</li>
          <li>• Professional development</li>
          <li>• Work-life balance</li>
        </ul>
      </div>
    </div>
  );
};

export default CurrentOpenings;