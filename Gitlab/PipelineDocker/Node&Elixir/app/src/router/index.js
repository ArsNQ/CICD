import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store';

Vue.use(VueRouter)

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
  },
  {
    path: '/dashboard/user/:user_id',
    name: 'UserDashboard',
    component: () => import('../views/UserDashboard.vue'),
  },
  {
    path: '/Administration',
    name: 'Administration',
    component: () => import('../views/Administration.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/teams',
    name: 'Teams',
    component: () => import('../views/Teams.vue')
  },
  {
    path: '/teams/create',
    name: 'CreateTeam',
    component: () => import('../views/CreateTeam.vue')
  },
  {
    path: '/teams/:teamId',
    name: 'Team',
    component: () => import('../views/Team.vue')
  },
  {
    path: '/sign',
    name: 'Sign',
    component: () => import('../views/Sign.vue')
  },
  {
    path :'*',
    redirect: "/Dashboard"
  }
];


const router = new VueRouter({
  mode: 'history',
  routes
});

router.beforeEach((to, from, next) => {
  if (store.getters["user/me"].isConnected === false && to.name !== 'Sign') return next("/Sign");
  if (store.getters["user/me"].isConnected && to.name.toLowerCase() === 'sign' ) return next("/Dashboard");
  return next();
});

export default router
