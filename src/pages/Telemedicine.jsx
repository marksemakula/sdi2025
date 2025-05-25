import { useState } from 'react';
import { motion } from 'framer-motion';
import ConsultationRoom from '../components/telemedicine/ConsultationRoom';
import ConsultationQueue from '../components/telemedicine/ConsultationQueue';
import PreConsultationForm from '../components/telemedicine/PreConsultationForm';

const Telemedicine = () => {
  const [consultationStarted, setConsultationStarted] = useState(false);
  const [preConsultationDone, setPreConsultationDone] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-tertiary mb-8">Virtual Consultation</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {!consultationStarted ? (
              <>
                <div className="lg:col-span-2">
                  <PreConsultationForm 
                    onComplete={() => setPreConsultationDone(true)}
                  />
                </div>
                <ConsultationQueue 
                  canJoin={preConsultationDone}
                  onJoin={() => setConsultationStarted(true)}
                />
              </>
            ) : (
              <div className="lg:col-span-3">
                <ConsultationRoom 
                  onEnd={() => setConsultationStarted(false)}
                />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Telemedicine;