import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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

// Load blog posts from content folder (CMS-managed files)
export const fetchBlogPosts = createAsyncThunk(
  'blog/fetchPosts',
  async () => {
    try {
      // Use Vite's glob import to load all JSON files from content/blog
      const modules = import.meta.glob('/content/blog/*.json', { eager: true });
      
      const posts = Object.entries(modules).map(([path, module]) => {
        // Extract filename for ID
        const filename = path.split('/').pop().replace('.json', '');
        const data = module.default || module;
        
        return {
          id: filename,
          slug: filename,
          title: data.title || 'Untitled',
          date: data.date || '',
          author: data.author || 'SDI Medical Team',
          category: data.category || 'General Health',
          image: data.image || '/images/default-blog.jpg',
          excerpt: data.excerpt || '',
          content: data.content || '',
          published: data.published !== false
        };
      });

      // Filter published posts and sort by date (newest first)
      return posts
        .filter(post => post.published)
        .sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB - dateA;
        });
    } catch (error) {
      console.error('Error loading blog posts:', error);
      return [];
    }
  }
);

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    posts: [],
    loading: false,
    error: null
  },
  reducers: {
    // Keep for any local operations
    setPosts(state, action) {
      state.posts = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchBlogPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { 
  setPosts,
  setLoading,
  setError,
  clearError
} = blogSlice.actions;

export default blogSlice.reducer;