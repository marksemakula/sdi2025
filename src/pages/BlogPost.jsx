import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaCalendarAlt, FaTag } from 'react-icons/fa';

const BlogPost = () => {
  const { postId } = useParams();
  const { posts } = useSelector(state => state.blog);
  const post = posts.find(p => p.id === postId);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-700">Post not found</h1>
          <p className="text-gray-500 mt-2">The requested blog post doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
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
            <div className="flex justify-between items-center mb-6">
              <span className="flex items-center text-sm font-semibold text-primary">
                <FaTag className="mr-2" />
                {post.category}
              </span>
              <span className="flex items-center text-sm text-gray-500">
                <FaCalendarAlt className="mr-2" />
                {post.date}
              </span>
            </div>
            <h1 className="text-3xl font-bold mb-6">{post.title}</h1>
            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 mb-6">{post.excerpt}</p>
              {post.content && (
                <div className="border-t pt-6 text-gray-700">
                  {post.content.split('\n').map((paragraph, i) => (
                    <p key={i} className="mb-4">{paragraph}</p>
                  ))}
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