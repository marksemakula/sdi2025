import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaTimes } from 'react-icons/fa';

const SuccessModal = ({ show, onClose, message }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <FaCheckCircle className="text-primary text-2xl mr-2" />
                <h3 className="text-xl font-semibold">Success</h3>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            </div>
            <p className="text-gray-600">{message}</p>
            <button
              onClick={onClose}
              className="mt-6 w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded transition-colors"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessModal;