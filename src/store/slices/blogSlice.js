import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

// Helper function for date formatting
const formatDate = (dateString = null) => {
  const date = dateString ? new Date(dateString) : new Date();
  return {
    iso: date.toISOString(),
    formatted: date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  };
};

// Enhanced localStorage operations with error handling
const localStorageOperations = {
  get: (key) => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error(`Error reading ${key} from localStorage:`, error);
      return null;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing ${key} to localStorage:`, error);
    }
  }
};

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    posts: [],
    loading: false,
    error: null,
    lastUpdated: null
  },
  reducers: {
    // Fetch operations
    fetchBlogPostsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchBlogPostsSuccess(state, action) {
      state.posts = action.payload;
      state.loading = false;
      state.lastUpdated = new Date().toISOString();
    },
    fetchBlogPostsFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },

    // CRUD operations
    addBlogPost: {
      reducer(state, action) {
        try {
          const { payload } = action;
          const { date } = formatDate();
          
          const newPost = {
            id: uuidv4(),
            title: payload.title,
            excerpt: payload.excerpt,
            category: payload.category || 'General',
            image: payload.image || '/default-blog-image.jpg',
            content: payload.content || '',
            date: payload.date || date.formatted,
            createdAt: date.iso,
            updatedAt: date.iso
          };

          state.posts.unshift(newPost);
          state.lastUpdated = date.iso;
          localStorageOperations.set('blogPosts', state.posts);
        } catch (error) {
          state.error = error.message || 'Failed to add blog post';
          console.error('Error in addBlogPost:', error);
        }
      },
      prepare(postData) {
        return {
          payload: {
            title: postData.title?.trim() || '',
            excerpt: postData.excerpt?.trim() || '',
            category: postData.category || 'General',
            image: postData.image || '',
            content: postData.content || '',
            date: postData.date || ''
          }
        };
      }
    },

    updateBlogPost: {
      reducer(state, action) {
        try {
          const { id, updates } = action.payload;
          const index = state.posts.findIndex(post => post.id === id);
          
          if (index === -1) {
            throw new Error('Post not found');
          }

          const { date } = formatDate();
          const updatedPost = {
            ...state.posts[index],
            ...updates,
            updatedAt: date.iso
          };

          state.posts[index] = updatedPost;
          state.lastUpdated = date.iso;
          localStorageOperations.set('blogPosts', state.posts);
        } catch (error) {
          state.error = error.message || 'Failed to update blog post';
          console.error('Error in updateBlogPost:', error);
        }
      },
      prepare(id, updates) {
        return {
          payload: {
            id,
            updates: {
              title: updates.title?.trim() || '',
              excerpt: updates.excerpt?.trim() || '',
              category: updates.category || 'General',
              image: updates.image || '',
              content: updates.content || '',
              date: updates.date || ''
            }
          }
        };
      }
    },

    deleteBlogPost(state, action) {
      try {
        const initialLength = state.posts.length;
        state.posts = state.posts.filter(post => post.id !== action.payload);
        
        if (initialLength === state.posts.length) {
          throw new Error('Post not found');
        }

        const { date } = formatDate();
        state.lastUpdated = date.iso;
        localStorageOperations.set('blogPosts', state.posts);
      } catch (error) {
        state.error = error.message || 'Failed to delete blog post';
        console.error('Error in deleteBlogPost:', error);
      }
    },

    // Initialization
    setInitialBlogPosts(state, action) {
      try {
        if (!Array.isArray(action.payload)) return;

        const processedPosts = action.payload.map(post => {
          const { date } = formatDate(post.createdAt || post.date);
          
          return {
            id: post.id || uuidv4(),
            title: post.title || 'Untitled Post',
            excerpt: post.excerpt || '',
            category: post.category || 'General',
            image: post.image || '/default-blog-image.jpg',
            content: post.content || '',
            date: post.date || date.formatted,
            createdAt: post.createdAt || date.iso,
            updatedAt: post.updatedAt || date.iso
          };
        });

        state.posts = processedPosts;
        state.lastUpdated = new Date().toISOString();
      } catch (error) {
        state.error = error.message || 'Failed to initialize blog posts';
        console.error('Error in setInitialBlogPosts:', error);
      }
    },

    // Error handling
    clearBlogError(state) {
      state.error = null;
    }
  }
});

// Enhanced loader with validation
export const loadBlogPosts = () => {
  const savedPosts = localStorageOperations.get('blogPosts');
  
  if (!savedPosts || !Array.isArray(savedPosts)) {
    return [];
  }

  // Validate and clean loaded data
  return savedPosts.map(post => ({
    id: typeof post.id === 'string' ? post.id : uuidv4(),
    title: typeof post.title === 'string' ? post.title : 'Untitled Post',
    excerpt: typeof post.excerpt === 'string' ? post.excerpt : '',
    category: typeof post.category === 'string' ? post.category : 'General',
    image: typeof post.image === 'string' ? post.image : '/default-blog-image.jpg',
    content: typeof post.content === 'string' ? post.content : '',
    date: typeof post.date === 'string' ? post.date : formatDate().formatted,
    createdAt: typeof post.createdAt === 'string' ? post.createdAt : formatDate().iso,
    updatedAt: typeof post.updatedAt === 'string' ? post.updatedAt : formatDate().iso
  }));
};

export const {
  fetchBlogPostsStart,
  fetchBlogPostsSuccess,
  fetchBlogPostsFailure,
  addBlogPost,
  updateBlogPost,
  deleteBlogPost,
  setInitialBlogPosts,
  clearBlogError
} = blogSlice.actions;

export default blogSlice.reducer;