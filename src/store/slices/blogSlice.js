import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

// Simplified date formatting
const getCurrentDate = () => {
  const now = new Date();
  return {
    iso: now.toISOString(),
    formatted: now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  };
};

// Robust localStorage handling
const persistPosts = (posts) => {
  try {
    localStorage.setItem('blogPosts', JSON.stringify(posts));
  } catch (error) {
    console.error('Failed to persist posts:', error);
  }
};

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    posts: [],
    loading: false,
    error: null
  },
  reducers: {
    // Simplified CRUD operations
    addBlogPost: {
      reducer(state, action) {
        const { date } = getCurrentDate();
        const newPost = {
          id: uuidv4(),
          ...action.payload,
          date: action.payload.date || date.formatted,
          createdAt: date.iso,
          updatedAt: date.iso
        };
        state.posts.unshift(newPost);
        persistPosts(state.posts);
      },
      prepare(postData) {
        return {
          payload: {
            title: postData.title?.trim() || '',
            excerpt: postData.excerpt?.trim() || '',
            category: postData.category || 'General',
            image: postData.image || '/default-blog-image.jpg',
            content: postData.content || '',
            date: postData.date || ''
          }
        };
      }
    },

    // Fixed update operation
    updateBlogPost: {
      reducer(state, action) {
        const { id, updates } = action.payload;
        const index = state.posts.findIndex(post => post.id === id);
        
        if (index >= 0) {
          const { date } = getCurrentDate();
          state.posts[index] = {
            ...state.posts[index],
            ...updates,
            updatedAt: date.iso,
            // Preserve immutable fields
            id: state.posts[index].id,
            createdAt: state.posts[index].createdAt
          };
          persistPosts(state.posts);
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
      state.posts = state.posts.filter(post => post.id !== action.payload);
      persistPosts(state.posts);
    },

    // Initialization
    initializePosts(state, action) {
      if (Array.isArray(action.payload)) {
        state.posts = action.payload.map(post => ({
          id: post.id || uuidv4(),
          title: post.title || 'Untitled Post',
          excerpt: post.excerpt || '',
          category: post.category || 'General',
          image: post.image || '/default-blog-image.jpg',
          content: post.content || '',
          date: post.date || getCurrentDate().formatted,
          createdAt: post.createdAt || getCurrentDate().iso,
          updatedAt: post.updatedAt || getCurrentDate().iso
        }));
      }
    },

    // Error handling
    setError(state, action) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    }
  }
});

// Load posts with validation
export const loadBlogPosts = () => {
  try {
    const saved = localStorage.getItem('blogPosts');
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Failed to load posts:', error);
    return [];
  }
};

export const { 
  addBlogPost, 
  updateBlogPost, 
  deleteBlogPost,
  initializePosts,
  setError,
  clearError
} = blogSlice.actions;

export default blogSlice.reducer;