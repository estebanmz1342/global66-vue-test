<script lang="ts" setup>
import { computed, ref, watch } from 'vue'

import { TYPES, getTypeInfo } from '@/components/global/hook/TYPES'

const props = withDefaults(
  defineProps<{
    selectedTypes?: string[]
  }>(),
  {
    selectedTypes: () => [],
  },
)

const emit = defineEmits<{
  (e: 'apply', value: string[]): void
  (e: 'cancel'): void
}>()

const isTypeSectionOpen = ref(true)
const draftTypes = ref<string[]>([])

const typeOptions = computed(() =>
  Array.from(TYPES.keys()).map((type) => ({
    key: type,
    label: getTypeInfo(type).name,
  })),
)

const normalizeTypes = (types: string[]) =>
  Array.from(
    new Set(types.map((type) => type.trim().toLowerCase()).filter(Boolean)),
  )

const syncDraftTypes = () => {
  draftTypes.value = normalizeTypes(props.selectedTypes)
}

watch(() => props.selectedTypes, syncDraftTypes, {
  immediate: true,
  deep: true,
})

const isSelected = (type: string) => draftTypes.value.includes(type)

const toggleType = (type: string) => {
  if (isSelected(type)) {
    draftTypes.value = draftTypes.value.filter((item) => item !== type)
    return
  }

  draftTypes.value = [...draftTypes.value, type]
}

const apply = () => {
  emit('apply', normalizeTypes(draftTypes.value))
}
</script>

<template>
  <div class="pokemon-type-filter">
    <section class="pokemon-type-filter__section">
      <button
        class="pokemon-type-filter__section-toggle"
        type="button"
        :aria-expanded="isTypeSectionOpen"
        @click="isTypeSectionOpen = !isTypeSectionOpen"
      >
        <span>Tipo</span>
        <span class="material-symbols-rounded pokemon-type-filter__chevron">
          {{ isTypeSectionOpen ? 'expand_less' : 'expand_more' }}
        </span>
      </button>

      <Transition name="filter-collapse">
        <div v-if="isTypeSectionOpen" class="pokemon-type-filter__options">
          <button
            v-for="type in typeOptions"
            :key="type.key"
            class="pokemon-type-filter__option"
            type="button"
            @click="toggleType(type.key)"
          >
            <span class="pokemon-type-filter__label">{{ type.label }}</span>
            <span
              class="pokemon-type-filter__checkbox"
              :class="{ checked: isSelected(type.key) }"
            >
              <span v-if="isSelected(type.key)" class="material-symbols-rounded">
                check
              </span>
            </span>
          </button>
        </div>
      </Transition>
    </section>

    <footer class="pokemon-type-filter__actions">
      <button
        class="pokemon-type-filter__button primary"
        type="button"
        @click="apply"
      >
        Aplicar
      </button>
      <button
        class="pokemon-type-filter__button secondary"
        type="button"
        @click="emit('cancel')"
      >
        Cancelar
      </button>
    </footer>
  </div>
</template>

<style scoped>
.pokemon-type-filter {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.pokemon-type-filter__section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.pokemon-type-filter__section-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0;
  border: 0;
  background: transparent;
  color: #121212;
  font-family: Poppins, sans-serif;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.4;
  cursor: pointer;
}

.pokemon-type-filter__chevron {
  font-size: 1.25rem;
}

.pokemon-type-filter__options {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  max-height: 16rem;
  padding-right: 0.25rem;
  overflow-y: auto;
}

.pokemon-type-filter__option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  padding: 0.625rem 0;
  border: 0;
  border-bottom: 1px solid #ececec;
  background: transparent;
  color: #121212;
  font-family: Poppins, sans-serif;
  font-size: 0.98rem;
  line-height: 1.35;
  cursor: pointer;
  text-align: left;
}

.pokemon-type-filter__label {
  flex: 1;
}

.pokemon-type-filter__checkbox {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.15rem;
  height: 1.15rem;
  border: 1.5px solid #d7d7d7;
  border-radius: 0.25rem;
  color: #ffffff;
  transition:
    background-color 160ms ease,
    border-color 160ms ease,
    color 160ms ease;
}

.pokemon-type-filter__checkbox.checked {
  background: #1e88e5;
  border-color: #1e88e5;
}

.pokemon-type-filter__checkbox .material-symbols-rounded {
  font-size: 0.95rem;
}

.pokemon-type-filter__actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-top: 0.5rem;
}

.pokemon-type-filter__button {
  width: 100%;
  min-height: 3rem;
  border: 0;
  border-radius: 999px;
  font-family: Poppins, sans-serif;
  font-size: 1.05rem;
  font-weight: 600;
  cursor: pointer;
}

.pokemon-type-filter__button.primary {
  background: linear-gradient(135deg, #1e88e5 0%, #2f9fff 100%);
  color: #ffffff;
  box-shadow: 0 10px 24px rgba(30, 136, 229, 0.25);
}

.pokemon-type-filter__button.secondary {
  background: #efefef;
  color: #121212;
}

.filter-collapse-enter-active,
.filter-collapse-leave-active {
  transition:
    opacity 160ms ease,
    transform 160ms ease;
}

.filter-collapse-enter-from,
.filter-collapse-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
