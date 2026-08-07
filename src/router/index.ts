import { createRouter, createWebHistory } from 'vue-router'
import Error from '@/components/pokedex/Error.vue'
import Pokedex from '@/pages/Pokedex.vue'
import Favorites from '@/pages/Favorites.vue'
import Regions from '@/pages/Regions.vue'
import Details from '@/pages/[name]/Details.vue'
import Profile from '@/pages/Profile.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Pokedex,
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: Favorites,
    },
    {
      path: '/regions',
      name: 'regions',
      component: Regions,
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
    },
    {
      path: '/:name/details',
      name: 'details',
      component: Details,
    },
    {
      path: '/error',
      name: 'Error',
      component: Error,
    },
  ],
})
