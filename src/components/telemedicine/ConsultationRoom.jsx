import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaVideo, FaMicrophone, FaComments, FaTimes, FaPaperPlane } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import ChatInterface from './ChatInterface';

const ConsultationRoom = ({ onEnd }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(true);
  const preConsultation = useSelector(state => state.telemedicine.currentConsultation);

  useEffect(() => {
    // Simulate connection delay
    const timer = setTimeout(() => {
      setIsConnecting(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleEndConsultation = () => {
    if (window.confirm('Are you sure you want to end the consultation?')) {
      onEnd();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="h-[600px] relative">
        {isConnecting ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-gray-900 flex items-center justify-center"
          >
            <div className="text-center text-white">
              <div className="mb-4">Connecting to your doctor...</div>
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Mock Video Interface */}
            <div className="relative h-full bg-gray-900">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-center">
                  <FaVideo className="text-6xl mb-4 mx-auto" />
                  <h3 className="text-xl">Dr. Sarah Johnson</h3>
                  <p className="text-gray-400">Cardiologist</p>
                </div>
              </div>

              {/* Patient Video Preview */}
              <div className="absolute bottom-4 right-4 w-48 h-36 bg-gray-800 rounded-lg">
                <div className="absolute inset-0 flex items-center justify-center">
                  <FaVideo className="text-gray-600 text-2xl" />
                </div>
              </div>

              {/* Controls */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50">
                <div className="flex items-center justify-center space-x-4">
                  <button className="p-4 rounded-full bg-gray-800 text-white hover:bg-gray-700">
                    <FaVideo />
                  </button>
                  <button className="p-4 rounded-full bg-gray-800 text-white hover:bg-gray-700">
                    <FaMicrophone />
                  </button>
                  <button
                    onClick={() => setIsChatOpen(!isChatOpen)}
                    className="p-4 rounded-full bg-gray-800 text-white hover:bg-gray-700"
                  >
                    <FaComments />
                  </button>
                  <button
                    onClick={handleEndConsultation}
                    className="p-4 rounded-full bg-red-600 text-white hover:bg-red-700"
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>
            </div>

            {/* Chat Interface */}
            <AnimatePresence>
              {isChatOpen && (
                <motion.div
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 300, opacity: 0 }}
                  className="absolute top-0 right-0 bottom-0 w-80 bg-white shadow-lg"
                >
                  <ChatInterface onClose={() => setIsChatOpen(false)} />
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  );
};

export default ConsultationRoom;