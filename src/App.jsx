import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Layout from './components/Layout';
import Home from './pages/Home';
import Referral from './pages/Referral';
import Careers from './pages/Careers';
import Telemedicine from './pages/Telemedicine';
import AdminPanel from './pages/AdminPanel';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import { useEffect } from 'react';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  useEffect(() => {
    console.log('App component mounted');
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} errorElement={<div>Error loading Home</div>} />
            <Route path="/referral" element={<Referral />} errorElement={<div>Error loading Referral</div>} />
            <Route path="/careers" element={<Careers />} errorElement={<div>Error loading Careers</div>} />
            <Route path="/telemedicine" element={<Telemedicine />} errorElement={<div>Error loading Telemedicine</div>} />
            <Route path="/blog" element={<Blog />} errorElement={<div>Error loading Blog</div>} />
            <Route path="/blog/:postId" element={<BlogPost />} errorElement={<div>Error loading Blog Post</div>} />
            <Route path="/admin" element={<AdminPanel />} errorElement={<div>Error loading Admin Panel</div>} />
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;