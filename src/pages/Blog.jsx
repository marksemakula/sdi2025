import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaCalendarAlt, FaTag } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Blog = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { posts } = useSelector(state => state.blog);

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying || posts.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === posts.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, posts.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === posts.length - 1 ? 0 : prevIndex + 1
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? posts.length - 1 : prevIndex - 1
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

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

  // Determine which posts to show based on currentIndex
  const visiblePosts = [];
  const postsToShow = Math.min(3, posts.length);
  for (let i = 0; i < postsToShow; i++) {
    const index = (currentIndex + i) % posts.length;
    visiblePosts.push(posts[index]);
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-tertiary mb-4">Our Blog</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest news, insights, and trends in healthcare.
          </p>
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

          {posts.length > 1 && (
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

        {posts.length > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            {posts.map((_, index) => (
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