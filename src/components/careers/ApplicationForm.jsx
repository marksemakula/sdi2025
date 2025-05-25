import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaUpload } from 'react-icons/fa';
import { addApplication } from '../../store/slices/careersSlice';

const ApplicationForm = ({ position, onBack }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    experience: '',
    certifications: '',
    coverLetter: '',
    resume: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'resume' && files) {
      const file = files[0];
      setFormData(prev => ({
        ...prev,
        resume: file
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Convert resume to base64 for storage
    if (formData.resume) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const application = {
          ...formData,
          position: position.title,
          resume: e.target.result,
          applicationDate: new Date().toISOString()
        };
        dispatch(addApplication(application));
        onBack();
      };
      reader.readAsDataURL(formData.resume);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <button
        onClick={onBack}
        className="flex items-center text-gray-600 hover:text-tertiary mb-6"
      >
        <FaArrowLeft className="mr-2" /> Back to Listings
      </button>

      <h2 className="text-2xl font-semibold text-tertiary mb-6">
        Apply for {position.title}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Years of Experience
          </label>
          <input
            type="number"
            name="experience"
            required
            min="0"
            value={formData.experience}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Certifications
          </label>
          <textarea
            name="certifications"
            required
            value={formData.certifications}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="List your relevant certifications..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cover Letter
          </label>
          <textarea
            name="coverLetter"
            required
            value={formData.coverLetter}
            onChange={handleChange}
            rows="5"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Tell us why you're the perfect fit..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Resume
          </label>
          <div className="flex items-center">
            <label className="flex items-center px-4 py-2 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200">
              <FaUpload className="mr-2" />
              <span>{formData.resume ? formData.resume.name : 'Upload Resume'}</span>
              <input
                type="file"
                name="resume"
                accept=".pdf,.doc,.docx"
                onChange={handleChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-md transition-colors"
        >
          Submit Application
        </button>
      </form>
    </motion.div>
  );
};

export default ApplicationForm;