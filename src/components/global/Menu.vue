<script lang="ts" setup>
import { useOutsideClick } from '@/utils/use-outside-click'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isMenuVisible = ref<boolean>(false)
const menuElement = ref()
const menuButtonPosition = ref()
const parentComponent = computed(() => {
  return menuButtonPosition.value?.closest('.menu-wrapper') || document.body
})

const routes = [
  {
    name: 'Pokedex',
    path: '/',
    icon: 'home',
  },
  {
    name: 'Favorites',
    path: '/favorites',
    icon: 'favorite',
  },
  {
    name: 'Regions',
    path: '/regions',
    icon: 'language',
  },
  {
    name: 'Perfil',
    path: '/profile',
    icon: 'person',
  },
]

const openMenu = () => {
  isMenuVisible.value = !isMenuVisible.value

  const measureBox = coordinatesBox()
  const contextualMenu = menuElement.value as unknown as HTMLElement
  const body = menuButtonPosition.value?.closest('body')

  contextualMenu.style.top = `${measureBox.yo}px`
  contextualMenu.style.right = `${body!.offsetWidth - measureBox.xo}px`
}

const coordinatesBox = (): {
  xo: number
  yo: number
  xe: number
  ye: number
} => {
  const container = menuButtonPosition.value

  if (!container || !(container instanceof HTMLElement)) {
    throw new Error('filterButtonPosition is not a valid HTMLElement.')
  }

  const positions = container.getBoundingClientRect()

  return {
    xo: positions.x,
    yo: positions.y,
    xe: positions.x + positions.width,
    ye: positions.y + positions.height,
  }
}

const visible = computed(() => ({
  'menu-elements--visible': isMenuVisible.value,
}))

const handleSelection = (path: string) => {
  router.push(path)
  isMenuVisible.value = false
}

useOutsideClick({
  ref: menuElement,
  onClickOutside: () => {
    isMenuVisible.value = false
  },
})
</script>

<template>
  <div class="menu-wrapper">
    <div ref="menuButtonPosition" class="menu">
      <button class="material-symbols-rounded menu-button" @click="openMenu">
        {{ isMenuVisible ? 'close' : 'menu' }}
      </button>
    </div>
    <teleport v-if="parentComponent" :to="parentComponent">
      <section ref="menuElement" class="menu-elements" :class="visible">
        <ul class="menu-list">
          <ol
            v-for="route in routes"
            :key="route.name"
            class="menu-list-item"
            @click="handleSelection(route.path)"
          >
            <span class="material-symbols-rounded">{{ route.icon }}</span>
            <p>{{ route.name }}</p>
          </ol>
        </ul>
      </section>
    </teleport>
  </div>
</template>

<style scoped>
.menu-wrapper {
  position: absolute;
  z-index: 99;
}

.menu-button {
  background-color: white;
  border-radius: 10px;
  margin: 12px;
  color: #a9a9a9;
  font-size: 2rem;
  padding: 0.5rem;
  border: 1px solid #a9a9a9;
  transition: text 1s all;
}

.menu-elements {
  display: none;
  background-color: white;
  border-radius: 12px;
  margin-left: 1rem;

  &.menu-elements--visible {
    display: block;
  }
}

.menu-list {
  display: flex;
  flex-direction: column;
  margin: 0;
  margin-left: 1rem;
  padding: 1.5rem;
  box-shadow:
    0 24px 80px rgba(168, 168, 168, 0.28),
    0 2px 8px rgba(180, 180, 180, 0.08);
  border-radius: 12px;
  gap: 0.625rem;
}

.menu-list-item {
  display: flex;
  width: 10rem;
  padding: 0.425rem 0.75rem;
  gap: 0.625rem;
  border-radius: 12px;
  box-shadow:
    0 24px 80px rgba(168, 168, 168, 0.28),
    0 2px 8px rgba(180, 180, 180, 0.08);
}

.menu-button:hover {
  box-shadow: 0px 1px 76px 0px rgba(0, 0, 0, 0.35);
  -webkit-box-shadow: 0px 1px 76px 0px rgba(0, 0, 0, 0.35);
  transition: all 0.3s;
}

.menu-button:hover,
.menu-list-item:hover {
  cursor: pointer;
}
</style>
