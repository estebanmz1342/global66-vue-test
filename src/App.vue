<script setup lang="ts">
import { RouterView } from 'vue-router'

import Loader from './components/global/Loader.vue'
import Menu from './components/global/Menu.vue'
import { useGlobalStore } from './store/global.store'

const globalStore = useGlobalStore()
</script>

<template>
  <Menu v-if="globalStore.isOnboardingFinished" />
  <Loader v-if="globalStore.isLoading" />
  <RouterView />
</template>
