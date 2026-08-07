<script lang="ts" setup>
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue?: string
    placeholder?: string
  }>(),
  {
    modelValue: '',
    placeholder: 'Procurar Pokémon...',
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'search'): void
}>()

const searchValue = computed({
  get: () => props.modelValue,
  set: (value: string) => emit('update:modelValue', value),
})
</script>

<template>
  <form class="search-and-filter-wrapper" @submit.prevent="emit('search')">
    <label class="search-and-filter">
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
      type="submit"
      aria-label="Search Pokémon"
    >
      search
    </button>
  </form>
</template>

<style scoped>
.search-and-filter-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  gap: 0.875rem;
}

.search-and-filter {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  max-width: 400px;
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
  border: 0;
  outline: 0;
  background: transparent;
  color: #a9a9a9;
  font-family: Poppins, sans-serif;
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
</style>
