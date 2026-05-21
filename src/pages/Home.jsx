import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUserMd, FaHospital, FaAmbulance } from 'react-icons/fa';
import HeroCarousel from '../components/HeroCarousel';
import SEO from '../components/SEO';

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
      <SEO
        title="Best Maternity & Antenatal Care in Jinja, Uganda | Gynaecologist & Obstetrician"
        description="Specialist Doctors International offers the best maternity care, antenatal services, gynaecologist and obstetrician consultations in Jinja, Uganda. Expert prenatal care, safe deliveries, and comprehensive women's health services. Book your appointment today!"
        keywords="maternity hospital Jinja, best antenatal care Uganda, gynaecologist near me Jinja, obstetrician Uganda, pregnancy care Jinja, safe delivery Uganda, ANC clinic Jinja, women's health specialist Uganda, prenatal checkup Jinja, fertility clinic Uganda"
        url="https://www.specialistdoctors-international.org/"
      />
      {/* Hero Section with Carousel - starts at top behind navbar */}
      <section className="relative h-[700px] overflow-hidden -mt-[72px]">
        <HeroCarousel />

        <div className="relative z-10 h-full flex items-center pt-16">
          <div className="max-w-7xl mx-auto px-4 w-full flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white max-w-2xl"
            >
              <span className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-body mb-4">
                🏥 Premier Healthcare in Jinja, Uganda
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-display leading-tight"
                style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                Because We Care
              </h1>
              <p className="text-lg md:text-xl mb-8 font-body opacity-95 leading-relaxed"
                style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
                Access specialized maternity, antenatal, and women's healthcare services
                from leading gynaecologists and obstetricians.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/referral"
                  className="btn-secondary text-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                >
                  Make a Referral
                </a>
                <a
                  href="/telemedicine"
                  className="btn bg-white/95 hover:bg-white text-tertiary shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
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
      <section className="section bg-gradient-to-b from-white to-gray-50">
        <div className="container-corporate">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="card-elevated p-8 md:p-10"
          >
            <div className="section-header mb-8">
              <h2 className="section-title">
                <span className="text-primary">Book</span>{' '}
                <span className="text-tertiary">Appointment</span>
              </h2>
              <p className="section-subtitle text-base">
                Schedule your consultation with our specialist doctors today
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="form-group">
                    <label className="label">Patient Name</label>
                    <input
                      type="text"
                      name="patientName"
                      value={formData.patientName}
                      onChange={handleChange}
                      className="input"
                      placeholder="Enter patient name"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="label">Referred By (Optional)</label>
                    <input
                      type="text"
                      name="referredBy"
                      value={formData.referredBy}
                      onChange={handleChange}
                      className="input"
                      placeholder="Referrer name or contact"
                    />
                  </div>

                  <div className="form-group">
                    <label className="label">Service Needed</label>
                    <select
                      name="serviceNeeded"
                      value={formData.serviceNeeded}
                      onChange={handleChange}
                      className="select"
                      required
                    >
                      <option value="">Select a service</option>
                      <option value="Consultation">Specialist Consultation</option>
                      <option value="Antenatal">Antenatal Care (ANC)</option>
                      <option value="Maternity">Maternity Services</option>
                      <option value="Gynaecology">Gynaecology</option>
                      <option value="Scan">Ultrasound Scan</option>
                      <option value="Dental">Dental</option>
                      <option value="Physiotherapy">Physiotherapy</option>
                      <option value="Lab Test">Lab Test</option>
                      <option value="Surgery">Surgery</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="form-group">
                    <label className="label">Phone Number</label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="input"
                      placeholder="+256 XXX XXX XXX"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="label">Symptoms (Optional)</label>
                    <input
                      type="text"
                      name="symptoms"
                      value={formData.symptoms}
                      onChange={handleChange}
                      className="input"
                      placeholder="Describe symptoms briefly"
                    />
                  </div>

                  <div className="form-group">
                    <label className="label">Preferred Date</label>
                    <input
                      type="date"
                      name="appointmentDate"
                      value={formData.appointmentDate}
                      onChange={handleChange}
                      className="input"
                      required
                    />
                  </div>
                </div>

                <div className="pt-6 text-center">
                  <button
                    type="submit"
                    className="btn-primary px-12 py-3.5 text-base"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section bg-white">
        <div className="container-corporate">
          <div className="section-header">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="section-title"
            >
              Our Services
            </motion.h2>
            <p className="section-subtitle">
              Comprehensive healthcare solutions tailored to your needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: FaUserMd,
                image: "/images/services/Dr.Namala_Angella.jpeg",
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
                className="card group cursor-pointer"
              >
                <div className="h-52 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="p-6">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                    <service.icon className="text-primary text-2xl group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 font-display text-gray-900">{service.title}</h3>
                  <p className="text-gray-600 font-body leading-relaxed">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Carousel Section */}
      <section className="py-16" style={{ backgroundColor: '#ECECEC' }}>
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Health Partners</h2>

          {/* Define partners array outside of JSX */}
          {(() => {
            const partners = [
              { name: 'WHO', logo: '/images/partners/who.png' },
              { name: 'Rotary', logo: '/images/partners/rotary.png' },
              { name: 'GoU', logo: '/images/partners/gou.png' },
              { name: 'Liberty', logo: '/images/partners/liberty.jpg' },
              { name: 'ACTION IN AFRICA', logo: '/images/partners/action-africa.png' },
              { name: 'Busoga Kingdom', logo: '/images/partners/busoga.png' },
              { name: 'SheisAI', logo: '/images/partners/sheisai.png' },
              { name: 'Winrise', logo: '/images/partners/winrise.png' },
              { name: 'UAP', logo: '/images/partners/uap.png' },
              { name: 'JUBILEE', logo: '/images/partners/jubilee.png' },
              { name: 'AAR', logo: '/images/partners/aar.png' },
            ];

            return (
              <div className="relative overflow-hidden">
                <div
                  className="flex w-max animate-scroll"
                  onMouseEnter={(e) => e.currentTarget.style.animationPlayState = 'paused'}
                  onMouseLeave={(e) => e.currentTarget.style.animationPlayState = 'running'}
                >
                  {/* Original partners + duplicated for continuous scroll */}
                  {[...partners, ...partners].map((partner, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 mx-4 p-6"
                    >
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="h-16 w-auto object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      </section>
    </div>
  );
};

export default Home;