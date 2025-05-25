import { motion } from 'framer-motion';
import { FaBriefcase, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const positions = [
  {
    id: 1,
    title: "Senior Cardiologist",
    department: "Cardiology",
    location: "Main Medical Center",
    type: "Full-time",
    experience: "5+ years",
    description: "Looking for an experienced cardiologist to join our heart center team...",
    requirements: [
      "Board certification in Cardiology",
      "5+ years of clinical experience",
      "Strong research background",
      "Excellent patient care skills"
    ]
  },
  {
    id: 2,
    title: "Pediatric Specialist",
    department: "Pediatrics",
    location: "Children's Wing",
    type: "Full-time",
    experience: "3+ years",
    description: "Seeking a dedicated pediatric specialist to provide comprehensive care...",
    requirements: [
      "Board certification in Pediatrics",
      "3+ years of pediatric experience",
      "Strong communication skills",
      "Experience with complex cases"
    ]
  },
  // Add more positions as needed
];

const JobListings = ({ onSelectPosition }) => {
  return (
    <div className="space-y-6">
      {positions.map((position, index) => (
        <motion.div
          key={position.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-white rounded-lg shadow-lg p-6"
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
          </div>

          <p className="text-gray-600 mb-4">{position.description}</p>

          <div className="mb-4">
            <h3 className="font-medium text-gray-700 mb-2">Requirements:</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {position.requirements.map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
          </div>

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