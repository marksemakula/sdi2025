import { createRouter, createWebHistory } from 'vue-router';
import TheLayout from '@/components/TheLayout.vue';

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      component: TheLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/pages/HomePage.vue'),
        },
        {
          path: 'referral',
          name: 'referral',
          component: () => import('@/pages/ReferralPage.vue'),
        },
        {
          path: 'careers',
          name: 'careers',
          component: () => import('@/pages/CareersPage.vue'),
        },
        {
          path: 'telemedicine',
          name: 'telemedicine',
          component: () => import('@/pages/TelemedicinePage.vue'),
        },
        {
          path: 'blog',
          name: 'blog',
          component: () => import('@/pages/BlogPage.vue'),
        },
        {
          path: 'blog/:postId',
          name: 'blog-post',
          component: () => import('@/pages/BlogPostPage.vue'),
        },
        {
          path: 'donate',
          name: 'donate',
          component: () => import('@/pages/DonatePage.vue'),
        },
        {
          path: 'admin',
          name: 'admin',
          component: () => import('@/pages/AdminPage.vue'),
        },
        {
          path: ':pathMatch(.*)*',
          name: 'not-found',
          component: () => import('@/pages/NotFoundPage.vue'),
        },
      ],
    },
  ],
});

export default router;
