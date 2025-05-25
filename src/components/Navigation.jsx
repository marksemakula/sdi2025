import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStethoscope, FaUserMd, FaVideo, FaLock, FaBlog } from 'react-icons/fa';

const Navigation = () => {
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Home', icon: FaStethoscope },
    { to: '/referral', label: 'Referral', icon: FaUserMd },
    { to: '/careers', label: 'Careers', icon: FaUserMd },
    { to: '/telemedicine', label: 'Telemedicine', icon: FaVideo },
    { to: '/blog', label: 'Blog', icon: FaBlog },
    { to: '/admin', label: 'Admin', icon: FaLock },
  ];

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3">
            <div className="flex items-center">
              <img 
                src="/images/SDI_Logo_mini.png" 
                alt="SDI Logo" 
                className="h-8 w-auto mr-2" 
              />
              <span className="text-xl font-bold text-tertiary">SDI</span>
            </div>
          </Link>
          
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium
                  ${location.pathname === link.to 
                    ? 'text-primary' 
                    : 'text-gray-600 hover:text-secondary'}`}
              >
                <link.icon className="h-4 w-4" />
                <span>{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;