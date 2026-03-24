import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUserMd, FaBriefcase } from 'react-icons/fa';
import JobListings from '../components/careers/JobListings';
import ApplicationForm from '../components/careers/ApplicationForm';
import CurrentOpenings from '../components/careers/CurrentOpenings';
import SEO from '../components/SEO';
import Breadcrumb from '../components/Breadcrumb';

const Careers = () => {
  const [selectedPosition, setSelectedPosition] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Medical Careers | Gynaecologist & Obstetrician Jobs in Jinja, Uganda"
        description="Join Specialist Doctors International in Jinja, Uganda. Career opportunities for gynaecologists, obstetricians, midwives, and maternity care specialists. Apply now to work with leading healthcare professionals."
        keywords="gynaecologist jobs Uganda, obstetrician careers Jinja, midwife jobs Uganda, maternity nurse jobs Jinja, healthcare careers Uganda, medical jobs Jinja"
        url="https://www.specialistdoctors-international.org/careers"
      />
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-secondary to-secondary-dark py-16 pt-24">
        <div className="container-corporate text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-body mb-4">
              💼 Join Our Team
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Medical Careers</h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Join our team of dedicated healthcare professionals and make a difference in people's lives
            </p>
          </motion.div>
        </div>
      </div>

      <Breadcrumb items={[{ name: 'Medical Careers', url: '/careers' }]} />

      <div className="container-corporate py-12 -mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {selectedPosition ? (
                <ApplicationForm 
                  position={selectedPosition}
                  onBack={() => setSelectedPosition(null)}
                />
              ) : (
                <JobListings onSelectPosition={setSelectedPosition} />
              )}
            </div>

            <div>
              <CurrentOpenings />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Careers;