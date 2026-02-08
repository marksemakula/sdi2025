import { useState } from 'react';
import { motion } from 'framer-motion';
import ConsultationRoom from '../components/telemedicine/ConsultationRoom';
import ConsultationQueue from '../components/telemedicine/ConsultationQueue';
import PreConsultationForm from '../components/telemedicine/PreConsultationForm';
import SEO from '../components/SEO';

const Telemedicine = () => {
  const [consultationStarted, setConsultationStarted] = useState(false);
  const [preConsultationDone, setPreConsultationDone] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <SEO 
        title="Online Gynaecologist & Obstetrician Consultation | Virtual Maternity Care Uganda"
        description="Consult with expert gynaecologists and obstetricians online from anywhere in Uganda. Virtual antenatal care, pregnancy consultations, and women's health telemedicine services from Specialist Doctors International, Jinja."
        keywords="online gynaecologist Uganda, virtual obstetrician consultation, telemedicine maternity Uganda, online antenatal consultation Jinja, virtual pregnancy care Uganda, women's health teleconsultation"
        url="https://www.specialistdoctors-international.org/telemedicine"
      />
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