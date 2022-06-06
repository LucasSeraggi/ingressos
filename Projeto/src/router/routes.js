
const routes = [
  {
    path: '/',
    name: 'LoginPage',
    component: () => import('pages/Login/Login.vue'),
  },
  {
    path: '/main',
    name: '/MainPage',
    component: () => import('pages/Main/MainPage.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
