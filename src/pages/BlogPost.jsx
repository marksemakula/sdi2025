import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaCalendarAlt, FaTag, FaArrowLeft, FaUser } from 'react-icons/fa';
import { fetchBlogPosts } from '../store/slices/blogSlice';
import SEO from '../components/SEO';

const BlogPost = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const { posts, loading } = useSelector(state => state.blog);
  
  // Fetch posts if not already loaded
  useEffect(() => {
    if (posts.length === 0) {
      dispatch(fetchBlogPosts());
    }
  }, [dispatch, posts.length]);

  const post = posts.find(p => p.id === postId || p.slug === postId);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-500">Loading post...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-700">Post not found</h1>
          <p className="text-gray-500 mt-2">The requested blog post doesn't exist.</p>
          <Link to="/blog" className="inline-block mt-4 text-primary hover:text-primary/80">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <SEO 
        title={`${post.title} | SDI Blog`}
        description={post.excerpt}
        keywords={`${post.category}, healthcare Uganda, medical article`}
        url={`https://www.specialistdoctors-international.org/blog/${post.slug}`}
        image={post.image}
      />
      <div className="max-w-3xl mx-auto px-4">
        <Link 
          to="/blog" 
          className="inline-flex items-center text-primary hover:text-primary/80 mb-6"
        >
          <FaArrowLeft className="mr-2" />
          Back to Blog
        </Link>
        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="h-96 overflow-hidden">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/800x400?text=Image+Not+Found';
              }}
            />
          </div>
          <div className="p-8">
            <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
              <span className="flex items-center text-sm font-semibold text-primary">
                <FaTag className="mr-2" />
                {post.category}
              </span>
              <span className="flex items-center text-sm text-gray-500">
                <FaUser className="mr-2" />
                {post.author}
              </span>
              <span className="flex items-center text-sm text-gray-500">
                <FaCalendarAlt className="mr-2" />
                {post.date}
              </span>
            </div>
            <h1 className="text-3xl font-bold mb-6">{post.title}</h1>
            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 mb-6 font-medium">{post.excerpt}</p>
              {post.content && (
                <div className="border-t pt-6 text-gray-700 leading-relaxed">
                  {post.content.split('\n\n').map((paragraph, i) => {
                    // Check for headers
                    if (paragraph.startsWith('## ')) {
                      return <h2 key={i} className="text-2xl font-bold mt-8 mb-4 text-tertiary">{paragraph.replace('## ', '')}</h2>;
                    }
                    if (paragraph.startsWith('### ')) {
                      return <h3 key={i} className="text-xl font-bold mt-6 mb-3 text-tertiary">{paragraph.replace('### ', '')}</h3>;
                    }
                    // Check for numbered lists
                    if (paragraph.match(/^\d+\./)) {
                      const items = paragraph.split('\n').filter(item => item.trim());
                      return (
                        <ol key={i} className="list-decimal list-inside mb-4 space-y-2">
                          {items.map((item, j) => (
                            <li key={j}>{item.replace(/^\d+\.\s*/, '')}</li>
                          ))}
                        </ol>
                      );
                    }
                    // Check for bullet lists
                    if (paragraph.startsWith('- ') || paragraph.startsWith('* ')) {
                      const items = paragraph.split('\n').filter(item => item.trim());
                      return (
                        <ul key={i} className="list-disc list-inside mb-4 space-y-2">
                          {items.map((item, j) => (
                            <li key={j}>{item.replace(/^[-*]\s*/, '')}</li>
                          ))}
                        </ul>
                      );
                    }
                    return <p key={i} className="mb-4">{paragraph}</p>;
                  })}
                </div>
              )}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogPost;