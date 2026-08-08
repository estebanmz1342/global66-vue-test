import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

import { usePokeApi } from '@/api/composables/usePokeApi'
import { usePokemonTypeApi } from '@/api/composables/usePokemonTypeApi'
import { useGlobalStore } from '@/store/global.store'
import type { Pokemon } from '@/types/types'

const INITIAL_LIMIT = 20
const INITIAL_OFFSET = 0
const SEARCH_DEBOUNCE_MS = 1000
const MIN_SEARCH_LENGTH = 3

type Timer = ReturnType<typeof setTimeout>

export const usePokedex = () => {
  const pokeApi = usePokeApi()
  const pokemonTypeApi = usePokemonTypeApi()
  const globalStore = useGlobalStore()
  const router = useRouter()
  const pokemons = ref<Pokemon[]>([])
  const initialPokemons = ref<Pokemon[]>([])
  const typeFilteredPokemons = ref<Pokemon[]>([])
  const searchValue = ref('')
  const selectedTypes = ref<string[]>([])
  const isSearching = ref(false)
  const isLoadingMore = ref(false)
  const hasMorePokemons = ref(true)
  const currentOffset = ref(INITIAL_OFFSET)

  let searchTimer: Timer | undefined

  const isOnboardingFinished = computed(() => globalStore.isOnboardingFinished)
  const canSearch = computed(
    () => searchValue.value.trim().length >= MIN_SEARCH_LENGTH,
  )

  const clearSearchTimer = () => {
    if (searchTimer) {
      clearTimeout(searchTimer)
      searchTimer = undefined
    }
  }

  const restoreInitialPokemons = () => {
    pokemons.value = [...initialPokemons.value]
  }

  const restoreCurrentPokemons = () => {
    pokemons.value =
      selectedTypes.value.length > 0
        ? [...typeFilteredPokemons.value]
        : [...initialPokemons.value]
  }

  const normalizeTypes = (types: string[]) =>
    Array.from(
      new Set(types.map((type) => type.trim().toLowerCase()).filter(Boolean)),
    )

  const pokemonMatchesTypes = (pokemon: Pokemon, types: string[]) =>
    types.length === 0 || types.some((type) => pokemon.types.includes(type))

  const filterPokemonsByName = (pokemonsToFilter: Pokemon[], query: string) => {
    const normalizedQuery = query.trim().toLowerCase()

    if (normalizedQuery.length < MIN_SEARCH_LENGTH) {
      return [...pokemonsToFilter]
    }

    return pokemonsToFilter.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(normalizedQuery),
    )
  }

  const fetchPokemons = async (
    limit = INITIAL_LIMIT,
    offset = INITIAL_OFFSET,
  ) => {
    hasMorePokemons.value = true
    currentOffset.value = offset

    try {
      const {
        pokemons: fetchedPokemons,
        hasMore,
        nextOffset,
      } = await pokeApi.getPokemonBatch(limit, offset)
      initialPokemons.value = fetchedPokemons
      pokemons.value = fetchedPokemons
      hasMorePokemons.value = hasMore
      currentOffset.value = nextOffset ?? offset + fetchedPokemons.length

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

  const loadMorePokemons = async (limit = INITIAL_LIMIT) => {
    if (isLoadingMore.value || !hasMorePokemons.value) {
      return
    }

    isLoadingMore.value = true

    try {
      const {
        pokemons: fetchedPokemons,
        hasMore,
        nextOffset,
      } = await pokeApi.getPokemonBatch(limit, currentOffset.value)

      initialPokemons.value = [...initialPokemons.value, ...fetchedPokemons]
      hasMorePokemons.value = hasMore
      currentOffset.value =
        nextOffset ?? currentOffset.value + fetchedPokemons.length

      if (searchValue.value.trim().length >= MIN_SEARCH_LENGTH) {
        await getPokemonByName(searchValue.value)
        return
      }

      restoreInitialPokemons()
    } catch (error) {
      console.error('Error loading more pokemons:', error)
      router.push('/error')
    } finally {
      isLoadingMore.value = false
    }
  }

  const getPokemonByName = async (
    name: string,
  ): Promise<Pokemon | undefined> => {
    const normalizedName = name.trim().toLowerCase()

    if (normalizedName.length < MIN_SEARCH_LENGTH) {
      restoreCurrentPokemons()
      return undefined
    }

    isSearching.value = true

    try {
      const sourcePokemons =
        selectedTypes.value.length > 0
          ? typeFilteredPokemons.value
          : initialPokemons.value

      const localMatches = filterPokemonsByName(sourcePokemons, normalizedName)

      if (localMatches.length > 0) {
        const filteredMatches = selectedTypes.value.length
          ? localMatches.filter((pokemon) =>
              pokemonMatchesTypes(pokemon, selectedTypes.value),
            )
          : localMatches

        pokemons.value = filteredMatches
        return filteredMatches[0]
      }

      const searchedPokemon = await pokeApi.getPokemonDetails(normalizedName)

      if (
        selectedTypes.value.length > 0 &&
        !pokemonMatchesTypes(searchedPokemon, selectedTypes.value)
      ) {
        pokemons.value = []
        return undefined
      }

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

  const applyTypeFilter = async (types: string[]) => {
    const normalizedTypes = normalizeTypes(types)

    clearSearchTimer()
    selectedTypes.value = normalizedTypes

    if (normalizedTypes.length === 0) {
      typeFilteredPokemons.value = []
      hasMorePokemons.value = true

      if (searchValue.value.trim().length >= MIN_SEARCH_LENGTH) {
        await getPokemonByName(searchValue.value)
        return
      }

      restoreInitialPokemons()
      return
    }

    isSearching.value = true

    try {
      const filteredPokemons =
        await pokemonTypeApi.getPokemonsByTypes(normalizedTypes)
      typeFilteredPokemons.value = filteredPokemons
      hasMorePokemons.value = false

      if (searchValue.value.trim().length >= MIN_SEARCH_LENGTH) {
        await getPokemonByName(searchValue.value)
        return
      }

      pokemons.value = [...filteredPokemons]
    } catch (error) {
      console.error('Error fetching pokemon by type:', error)
      pokemons.value = []
      router.push('/error')
    } finally {
      isSearching.value = false
    }
  }

  const handleSearch = () => {
    clearSearchTimer()

    const query = searchValue.value.trim()

    if (query.length < MIN_SEARCH_LENGTH) {
      restoreCurrentPokemons()
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
      restoreCurrentPokemons()
      return
    }

    searchTimer = setTimeout(() => {
      void getPokemonByName(query)
    }, SEARCH_DEBOUNCE_MS)
  })

  return {
    canSearch,
    fetchPokemons,
    getPokemonByName,
    handleSearch,
    finishOnboarding,
    isOnboardingFinished,
    isSearching,
    isLoadingMore,
    hasMorePokemons,
    loadMorePokemons,
    applyTypeFilter,
    pokemons,
    selectedTypes,
    searchValue,
    clearSearchTimer,
  }
}
