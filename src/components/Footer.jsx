import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt, FaApple, FaGooglePlay } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Company Info with logo */}
          <div className="space-y-4">
            <div className="flex items-center space-x-5">
              <div className="flex-shrink-0">
                <img
                  src="/images/SDI_LogoF.png"
                  alt="SDI Logo"
                  className="h-32 w-auto"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-2xl leading-tight">Specialist Doctors</span>
                <span className="text-base text-gray-300 font-normal">International</span>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mt-2">
              Providing world-class medical care through our network of experienced specialists.
            </p>
            <div className="flex space-x-4 mt-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="text-gray-300 hover:text-primary transition-colors duration-300"
              >
                <FaFacebook size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="text-gray-300 hover:text-primary transition-colors duration-300"
              >
                <FaTwitter size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="text-gray-300 hover:text-primary transition-colors duration-300"
              >
                <FaInstagram size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="text-gray-300 hover:text-primary transition-colors duration-300"
              >
                <FaLinkedin size={20} />
              </motion.a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <FaPhone className="text-primary" size={16} />
                <span className="text-gray-300 text-sm">+256 702 652 046 | +256 784 004 979</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-primary" size={16} />
                <span className="text-gray-300 text-sm">service@specialistdoctors-international.org</span>
              </div>
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-primary mt-1" size={16} />
                <span className="text-gray-300 text-sm">
                  Nizam Rd. - Jinja, Uganda
                </span>
              </div>
            </div>
          </div>

          {/* Get the App */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Get the App</h3>
            <p className="text-gray-300 text-sm">
              Access telemedicine services anytime, anywhere with our mobile app.
            </p>
            <div className="space-y-3">
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="#"
                className="flex items-center space-x-3 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors duration-300"
              >
                <FaApple className="text-white" size={20} />
                <div>
                  <div className="text-xs text-gray-300">Download on the</div>
                  <div className="text-sm font-medium">App Store</div>
                </div>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="#"
                className="flex items-center space-x-3 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors duration-300"
              >
                <FaGooglePlay className="text-white" size={20} />
                <div>
                  <div className="text-xs text-gray-300">Get it on</div>
                  <div className="text-sm font-medium">Google Play</div>
                </div>
              </motion.a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            © {new Date().getFullYear()} Specialist Doctors International. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <Link to="#" className="text-gray-300 hover:text-primary transition-colors duration-300 text-sm">
              Privacy Policy
            </Link>
            <Link to="#" className="text-gray-300 hover:text-primary transition-colors duration-300 text-sm">
              Terms of Service
            </Link>
            <div className="flex items-center space-x-2">
              <span className="text-gray-300 text-sm">Powered by</span>
              <img 
                src="/images/logo.png" 
                alt="Inzozi Logo" 
                className="h-10 w-auto brightness-0 invert" 
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;