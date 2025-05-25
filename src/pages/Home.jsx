import { motion } from 'framer-motion';
import { FaUserMd, FaHospital, FaAmbulance } from 'react-icons/fa';
import HeroCarousel from '../components/HeroCarousel';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Carousel */}
      <section className="relative h-[600px] overflow-hidden">
        <HeroCarousel />
        
        {/* Content container */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full flex justify-between items-center">
            {/* Text and buttons container */}
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
                  href="#/referral" 
                  className="bg-secondary hover:bg-secondary/90 text-white px-8 py-3 rounded-md font-medium text-center transition-colors [text-shadow:_0_1px_2px_rgba(0,0,0,0.3)]"
                >
                  Make a Referral
                </a>
                <a 
                  href="#/telemedicine"
                  className="bg-white hover:bg-gray-100 text-tertiary px-8 py-3 rounded-md font-medium text-center transition-colors [text-shadow:_0_1px_2px_rgba(0,0,0,0.1)]"
                >
                  Virtual Consultation
                </a>
              </div>
            </motion.div>

            {/* Logo container - now 62% larger (original 256px × 1.62 = 414.72px) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:block relative z-20 -ml-8"
              style={{ width: 'calc(256px * 1.62)' }} // Fixed: Proper parentheses
            >
              <div className="relative w-full h-full">
                {/* Shadow element */}
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
                {/* Main logo */}
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
                {/* Image thumbnail */}
                <div className="h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Content */}
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