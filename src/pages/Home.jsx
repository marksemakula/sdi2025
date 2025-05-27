import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUserMd, FaHospital, FaAmbulance } from 'react-icons/fa';
import HeroCarousel from '../components/HeroCarousel';

const Home = () => {
  const [formData, setFormData] = useState({
    patientName: '',
    referredBy: '',
    serviceNeeded: '',
    phoneNumber: '',
    symptoms: '',
    appointmentDate: '2025-05-27'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const message = `New Appointment Request:
    Patient Name: ${formData.patientName}
    Referred By: ${formData.referredBy || 'Not specified'}
    Service Needed: ${formData.serviceNeeded}
    Phone Number: ${formData.phoneNumber}
    Symptoms: ${formData.symptoms || 'Not specified'}
    Preferred Date: ${formData.appointmentDate}`;

    const whatsappUrl = `https://wa.me/256702652046?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Carousel */}
      <section className="relative h-[600px] overflow-hidden">
        <HeroCarousel />
        
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full flex justify-between items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white max-w-2xl"
            >
              <h1 className="text-5xl font-bold mb-6 [text-shadow:_0_2px_4px_rgba(0,0,0,0.5)]">
                Because we Care
              </h1>
              <p className="text-xl mb-8 [text-shadow:_0_2px_4px_rgba(0,0,0,0.5)]">
                Access specialized healthcare services from leading medical professionals
                at Specialist Doctors International.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="https://www.specialistdoctors-international.org/referral" 
                  className="bg-secondary hover:bg-secondary/90 text-white px-8 py-3 rounded-md font-medium text-center transition-colors [text-shadow:_0_1px_2px_rgba(0,0,0,0.3)]"
                >
                  Make a Referral
                </a>
                <a 
                  href="https://www.specialistdoctors-international.org/telemedicine"
                  className="bg-white hover:bg-gray-100 text-tertiary px-8 py-3 rounded-md font-medium text-center transition-colors [text-shadow:_0_1px_2px_rgba(0,0,0,0.1)]"
                >
                  Virtual Consultation
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:block relative z-20 -ml-8"
              style={{ width: 'calc(256px * 1.62)' }}
            >
              <div className="relative w-full h-full">
                <img 
                  src="/images/SDI_Logo.png" 
                  alt="" 
                  aria-hidden="true"
                  className="absolute w-full h-auto blur-sm opacity-80"
                  style={{
                    filter: 'brightness(0)',
                    transform: 'translate(2px, 2px)'
                  }}
                />
                <img 
                  src="/images/SDI_Logo.png" 
                  alt="SDI Logo" 
                  className="w-full h-auto relative drop-shadow-[0_2px_4px_rgba(255,255,255,0.3)]"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Appointment Booking Form */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 rounded-lg shadow-[0_0_25px_rgba(0,0,0,0.15)] relative"
          >
            <div className="absolute inset-0 rounded-lg shadow-[0_0_25px_rgba(0,0,0,0.15)] -z-10"></div>
            
            <h2 className="text-3xl mb-8 text-center relative">
              <span className="font-cinzel font-thin text-primary relative">
                BOOK
                <span 
                  className="absolute bottom-0 left-1 h-1 bg-secondary"
                  style={{ 
                    width: 'calc(100% - 0.5rem)',
                    transform: 'translateY(4px)'
                  }}
                ></span>
              </span>{' '}
              <span className="font-cinzel font-thin text-tertiary">APPOINTMENT</span>
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2 font-urbanist">Patient name</h3>
                    <input 
                      type="text" 
                      name="patientName"
                      value={formData.patientName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent font-urbanist"
                      placeholder="Enter patient name"
                      required
                    />
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2 font-urbanist">Referred by? name / contact</h3>
                    <input 
                      type="text"
                      name="referredBy"
                      value={formData.referredBy}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent font-urbanist"
                      placeholder="Referrer name or contact"
                    />
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2 font-urbanist">Service needed</h3>
                    <select 
                      name="serviceNeeded"
                      value={formData.serviceNeeded}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent font-urbanist"
                      required
                    >
                      <option value="">Select a service</option>
                      <option value="Consultation">Consultation</option>
                      <option value="Scan">Scan</option>
                      <option value="Lab Test">ANC</option>
                      <option value="Lab Test">Dental</option>
                      <option value="Lab Test">Physiotherapy</option>
                      <option value="Lab Test">Lab Test</option>
                      <option value="Surgery">Surgery</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2 font-urbanist">Phone number</h3>
                    <input 
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent font-urbanist"
                      placeholder="XXXXXXXXXX"
                      required
                    />
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2 font-urbanist">Symptoms</h3>
                    <input
                      type="text"
                      name="symptoms"
                      value={formData.symptoms}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent font-urbanist"
                      placeholder="Describe symptoms"
                    />
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2 font-urbanist">Choose date</h3>
                    <input 
                      type="date" 
                      name="appointmentDate"
                      value={formData.appointmentDate}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent font-urbanist"
                      required
                    />
                  </div>
                </div>
                
                <div className="pt-4">
                  <button 
                    type="submit"
                    className="w-full md:w-auto mx-auto block bg-primary hover:bg-primary/90 text-white py-3 px-12 rounded-md font-medium transition-colors font-urbanist"
                  >
                    SUBMIT NOW
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center mb-12"
          >
            Our Services
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: FaUserMd,
                image: "/images/services/specialist-consultations.jpg",
                title: "Specialist Consultations",
                description: "Access to leading medical specialists across various disciplines"
              },
              {
                icon: FaHospital,
                image: "/images/services/advanced-facilities.jpg",
                title: "Advanced Facilities",
                description: "State-of-the-art medical facilities and equipment"
              },
              {
                icon: FaAmbulance,
                image: "/images/services/emergency-care.jpg",
                title: "Emergency Care",
                description: "24/7 emergency medical services and support"
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-6">
                  <service.icon className="text-primary text-4xl mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;