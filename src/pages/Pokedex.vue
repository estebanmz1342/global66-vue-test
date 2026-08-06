<script lang="ts" setup>
import { onBeforeUnmount, onMounted } from 'vue'

import Slider from '../components/onboarding/Slider.vue'
import { globalStore } from '../store/global.store'

const LOADING_DELAY_MS = 1900

let loadingTimer: ReturnType<typeof window.setTimeout> | undefined

onMounted(() => {
  globalStore.setLoading(true)

  loadingTimer = window.setTimeout(() => {
    globalStore.setLoading(false)
  }, LOADING_DELAY_MS)
})

onBeforeUnmount(() => {
  if (loadingTimer) {
    window.clearTimeout(loadingTimer)
  }

  globalStore.setLoading(false)
})
</script>

<template>
  <div>POKEDEX</div>
  <Slider
    v-if="!globalStore.isOnboardingFinished"
    @finish="globalStore.setOnboardingFinished(true)"
  />
</template>

<style></style>
