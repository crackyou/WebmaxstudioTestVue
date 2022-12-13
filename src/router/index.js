import { createRouter, createWebHistory } from 'vue-router'
import RegisterView from '../views/RegisterView.vue'
import HomeView from "@/views/HomeView";

const routes = [
  {
    path: '/',
    name: 'register',
    component: RegisterView,
  },
  {
    path: '/:key',
    name: 'home',
    component: HomeView,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
