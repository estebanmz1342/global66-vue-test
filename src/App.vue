<script setup lang="ts">
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import Loader from './components/global/Loader.vue'
import { globalStore } from './store/global.store'

const isLoading = computed(() => globalStore.isLoading)
</script>

<template>
  <Loader v-if="isLoading" />
  <RouterView />
</template>
