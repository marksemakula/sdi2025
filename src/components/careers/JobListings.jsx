import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FaBriefcase, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const JobListings = ({ onSelectPosition }) => {
  const { jobs } = useSelector(state => state.careers);

  if (jobs.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 text-center">
        <h3 className="text-lg font-medium text-gray-700 mb-2">No current job openings</h3>
        <p className="text-gray-500">Please check back later for new opportunities.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-tertiary mb-4">Available Positions</h2>
      {jobs.map((position, index) => (
        <motion.div
          key={position.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-semibold text-tertiary">{position.title}</h2>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mt-2">
                <span className="flex items-center">
                  <FaBriefcase className="mr-1" /> {position.department}
                </span>
                <span className="flex items-center">
                  <FaMapMarkerAlt className="mr-1" /> {position.location}
                </span>
                <span className="flex items-center">
                  <FaClock className="mr-1" /> {position.type}
                </span>
              </div>
            </div>
            <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
              {position.experience || 'Experience varies'}
            </span>
          </div>

          <p className="text-gray-600 mb-4">{position.description}</p>

          {position.requirements && (
            <div className="mb-4">
              <h3 className="font-medium text-gray-700 mb-2">Requirements:</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {Array.isArray(position.requirements) 
                  ? position.requirements.map((req, i) => <li key={i}>{req}</li>)
                  : <li>{position.requirements}</li>}
              </ul>
            </div>
          )}

          <button
            onClick={() => onSelectPosition(position)}
            className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-md transition-colors"
          >
            Apply Now
          </button>
        </motion.div>
      ))}
    </div>
  );
};

export default JobListings;