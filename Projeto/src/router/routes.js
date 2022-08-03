
const routes = [
  {
    path: '/',
    name: 'LoginPage',
    component: () => import('pages/Login/Login.vue'),
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: () => import('pages/Login/Register.vue'),
  },
  {
    path: '/main',
    name: '/MainPage',
    component: () => import('pages/Main/MainPage.vue'),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: '/mytickets',
    name: '/MyTickets',
    component: () => import('pages/Main/MyTickets.vue'),
    meta: {
      requireAuth: true,
    },
  },
  

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
