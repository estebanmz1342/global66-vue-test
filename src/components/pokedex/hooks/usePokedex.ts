import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

import { usePokeApi } from '@/api/composables/usePokeApi'
import { useGlobalStore } from '@/store/global.store'
import type { Pokemon } from '@/types/types'

const INITIAL_LIMIT = 20
const INITIAL_OFFSET = 0
const LOADING_DELAY_MS = 1900
const SEARCH_DEBOUNCE_MS = 1000
const MIN_SEARCH_LENGTH = 3

type Timer = ReturnType<typeof setTimeout>

export const usePokedex = () => {
  const pokeApi = usePokeApi()
  const globalStore = useGlobalStore()
  const router = useRouter()
  const pokemons = ref<Pokemon[]>([])
  const initialPokemons = ref<Pokemon[]>([])
  const searchValue = ref('')
  const isSearching = ref(false)

  let loadingTimer: Timer | undefined
  let searchTimer: Timer | undefined

  const isOnboardingFinished = computed(() => globalStore.isOnboardingFinished)
  const canSearch = computed(
    () => searchValue.value.trim().length >= MIN_SEARCH_LENGTH,
  )

  const clearLoadingTimer = () => {
    if (loadingTimer) {
      clearTimeout(loadingTimer)
      loadingTimer = undefined
    }
  }

  const clearSearchTimer = () => {
    if (searchTimer) {
      clearTimeout(searchTimer)
      searchTimer = undefined
    }
  }

  const restoreInitialPokemons = () => {
    pokemons.value = [...initialPokemons.value]
  }

  const fetchPokemons = async (
    limit = INITIAL_LIMIT,
    offset = INITIAL_OFFSET,
  ) => {
    globalStore.setLoading(true)
    clearLoadingTimer()

    loadingTimer = setTimeout(() => {
      globalStore.setLoading(false)
    }, LOADING_DELAY_MS)

    try {
      const fetchedPokemons = await pokeApi.getPokemons(limit, offset)
      initialPokemons.value = fetchedPokemons
      pokemons.value = fetchedPokemons

      if (searchValue.value.trim().length >= MIN_SEARCH_LENGTH) {
        await getPokemonByName(searchValue.value)
      }
    } catch (error) {
      console.error('Error fetching pokemons:', error)
      pokemons.value = []
      initialPokemons.value = []
      router.push('/error')
    }
  }

  const getPokemonByName = async (
    name: string,
  ): Promise<Pokemon | undefined> => {
    const normalizedName = name.trim().toLowerCase()

    if (normalizedName.length < MIN_SEARCH_LENGTH) {
      restoreInitialPokemons()
      return undefined
    }

    isSearching.value = true

    try {
      const localMatches = initialPokemons.value.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(normalizedName),
      )

      if (localMatches.length > 0) {
        pokemons.value = localMatches
        return localMatches[0]
      }

      const searchedPokemon = await pokeApi.getPokemonDetails(normalizedName)
      pokemons.value = [searchedPokemon]
      return searchedPokemon
    } catch (error) {
      console.error('Error fetching pokemon by name:', error)
      pokemons.value = []
      router.push('/error')
      return undefined
    } finally {
      isSearching.value = false
    }
  }

  const handleSearch = () => {
    clearSearchTimer()

    const query = searchValue.value.trim()

    if (query.length < MIN_SEARCH_LENGTH) {
      restoreInitialPokemons()
      return
    }

    void getPokemonByName(query)
  }

  const finishOnboarding = () => {
    globalStore.setOnboardingFinished(true)
  }

  watch(searchValue, () => {
    clearSearchTimer()

    const query = searchValue.value.trim()

    if (query.length < MIN_SEARCH_LENGTH) {
      restoreInitialPokemons()
      return
    }

    searchTimer = setTimeout(() => {
      void getPokemonByName(query)
    }, SEARCH_DEBOUNCE_MS)
  })

  onMounted(() => {
    void fetchPokemons()
  })

  onBeforeUnmount(() => {
    clearLoadingTimer()
    clearSearchTimer()
    globalStore.setLoading(false)
  })

  return {
    canSearch,
    fetchPokemons,
    getPokemonByName,
    handleSearch,
    finishOnboarding,
    isOnboardingFinished,
    isSearching,
    pokemons,
    searchValue,
  }
}
