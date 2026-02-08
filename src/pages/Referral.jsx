import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { addReferral } from '../store/slices/referralSlice';
import { generateEmailFile } from '../utils/email';
import ReferralForm from '../components/referral/ReferralForm';
import ScheduleViewer from '../components/referral/ScheduleViewer';
import SuccessModal from '../components/common/SuccessModal';
import SEO from '../components/SEO';

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
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Book Antenatal & Maternity Appointment | Gynaecologist Referral in Jinja"
        description="Book your antenatal care, maternity, gynaecologist or obstetrician appointment at Specialist Doctors International in Jinja, Uganda. Easy referral process for pregnant mothers and women's health consultations."
        keywords="book antenatal appointment Jinja, maternity referral Uganda, gynaecologist appointment Jinja, obstetrician booking Uganda, pregnancy consultation Jinja, ANC booking Uganda"
        url="https://www.specialistdoctors-international.org/referral"
      />
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-tertiary to-tertiary-dark py-16 pt-24">
        <div className="container-corporate text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Patient Referral</h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Easily refer patients to our specialist doctors for comprehensive care
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-corporate py-12 -mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ReferralForm onSubmit={handleSubmit} schedules={schedules} />
            </div>
            
            <div className="card-elevated p-6 h-fit">
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