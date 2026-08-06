import { createRouter, createWebHistory } from 'vue-router'
import Pokedex from '../pages/Pokedex.vue'
import Favorites from '../pages/Favorites.vue'
import Regions from '../pages/Regions.vue'
import Details from '../pages/[name]/Details.vue'

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
      path: '/:name/details',
      name: 'details',
      component: Details,
    },
  ],
})
