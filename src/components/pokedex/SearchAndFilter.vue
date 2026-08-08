<script lang="ts" setup>
import { computed } from 'vue'
import { ref } from 'vue'

import Modal from '@/components/global/Modal.vue'
import PokemonTypeFilter from '@/components/global/PokemonTypeFilter.vue'

const props = withDefaults(
  defineProps<{
    modelValue?: string
    placeholder?: string
    selectedTypes?: string[]
  }>(),
  {
    modelValue: '',
    placeholder: 'Procurar Pokémon...',
    selectedTypes: () => [],
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'search'): void
  (e: 'apply-filter', value: string[]): void
}>()

const searchValue = computed({
  get: () => props.modelValue,
  set: (value: string) => emit('update:modelValue', value),
})

const isFilterOpen = ref(false)

const openFilter = () => {
  isFilterOpen.value = true
}

const closeFilter = () => {
  isFilterOpen.value = false
}

const handleApplyFilter = (types: string[]) => {
  emit('apply-filter', types)
  closeFilter()
}
</script>

<template>
  <div class="search-and-filter-wrapper">
    <form class="search-and-filter" @submit.prevent="emit('search')">
      <label class="search-and-filter__field">
        <span class="search-and-filter__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M10.5 18C14.6421 18 18 14.6421 18 10.5C18 6.35786 14.6421 3 10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18Z"
              stroke="currentColor"
              stroke-width="2.2"
            />
            <path
              d="M21 21L16.5 16.5"
              stroke="currentColor"
              stroke-width="2.2"
              stroke-linecap="round"
            />
          </svg>
        </span>

        <input
          v-model="searchValue"
          class="search-and-filter__input"
          type="search"
          :placeholder="placeholder"
          aria-label="Search Pokémon"
        />
      </label>

      <button
        class="search-button material-symbols-rounded"
        :class="{ 'search-button--active': selectedTypes.length > 0 }"
        type="button"
        aria-label="Open type filters"
        @click="openFilter"
      >
        search
      </button>
    </form>

    <Modal v-model="isFilterOpen">
      <template #header>
        <div class="search-and-filter__modal-heading">
          <h2 class="search-and-filter__modal-title">
            Filtra por tus preferencias
          </h2>
        </div>
      </template>

      <PokemonTypeFilter
        :selected-types="selectedTypes"
        @apply="handleApplyFilter"
        @cancel="closeFilter"
      />
    </Modal>
  </div>
</template>

<style scoped>
.search-and-filter-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.search-and-filter {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.875rem;
  width: 100%;
  max-width: 600px;
  box-sizing: border-box;
  padding: 0.5rem;
}

.search-and-filter__field {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  flex: 1;
  padding: 0.75rem 1rem;
  box-sizing: border-box;
  border-radius: 999px;
  background: white;
  border: 1px solid #e0e0e0;
}

.search-and-filter__icon {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  color: #a9a9a9;
}

.search-and-filter__icon svg {
  width: 100%;
  height: 100%;
}

.search-and-filter__input {
  flex: 1;
  border: 0;
  outline: 0;
  background: transparent;
  color: #a9a9a9;
  font-family: var(--typography), sans-serif;
  font-size: 1rem;
  line-height: 1;
}

.search-and-filter__input::placeholder {
  color: #a9a9a9;
  opacity: 1;
}

.search-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: white;
  color: #a9a9a9;
  cursor: pointer;
  border: 1px solid #e0e0e0;
}

.search-button--active {
  background: #1e88e5;
  color: #ffffff;
  border-color: #1e88e5;
  box-shadow: 0 10px 24px rgba(30, 136, 229, 0.2);
}

.search-and-filter__modal-heading {
  width: 100%;
}

.search-and-filter__modal-title {
  margin: 0;
  color: #121212;
  font-family: Poppins, sans-serif;
  font-size: 1.375rem;
  font-weight: 600;
  line-height: 1.15;
}
</style>
