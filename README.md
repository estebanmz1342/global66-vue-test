# Global66 Vue Test

Aplicación tipo Pokédex construida con Vue 3, TypeScript y Vite. El proyecto consume datos de PokeAPI, maneja estado global con Pinia y organiza la experiencia en pantallas de listado, detalle, favoritos, perfil y regiones.

_Realizado por_ `Juan Esteban Muñoz Salazar`

## Resumen

La app incluye:

- Onboarding inicial con slider y persistencia local.
- Pokedex con búsqueda, filtros por tipo y carga incremental.
- Vista de detalle con información extendida del Pokemon.
- Favoritos persistidos en `localStorage`.
- Rutas globales para error y pantallas en construcción.
- Capa de pruebas con Vitest.

## Stack

- Vue 3
- TypeScript
- Vite
- Vue Router
- Pinia
- Axios
- Vitest

## Scripts

- `npm run dev`: levanta el entorno local.
- `npm run build`: compila la app para producción.
- `npm run preview`: previsualiza el build.
- `npm run test`: ejecuta Vitest en modo observación.
- `npm run test:run`: ejecuta Vitest una sola vez.
- `npm run lint`: revisa calidad de código con ESLint.
- `npm run lint:fix`: corrige automáticamente lo que ESLint permita.
- `npm run format`: formatea el proyecto con Prettier.
- `npm run format:check`: valida el formato sin modificar archivos.

## Rutas

- `/`: Pokedex principal.
- `/favorites`: Favoritos.
- `/regions`: Pantalla en construcción.
- `/profile`: Perfil.
- `/:name/details`: Detalle de un Pokemon.
- `/error`: Vista de error global.

## Evolución del proyecto

La historia del repositorio muestra una evolución bastante ordenada. La resumo en el mismo orden en que se fue construyendo el producto:

### 1. Base de proyecto

Primero se generó la estructura inicial con Vite, TypeScript y las reglas de lint/formato. En esta etapa también se sumaron recursos gráficos, tipografía, alias de importación y assets básicos para dejar lista la base visual y técnica.

### 2. Onboarding

Después se construyó el flujo inicial de bienvenida con slider y comportamiento de primera carga. Este paso definió la entrada a la aplicación y preparó la experiencia para que el usuario pudiera avanzar al resto de la Pokédex.

### 3. Estado global y persistencia (loader)

Luego se incorporó Pinia para manejar el estado global, el loading general y la persistencia del onboarding. También se integró el loader global para representar mejor los estados de espera de la aplicación.

### 4. Capa de datos y consumo de API

A continuación se incorporó Axios, `apiClient`, `useServiceApi` y los composables para consultar PokeAPI. A partir de ahí se agregaron mappers, tipos y helpers para separar la transformación de datos del consumo de red.

### 5. Experiencia principal de Pokédex

Después se construyó la experiencia central: cards, lista, búsqueda, filtros por tipo y carga incremental. Esta capa también fue evolucionando para soportar debounce de búsqueda, combinación de filtros y navegación hacia la vista de detalle.

### 6. Favoritos

Más adelante se ajustó la página de favoritos, el estado vacío y la lógica de renderizado para reflejar cambios de storage correctamente. También se dejó la persistencia lista para conservar los Pokemon guardados entre sesiones.

### 7. Menú

En paralelo se sumó el menú global para la navegación principal de la aplicación. También se ajustó su comportamiento para no mostrarse mientras el onboarding seguía activo.

### 8. Vista de detalle y enriquecimiento de información

La vista de detalle fue agregando componentes propios e información extra como species, habilidades, atributos y debilidades. Esto permitió pasar de una simple lista a una experiencia más completa de exploración.

### 9. Calidad y estandarización de código

La última capa del flujo principal se enfocó en mantener el proyecto consistente: reglas de lint, orden de imports, tipado, ajustes de estilo y pequeños refactors para sostener el crecimiento del código.

La parte extra que no está en `main` se documenta en [10. Extras y pruebas](#10-extras-y-pruebas), porque extiende el consumo de APIs para completar la información de la pantalla fuera de lo pedido inicialmente.

### 10. Extras y pruebas

Estas ramas no están mergeadas en `main` porque incluyen consumo adicional de APIs por fuera de lo solicitado, con el objetivo de tener toda la información de la pantalla disponible durante la exploración.

1. `feature/extras`
   - Amplia el comportamiento de filtro y búsqueda en la Pokédex.
   - Agrega más consumo y combinación de datos para enriquecer la información mostrada.
   - [PR feature/extras con `main`](https://github.com/estebanmz1342/global66-vue-test/pull/11)
2. `feature/testing`
   - Incorpora Vitest al proyecto.
   - Prepara la base de pruebas para validar el comportamiento del flujo principal.
   - [PR feature/testing con `main`](https://github.com/estebanmz1342/global66-vue-test/pull/12)

## Estructura general

- `src/api`: cliente HTTP y composables de consumo.
- `src/components`: componentes globales, de Pokédex, favoritos, onboarding, detalle y regiones.
- `src/store`: stores de Pinia.
- `src/mappers`: transformación de respuestas de API.
- `src/types`: definiciones de tipos de dominio y API.
- `src/utils`: utilidades compartidas.
- `src/pages`: páginas de la aplicación.

## Notas

- La vista `regions` está marcada como WIP.
- La navegación y el estado global dependen de Pinia y Vue Router.
- Los favoritos y el onboarding sobreviven recargas gracias a `localStorage`.
