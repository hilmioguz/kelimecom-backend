import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      component: () => import('@/view/layout/Layout'),
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import('@/view/pages/Dashboard.vue'),
        },
        {
          path: '/maddeler',
          name: 'maddeler',
          component: () => import('@/view/pages/Maddeler.vue'),
        },
        {
          path: '/gundemler',
          name: 'gundemler',
          component: () => import('@/view/pages/Gundem.vue'),
        },
        {
          path: '/toplukullanici',
          name: 'toplukullanici',
          component: () => import('@/view/pages/MassUserCreate.vue'),
        },
        {
          path: '/dictionary',
          name: 'dictionary',
          component: () => import('@/view/pages/Dictionary.vue'),
        },
        {
          path: '/blog',
          name: 'blog',
          component: () => import('@/view/pages/Blog.vue'),
        },
        {
          path: '/packet',
          name: 'packet',
          component: () => import('@/view/pages/Packet.vue'),
        },
        {
          path: '/kurumlar',
          name: 'kurumlar',
          component: () => import('@/view/pages/Kurumlar.vue'),
        },
        {
          path: '/users',
          name: 'users',
          component: () => import('@/view/pages/Users.vue'),
        },
        {
          path: '/profile',
          name: 'profile',
          component: () => import('@/view/pages/profile/Profile.vue'),
          children: [
            {
              path: 'profile-1',
              name: 'profile-1',
              component: () => import('@/view/pages/profile/Profile-1.vue'),
            },
            {
              path: 'profile-2',
              name: 'profile-2',
              component: () => import('@/view/pages/profile/Profile-2.vue'),
            },
            {
              path: 'profile-3',
              name: 'profile-3',
              component: () => import('@/view/pages/profile/Profile-3.vue'),
            },
            {
              path: 'profile-4',
              name: 'profile-4',
              component: () => import('@/view/pages/profile/Profile-4.vue'),
            },
          ],
        },
      ],
    },
    {
      path: '/',
      component: () => import('@/view/pages/auth/login_pages/Login-1'),
      children: [
        {
          name: 'login',
          path: '/login',
          component: () => import('@/view/pages/auth/login_pages/Login-1'),
        },
        {
          name: 'register',
          path: '/register',
          component: () => import('@/view/pages/auth/login_pages/Login-1'),
        },
      ],
    },
    {
      path: '*',
      redirect: '/404',
    },
    {
      // the 404 route, when none of the above matches
      path: '/404',
      name: '404',
      component: () => import('@/view/pages/error/Error-5.vue'),
    },
  ],
});
