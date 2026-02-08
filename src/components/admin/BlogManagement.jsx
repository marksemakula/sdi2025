import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  FaExternalLinkAlt, FaCalendarAlt, FaTag, FaUser, FaSync
} from 'react-icons/fa';
import { fetchBlogPosts } from '../../store/slices/blogSlice';

const BlogManagement = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector(state => state.blog);

  useEffect(() => {
    dispatch(fetchBlogPosts());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchBlogPosts());
  };

  const handleOpenCMS = () => {
    window.open('/admin/', '_blank');
  };

  return (
    <div className="space-y-6">
      {/* CMS Banner */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white p-6 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">Blog Content Management</h2>
            <p className="text-white/90">
              Blog posts are managed through our Content Management System (CMS). 
              Create, edit, and delete posts with a visual editor.
            </p>
          </div>
          <button
            onClick={handleOpenCMS}
            className="inline-flex items-center px-6 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-md"
          >
            <FaExternalLinkAlt className="mr-2" />
            Open CMS Editor
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
        <h3 className="font-semibold text-blue-800 mb-2">How to Use the CMS</h3>
        <ol className="list-decimal list-inside text-blue-700 space-y-1">
          <li>Click "Open CMS Editor" above to access the content management system</li>
          <li>Log in with your Netlify Identity credentials</li>
          <li>Navigate to "Blog Posts" in the sidebar</li>
          <li>Create new posts or edit existing ones using the visual editor</li>
          <li>Save and publish when ready - changes will be live within minutes</li>
        </ol>
      </div>

      {/* Posts Overview */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-tertiary">Published Blog Posts</h2>
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="inline-flex items-center px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <FaSync className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded">
            <span>{error}</span>
          </div>
        )}

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-500">Loading posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No blog posts yet.</p>
            <button
              onClick={handleOpenCMS}
              className="text-primary hover:text-primary/80 font-medium"
            >
              Create your first post →
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Post</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        {post.image && (
                          <img 
                            src={post.image} 
                            alt={post.title}
                            className="w-12 h-12 object-cover rounded mr-3"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        )}
                        <div>
                          <div className="font-medium text-gray-900">{post.title}</div>
                          <div className="text-sm text-gray-500 line-clamp-1">{post.excerpt}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        <FaTag className="mr-1" size={10} />
                        {post.category}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center text-sm text-gray-600">
                        <FaUser className="mr-2" size={12} />
                        {post.author}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center text-sm text-gray-600">
                        <FaCalendarAlt className="mr-2" size={12} />
                        {post.date}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogManagement;
