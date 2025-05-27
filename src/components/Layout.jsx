import { motion } from 'framer-motion';
import Navigation from './Navigation';
import Footer from './Footer';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    console.log('Layout component mounted');
    // Scroll to top when path changes
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navigation is now fixed at the top */}
      <Navigation />
      
      {/* Main content with margin-top to account for fixed navbar */}
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex-grow mt-16 md:mt-16" // Added responsive margin-top
      >
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </motion.main>
      <Footer />
    </div>
  );
};

const ErrorBoundary = ({ children }) => {
  try {
    return children;
  } catch (error) {
    console.error('Layout Error:', error);
    return (
      <div className="p-4 text-red-500">
        <h2>Something went wrong</h2>
        <p>{error.message}</p>
      </div>
    );
  }
};

export default Layout;