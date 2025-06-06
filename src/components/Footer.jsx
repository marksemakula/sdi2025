import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="text-white" style={{ backgroundColor: '#0072BB' }}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-[1.8fr_1fr_1fr] gap-8">
          {/* Contact Column - More space */}
          <div className="flex items-start">
            {/* Logo increased by 35% (from 120px to 162px) */}
            <div className="flex-shrink-0 mr-4" style={{
              width: '162px', // 120px + 35%
              height: '162px'  // 120px + 35%
            }}>
              <img 
                src="/images/SDI_LogoF.png" 
                alt="SDI Logo" 
                className="w-full h-full object-contain"
              />
            </div>

            <div className="min-w-[240px] self-center">
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <div className="space-y-2">
                <p className="flex items-center"><FaPhone className="mr-2" /> +256702652046 / +256784004979</p>
                <p className="flex items-center">
                  <FaEnvelope className="mr-2 flex-shrink-0" /> 
                  <span className="whitespace-nowrap overflow-x-auto">
                    service@specialistdoctors-international.org
                  </span>
                </p>
                <p className="flex items-center"><FaMapMarkerAlt className="mr-2" /> Nizam Rd. - Jinja, Uganda</p>
              </div>
            </div>
          </div>
          
          {/* Quick Links Column - Reduced width */}
          <div className="md:pl-4 self-center">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#/referral" className="hover:text-yellow-300 block">Make a Referral</a></li>
              <li><a href="#/careers" className="hover:text-yellow-300 block">Career Opportunities</a></li>
              <li><a href="#/telemedicine" className="hover:text-yellow-300 block">Telemedicine Services</a></li>
            </ul>
          </div>
          
          {/* About Column - Reduced width */}
          <div className="md:pl-4 self-center">
            <h3 className="text-lg font-semibold mb-4">About SDI</h3>
            <p className="text-sm">
              Specialist Doctors International provides world-class medical care
              through our network of experienced specialists and state-of-the-art
              facilities.
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-white/10 text-center">
          <p>&copy; {new Date().getFullYear()} Specialist Doctors International. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;