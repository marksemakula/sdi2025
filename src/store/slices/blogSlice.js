import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    posts: [],
    loading: false,
    error: null
  },
  reducers: {
    fetchBlogPostsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchBlogPostsSuccess(state, action) {
      state.posts = action.payload;
      state.loading = false;
    },
    fetchBlogPostsFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    addBlogPost(state, action) {
      try {
        if (!action.payload.title || !action.payload.excerpt) {
          throw new Error('Title and excerpt are required');
        }

        const newPost = {
          id: uuidv4(),
          title: action.payload.title,
          excerpt: action.payload.excerpt,
          category: action.payload.category || 'General',
          image: action.payload.image || '/default-blog-image.jpg',
          content: action.payload.content || '',
          date: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        state.posts.unshift(newPost);
        localStorage.setItem('blogPosts', JSON.stringify(state.posts));
      } catch (error) {
        console.error('Error adding blog post:', error);
        state.error = error.message;
      }
    },
    updateBlogPost(state, action) {
      try {
        const index = state.posts.findIndex(post => post.id === action.payload.id);
        if (index === -1) throw new Error('Post not found');

        state.posts[index] = {
          ...state.posts[index],
          ...action.payload.updates,
          updatedAt: new Date().toISOString()
        };

        localStorage.setItem('blogPosts', JSON.stringify(state.posts));
      } catch (error) {
        console.error('Error updating blog post:', error);
        state.error = error.message;
      }
    },
    deleteBlogPost(state, action) {
      try {
        const initialLength = state.posts.length;
        state.posts = state.posts.filter(post => post.id !== action.payload);
        
        if (initialLength === state.posts.length) {
          throw new Error('Post not found for deletion');
        }

        localStorage.setItem('blogPosts', JSON.stringify(state.posts));
      } catch (error) {
        console.error('Error deleting blog post:', error);
        state.error = error.message;
      }
    },
    setInitialBlogPosts(state, action) {
      if (Array.isArray(action.payload)) {
        state.posts = action.payload.map(post => ({
          id: post.id || uuidv4(),
          title: post.title || 'Untitled Post',
          excerpt: post.excerpt || '',
          category: post.category || 'General',
          image: post.image || '/default-blog-image.jpg',
          content: post.content || '',
          date: post.date || new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          createdAt: post.createdAt || new Date().toISOString(),
          updatedAt: post.updatedAt || new Date().toISOString()
        }));
      }
    }
  }
});

export const loadBlogPosts = () => {
  try {
    const savedPosts = localStorage.getItem('blogPosts');
    if (!savedPosts) return [];
    
    const parsed = JSON.parse(savedPosts);
    if (!Array.isArray(parsed)) return [];
    
    return parsed;
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return [];
  }
};

export const {
  fetchBlogPostsStart,
  fetchBlogPostsSuccess,
  fetchBlogPostsFailure,
  addBlogPost,
  updateBlogPost,
  deleteBlogPost,
  setInitialBlogPosts
} = blogSlice.actions;

export default blogSlice.reducer;