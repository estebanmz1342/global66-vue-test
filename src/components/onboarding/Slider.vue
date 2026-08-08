<script lang="ts" setup>
import { computed, ref } from 'vue'

import OnboardingImg1 from '../../assets/onboarding-1.svg'
import OnboardingImg2 from '../../assets/onboarding-2.svg'
import Slide from './Slide.vue'
import Button from '../global/Button.vue'

type SlideItem = {
  image: string
  title: string
  text: string
}

const slides: SlideItem[] = [
  {
    image: OnboardingImg1,
    title: 'Todos los Pokémon en un solo lugar',
    text: 'Accede a una amplia lista de Pokémon de todas las generaciones creadas por Nintendo',
  },
  {
    image: OnboardingImg2,
    title: 'Mantén tu Pokédex actualizada',
    text: 'Regístrate y guarda tu perfil, Pokémon favoritos, configuraciones y mucho más en la aplicación',
  },
]

const emit = defineEmits<{
  (e: 'finish'): void
}>()

const activeSlide = ref(0)
const viewport = ref<HTMLElement | null>(null)

const swipe = ref({
  isDragging: false,
  startX: 0,
  deltaX: 0,
  pointerId: -1,
})

const lastSlideIndex = computed(() => slides.length - 1)
const isLastSlide = computed(() => activeSlide.value === lastSlideIndex.value)
const ctaLabel = computed(() => (isLastSlide.value ? 'Empecemos' : 'Continuar'))

const trackStyle = computed(() => {
  const dragPercent = swipe.value.isDragging
    ? (swipe.value.deltaX / (viewport.value?.clientWidth || 1)) * 100
    : 0

  return {
    transform: `translate3d(calc(-${activeSlide.value * 100}% + ${dragPercent}%), 0, 0)`,
    transition: swipe.value.isDragging ? 'none' : 'transform 280ms ease',
  }
})

const clampSlide = (index: number) => {
  return Math.min(Math.max(index, 0), lastSlideIndex.value)
}

const goToSlide = (index: number) => {
  activeSlide.value = clampSlide(index)
}

const nextSlide = () => {
  if (activeSlide.value === lastSlideIndex.value) {
    emit('finish')
    return
  }

  activeSlide.value += 1
}

const previousSlide = () => {
  if (activeSlide.value > 0) {
    activeSlide.value -= 1
  }
}

const handlePrimaryAction = () => {
  nextSlide()
}

const handlePointerDown = (event: PointerEvent) => {
  if (event.pointerType === 'mouse' && event.button !== 0) {
    return
  }

  swipe.value.isDragging = true
  swipe.value.startX = event.clientX
  swipe.value.deltaX = 0
  swipe.value.pointerId = event.pointerId

  const target = event.currentTarget as HTMLElement | null
  target?.setPointerCapture(event.pointerId)
}

const handlePointerMove = (event: PointerEvent) => {
  if (!swipe.value.isDragging || swipe.value.pointerId !== event.pointerId) {
    return
  }

  swipe.value.deltaX = event.clientX - swipe.value.startX
}

const finishSwipe = (event: PointerEvent) => {
  if (!swipe.value.isDragging || swipe.value.pointerId !== event.pointerId) {
    return
  }

  const threshold = Math.max(40, (viewport.value?.clientWidth || 0) * 0.2)
  const offset = swipe.value.deltaX

  if (offset <= -threshold) {
    nextSlide()
  } else if (offset >= threshold) {
    previousSlide()
  }

  swipe.value.isDragging = false
  swipe.value.deltaX = 0
  swipe.value.pointerId = -1
}
</script>

<template>
  <section class="slider" aria-label="Onboarding">
    <div
      ref="viewport"
      class="slider__viewport"
      @pointerdown="handlePointerDown"
      @pointermove="handlePointerMove"
      @pointerup="finishSwipe"
      @pointercancel="finishSwipe"
      @lostpointercapture="finishSwipe"
    >
      <div class="slider__track" :style="trackStyle">
        <article
          v-for="(slide, index) in slides"
          :key="slide.title"
          class="slider__slide"
        >
          <Slide
            :image="slide.image"
            :title="slide.title"
            :text="slide.text"
            :class="{ 'is-active': index === activeSlide }"
          />
        </article>
      </div>
    </div>

    <nav class="slider__dots" aria-label="Seleccionar slide">
      <button
        v-for="(slide, index) in slides"
        :key="slide.title"
        class="slider__dot"
        :class="{ 'is-active': index === activeSlide }"
        type="button"
        :aria-label="`Ir al slide ${index + 1}`"
        :aria-current="index === activeSlide ? 'true' : undefined"
        @click="goToSlide(index)"
      />
    </nav>

    <Button :variant="'primary'" @click="handlePrimaryAction">
      {{ ctaLabel }}
    </Button>
  </section>
</template>

<style scoped>
.slider {
  width: min(50%, 27.5rem);
  margin: 0 auto;
  padding: 1.25rem 1rem 1.5rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.slider__viewport {
  overflow: hidden;
  touch-action: pan-y;
  cursor: grab;
}

.slider__viewport:active {
  cursor: grabbing;
}

.slider__track {
  display: flex;
  align-items: stretch;
  will-change: transform;
}

.slider__slide {
  flex: 0 0 100%;
  box-sizing: border-box;
  padding: 1rem 0 0.75rem;
}

.slider__dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin: 0.5rem 0 1.25rem;
}

.slider__dot {
  width: 0.75rem;
  height: 0.75rem;
  border: 0;
  border-radius: 999px;
  background: #d6dae6;
  padding: 0;
  transition:
    width 180ms ease,
    background-color 180ms ease,
    transform 180ms ease;
}

.slider__dot.is-active {
  width: 2rem;
  background: #1e88e5;
}

.slider__dot:hover {
  transform: scale(1.06);
}

.slider__dot:focus-visible,
.slider__cta:focus-visible {
  outline: 2px solid #1e88e5;
  outline-offset: 3px;
}
</style>
