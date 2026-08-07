<script setup lang="ts">
import { RouterView } from 'vue-router'

import Loader from './components/global/Loader.vue'
import { useGlobalStore } from './store/global.store'
import Menu from './components/global/Menu.vue'

const globalStore = useGlobalStore()
</script>

<template>
  <Menu />
  <Loader v-if="globalStore.isLoading" />
  <RouterView />
</template>
