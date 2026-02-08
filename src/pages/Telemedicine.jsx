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
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Online Gynaecologist & Obstetrician Consultation | Virtual Maternity Care Uganda"
        description="Consult with expert gynaecologists and obstetricians online from anywhere in Uganda. Virtual antenatal care, pregnancy consultations, and women's health telemedicine services from Specialist Doctors International, Jinja."
        keywords="online gynaecologist Uganda, virtual obstetrician consultation, telemedicine maternity Uganda, online antenatal consultation Jinja, virtual pregnancy care Uganda, women's health teleconsultation"
        url="https://www.specialistdoctors-international.org/telemedicine"
      />
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-primary to-primary-600 py-16 pt-24">
        <div className="container-corporate text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-body mb-4">
              🩺 Available 24/7
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Virtual Consultation</h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Connect with our specialist doctors from the comfort of your home
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