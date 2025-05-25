import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { addReferral } from '../store/slices/referralSlice';
import { generateEmailFile } from '../utils/email';
import ReferralForm from '../components/referral/ReferralForm';
import ScheduleViewer from '../components/referral/ScheduleViewer';
import SuccessModal from '../components/common/SuccessModal';

const Referral = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const dispatch = useDispatch();
  const schedules = useSelector(state => state.referral.schedules);

  const handleSubmit = (formData) => {
    dispatch(addReferral(formData));
    generateEmailFile(formData);
    setShowSuccess(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-tertiary mb-8">Patient Referral</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ReferralForm onSubmit={handleSubmit} schedules={schedules} />
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg h-fit">
              <ScheduleViewer schedules={schedules} />
            </div>
          </div>
        </motion.div>
      </div>

      <SuccessModal 
        show={showSuccess}
        onClose={() => setShowSuccess(false)}
        message="Referral submitted successfully! An email file has been generated for your records."
      />
    </div>
  );
};

export default Referral;