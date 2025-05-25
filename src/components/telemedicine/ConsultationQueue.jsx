import { motion } from 'framer-motion';
import { FaUserMd, FaClock } from 'react-icons/fa';

const ConsultationQueue = ({ canJoin, onJoin }) => {
  const queuePosition = 2; // Mock queue position
  const estimatedWait = '5-10 minutes';

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <h3 className="text-xl font-semibold text-tertiary mb-6">Queue Status</h3>

      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="bg-primary/10 p-3 rounded-full">
            <FaUserMd className="text-primary text-xl" />
          </div>
          <div>
            <div className="text-sm text-gray-600">Position in Queue</div>
            <div className="text-2xl font-bold text-gray-800">#{queuePosition}</div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="bg-primary/10 p-3 rounded-full">
            <FaClock className="text-primary text-xl" />
          </div>
          <div>
            <div className="text-sm text-gray-600">Estimated Wait Time</div>
            <div className="text-2xl font-bold text-gray-800">{estimatedWait}</div>
          </div>
        </div>

        <div className="p-4 bg-tertiary/10 rounded-lg">
          <h4 className="font-medium text-tertiary mb-2">Available Doctors</h4>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>• Dr. Sarah Johnson - Cardiologist</li>
            <li>• Dr. Michael Chen - General Medicine</li>
            <li>• Dr. Emily Brown - Pediatrician</li>
          </ul>
        </div>

        <button
          onClick={onJoin}
          disabled={!canJoin}
          className={`w-full py-3 px-6 rounded-md font-medium transition-colors ${
            canJoin
              ? 'bg-primary hover:bg-primary/90 text-white'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          {canJoin ? 'Join Consultation' : 'Complete Pre-Consultation First'}
        </button>
      </div>
    </motion.div>
  );
};

export default ConsultationQueue;