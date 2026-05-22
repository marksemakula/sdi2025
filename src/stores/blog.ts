import { defineStore } from 'pinia';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  image: string;
  excerpt: string;
  content: string;
  published: boolean;
}

export const useBlogStore = defineStore('blog', {
  state: () => ({
    posts: [] as BlogPost[],
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchBlogPosts() {
      this.loading = true;
      this.error = null;
      try {
        const modules = import.meta.glob('/content/blog/*.json', { eager: true }) as Record<
          string,
          { default?: Record<string, unknown> } & Record<string, unknown>
        >;

        const posts: BlogPost[] = Object.entries(modules).map(([path, module]) => {
          const filename = path.split('/').pop()!.replace('.json', '');
          const data = (module.default ?? module) as Record<string, unknown>;

          return {
            id: filename,
            slug: filename,
            title: (data.title as string) || 'Untitled',
            date: (data.date as string) || '',
            author: (data.author as string) || 'SDI Medical Team',
            category: (data.category as string) || 'General Health',
            image: (data.image as string) || '/images/default-blog.jpg',
            excerpt: (data.excerpt as string) || '',
            content: (data.content as string) || '',
            published: data.published !== false,
          };
        });

        this.posts = posts
          .filter((p) => p.published)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      } catch (err) {
        console.error('Error loading blog posts:', err);
        this.error = err instanceof Error ? err.message : 'Failed to load posts';
        this.posts = [];
      } finally {
        this.loading = false;
      }
    },
  },
});
