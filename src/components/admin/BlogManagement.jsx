import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  FaTrash, FaEdit, FaPlus, FaTimes, FaCheck,
  FaImage, FaCalendarAlt, FaTag, FaExclamationCircle 
} from 'react-icons/fa';
import { 
  addBlogPost, updateBlogPost, deleteBlogPost 
} from '../../store/slices/blogSlice';
import SuccessModal from '../common/SuccessModal';

const BlogManagement = () => {
  const dispatch = useDispatch();
  const { posts, error } = useSelector(state => state.blog);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    category: 'General',
    image: '',
    content: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [formErrors, setFormErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const categories = ['General', 'Telemedicine', 'Careers', 'Technology', 'Wellness', 'Research'];

  useEffect(() => {
    if (currentPost) {
      setFormData({
        title: currentPost.title,
        excerpt: currentPost.excerpt,
        category: currentPost.category,
        image: currentPost.image,
        content: currentPost.content || '',
        date: currentPost.date || new Date().toISOString().split('T')[0]
      });
    }
  }, [currentPost]);

  const validateForm = () => {
    const errors = {};
    if (!formData.title.trim()) errors.title = 'Title is required';
    if (!formData.excerpt.trim()) errors.excerpt = 'Excerpt is required';
    if (!formData.category) errors.category = 'Category is required';
    if (!formData.date) errors.date = 'Date is required';
    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if (isEditing) {
      // Corrected dispatch format for updateBlogPost
      dispatch(updateBlogPost({
        id: currentPost.id,
        updates: {
          title: formData.title,
          excerpt: formData.excerpt,
          category: formData.category,
          image: formData.image,
          content: formData.content,
          date: formData.date
        }
      }));
      setSuccessMessage('Blog post updated successfully!');
    } else {
      dispatch(addBlogPost({
        ...formData,
        id: Date.now().toString()
      }));
      setSuccessMessage('Blog post created successfully!');
    }
    setShowSuccessModal(true);
    handleReset();
  };

  const handleReset = () => {
    setIsEditing(false);
    setCurrentPost(null);
    setFormData({
      title: '',
      excerpt: '',
      category: 'General',
      image: '',
      content: '',
      date: new Date().toISOString().split('T')[0]
    });
    setFormErrors({});
  };

  const handleDeletePost = (postId) => {
    if (window.confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) {
      dispatch(deleteBlogPost(postId));
      setSuccessMessage('Blog post deleted successfully!');
      setShowSuccessModal(true);
    }
  };

  return (
    <div className="space-y-6">
      {/* Success Modal */}
      <SuccessModal 
        isOpen={showSuccessModal}
        message={successMessage}
        onClose={() => setShowSuccessModal(false)}
      />

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
          <div className="flex items-center">
            <FaExclamationCircle className="mr-2" />
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Create/Edit Post Form */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-tertiary">
          {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary ${
                  formErrors.title ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {formErrors.title && (
                <p className="mt-1 text-sm text-red-600">{formErrors.title}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaTag className="text-gray-400" />
                </div>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`pl-10 w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary ${
                    formErrors.category ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaCalendarAlt className="text-gray-400" />
                </div>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className={`pl-10 w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary ${
                    formErrors.date ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              {formErrors.date && (
                <p className="mt-1 text-sm text-red-600">{formErrors.date}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaImage className="text-gray-400" />
                </div>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>
          </div>

          {formData.image && (
            <div className="mt-2">
              <img 
                src={formData.image} 
                alt="Preview" 
                className="h-40 object-cover rounded-md border"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x200?text=Image+Not+Found';
                }}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Excerpt <span className="text-red-500">*</span>
            </label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary ${
                formErrors.excerpt ? 'border-red-500' : 'border-gray-300'
              }`}
              rows="3"
              maxLength="200"
            />
            <div className="flex justify-between">
              {formErrors.excerpt && (
                <p className="text-sm text-red-600">{formErrors.excerpt}</p>
              )}
              <p className="text-xs text-gray-500">
                {formData.excerpt.length}/200 characters
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              rows="6"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            {isEditing && (
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <FaTimes className="inline mr-2" />
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-md shadow-sm text-sm font-medium hover:bg-primary/90"
            >
              {isEditing ? (
                <>
                  <FaCheck className="inline mr-2" />
                  Update Post
                </>
              ) : (
                <>
                  <FaPlus className="inline mr-2" />
                  Create Post
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Blog Posts List */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-tertiary">Blog Posts</h2>
        {posts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No blog posts found. Create your first post above.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {posts.map(post => (
                  <tr key={post.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{post.title}</div>
                      <div className="text-sm text-gray-500 line-clamp-2">{post.excerpt}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary/10 text-primary">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500">
                        <FaCalendarAlt className="mr-2 text-gray-400" />
                        {post.date}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Published
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex space-x-2 justify-end">
                        <button
                          onClick={() => {
                            setIsEditing(true);
                            setCurrentPost(post);
                          }}
                          className="text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-indigo-50 transition-colors"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
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