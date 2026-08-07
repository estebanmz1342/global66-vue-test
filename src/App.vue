<script setup lang="ts">
import { RouterView } from 'vue-router'

import Loader from './components/global/Loader.vue'
import { useGlobalStore } from './store/global.store'

const globalStore = useGlobalStore()
</script>

<template>
  <Loader v-if="globalStore.isLoading" />
  <RouterView />
</template>
