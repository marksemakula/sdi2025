import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaHeartbeat, FaThermometerHalf, FaNotesMedical } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addPreConsultation } from '../../store/slices/telemedicineSlice';

const PreConsultationForm = ({ onComplete }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    symptoms: '',
    duration: '',
    medicalHistory: '',
    currentMedications: '',
    allergies: '',
    vitals: {
      temperature: '',
      bloodPressure: '',
      heartRate: '',
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('vitals.')) {
      const vitalName = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        vitals: {
          ...prev.vitals,
          [vitalName]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addPreConsultation(formData));
    onComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <h2 className="text-2xl font-semibold text-tertiary mb-6">
        Pre-Consultation Assessment
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Current Symptoms
          </label>
          <textarea
            name="symptoms"
            required
            value={formData.symptoms}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Describe your symptoms..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Duration of Symptoms
          </label>
          <input
            type="text"
            name="duration"
            required
            value={formData.duration}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="e.g., 3 days, 1 week"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <FaThermometerHalf className="mr-2" /> Temperature (°F)
            </label>
            <input
              type="text"
              name="vitals.temperature"
              value={formData.vitals.temperature}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <FaHeartbeat className="mr-2" /> Blood Pressure
            </label>
            <input
              type="text"
              name="vitals.bloodPressure"
              value={formData.vitals.bloodPressure}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="e.g., 120/80"
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <FaHeartbeat className="mr-2" /> Heart Rate (BPM)
            </label>
            <input
              type="text"
              name="vitals.heartRate"
              value={formData.vitals.heartRate}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
            <FaNotesMedical className="mr-2" /> Medical History
          </label>
          <textarea
            name="medicalHistory"
            value={formData.medicalHistory}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="List any relevant medical conditions..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Current Medications
          </label>
          <textarea
            name="currentMedications"
            value={formData.currentMedications}
            onChange={handleChange}
            rows="2"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="List any medications you're currently taking..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Allergies
          </label>
          <input
            type="text"
            name="allergies"
            value={formData.allergies}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="List any allergies..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-md transition-colors"
        >
          Submit Pre-Consultation Form
        </button>
      </form>
    </motion.div>
  );
};

export default PreConsultationForm;