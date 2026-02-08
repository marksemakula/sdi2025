import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  FaStethoscope, 
  FaUserMd, 
  FaVideo, 
  FaLock, 
  FaBlog,
  FaBars,
  FaTimes
} from 'react-icons/fa';

const Navigation = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/', label: 'Home', icon: FaStethoscope },
    { to: '/referral', label: 'Referral', icon: FaUserMd },
    { to: '/careers', label: 'Careers', icon: FaUserMd },
    { to: '/telemedicine', label: 'Telemedicine', icon: FaVideo },
    { to: '/blog', label: 'Blog', icon: FaBlog },
    { to: '/donate', label: 'Donate', icon: FaStethoscope, isDonate: true },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18 py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex items-center"
            >
              <img 
                src="/images/SDI_Logo_mini.png" 
                alt="SDI Logo" 
                className="h-10 w-auto mr-3 transition-transform group-hover:scale-105" 
              />
              <div className="hidden sm:block">
                <span className={`text-xl font-bold font-display tracking-tight transition-colors duration-300 ${
                  isScrolled ? 'text-tertiary' : 'text-white'
                }`}>
                  Specialist Doctors
                </span>
                <span className={`block text-xs font-body -mt-1 transition-colors duration-300 ${
                  isScrolled ? 'text-gray-500' : 'text-white/80'
                }`}>
                  International
                </span>
              </div>
              <span className={`sm:hidden text-xl font-bold font-display transition-colors duration-300 ${
                isScrolled ? 'text-tertiary' : 'text-white'
              }`}>
                SDI
              </span>
            </motion.div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              link.isDonate ? (
                <Link
                  key={link.to}
                  to={link.to}
                  className="ml-2 btn-secondary text-sm py-2 px-5"
                >
                  Donate
                </Link>
              ) : (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isScrolled
                      ? location.pathname === link.to
                        ? 'text-primary bg-primary/10'
                        : 'text-gray-600 hover:text-primary hover:bg-primary/5'
                      : location.pathname === link.to
                        ? 'text-white bg-white/20'
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <link.icon className="h-4 w-4" />
                  <span>{link.label}</span>
                </Link>
              )
            ))}
            
            {/* CTA Button */}
            <Link
              to="/referral"
              className="ml-4 btn-primary text-sm py-2 px-5"
            >
              Book Appointment
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleMobileMenu}
              className={`p-2 rounded-lg transition-colors duration-300 ${
                isScrolled ? 'text-gray-600 hover:bg-gray-100' : 'text-white hover:bg-white/10'
              }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                link.isDonate ? (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center space-x-2 px-4 py-3 rounded-xl text-base font-medium btn-secondary"
                  >
                    <span>Donate</span>
                  </Link>
                ) : (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium font-body
                      transition-all duration-200
                      ${location.pathname === link.to 
                        ? 'bg-primary/10 text-primary' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-tertiary'}`}
                  >
                    <link.icon className="h-5 w-5" />
                    <span>{link.label}</span>
                  </Link>
                )
              ))}
              
              {/* Mobile CTA */}
              <Link
                to="/referral"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full btn-primary text-center mt-4"
              >
                Book Appointment
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
