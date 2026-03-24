import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaCalendarAlt, FaTag } from 'react-icons/fa';
import { Link, useSearchParams } from 'react-router-dom';
import SEO from '../components/SEO';
import Breadcrumb from '../components/Breadcrumb';
import { fetchBlogPosts } from '../store/slices/blogSlice';

const Blog = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { posts, loading, error } = useSelector(state => state.blog);

  // Filter posts by search query (powers the SitelinksSearchBox at /blog?q=...)
  // Computed early so we can reference filteredPosts in effects below
  const filteredPosts = searchQuery
    ? posts.filter(
        (p) =>
          p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : posts;

  // Fetch blog posts on mount
  useEffect(() => {
    dispatch(fetchBlogPosts());
  }, [dispatch]);

  // Reset carousel index when search query changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [searchQuery]);

  // Auto-advance carousel (disabled when actively searching)
  useEffect(() => {
    if (!isAutoPlaying || filteredPosts.length === 0 || searchQuery) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === filteredPosts.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, filteredPosts.length, searchQuery]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === filteredPosts.length - 1 ? 0 : prevIndex + 1
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? filteredPosts.length - 1 : prevIndex - 1
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-500">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-700">No blog posts available</h1>
          <p className="text-gray-500 mt-2">Check back later for updates</p>
        </div>
      </div>
    );
  }

  // Filter posts by search query (powered by the SitelinksSearchBox at /blog?q=...)
  // NOTE: filteredPosts is now computed at the top of the component (before useEffects)
  // and is not re-declared here – see the filteredPosts const near the top.

  // Determine which posts to show based on currentIndex
  const visiblePosts = [];
  const postsToShow = Math.min(3, filteredPosts.length);
  for (let i = 0; i < postsToShow; i++) {
    const index = (currentIndex + i) % filteredPosts.length;
    visiblePosts.push(filteredPosts[index]);
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <SEO 
        title="Maternity & Women's Health Blog | Pregnancy Tips & Antenatal Advice Uganda"
        description="Expert articles on maternity care, antenatal advice, pregnancy tips, and women's health from leading gynaecologists and obstetricians in Jinja, Uganda. Stay informed about your health journey."
        keywords="maternity blog Uganda, pregnancy tips Jinja, antenatal advice Uganda, women's health articles, gynaecology news Uganda, obstetrics blog, prenatal care tips"
        url="https://www.specialistdoctors-international.org/blog"
      />
      <Breadcrumb items={[{ name: 'Health Blog', url: '/blog' }]} />
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-tertiary mb-4">Our Blog</h1>
          {searchQuery ? (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Search results for: <span className="font-semibold text-primary">&ldquo;{searchQuery}&rdquo;</span>
              {filteredPosts.length === 0 && (
                <span className="block mt-2 text-base text-gray-500">No articles found. Try a different keyword.</span>
              )}
            </p>
          ) : (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay updated with the latest news, insights, and trends in healthcare.
            </p>
          )}
        </motion.div>

        <div className="relative">
          <div className="flex flex-col md:flex-row justify-center gap-8">
            {visiblePosts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-sm bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
                whileHover={{ y: -5 }}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x200?text=Image+Not+Found';
                    }}
                  />
                </div>
                <div className="p-6 flex-grow">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center">
                      <FaCalendarAlt className="mr-1" />
                      {post.date}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                </div>
                <div className="px-6 pb-4">
                  <Link 
                    to={`/blog/${post.id}`} 
                    className="w-full text-sm font-medium text-secondary hover:text-primary transition-colors text-center py-2 border-t border-gray-100 block"
                  >
                    Read More →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredPosts.length > 1 && (
            <>
              <button 
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                aria-label="Previous slide"
              >
                <FaChevronLeft className="text-gray-700" />
              </button>
              <button 
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                aria-label="Next slide"
              >
                <FaChevronRight className="text-gray-700" />
              </button>
            </>
          )}
        </div>

        {filteredPosts.length > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            {filteredPosts.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsAutoPlaying(false);
                  setTimeout(() => setIsAutoPlaying(true), 10000);
                }}
                className={`w-3 h-3 rounded-full transition-colors ${currentIndex === index ? 'bg-primary' : 'bg-gray-300'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;