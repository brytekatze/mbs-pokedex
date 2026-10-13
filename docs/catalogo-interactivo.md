# Catálogo interactivo y filtros

## Objetivo

Actualizar la experiencia del catálogo para que la exploración sea más visual y fluida: búsqueda reactiva contra la PokéAPI, carga progresiva y filtros útiles, con la identidad visual de Pokémon (rojo, amarillo y azul).

## Cambios realizados

- Se sustituyó la paginación visible por infinite scroll con bloques de 24 Pokémon.
- La búsqueda consulta la PokéAPI por nombre o ID con debounce y devuelve el resultado exacto desde el primer momento (ver fichas 0.4.x y la revisión `revision-catalogo-interactivo.md`).
- Se agregaron filtros por tipo, generación y orden por número o nombre. Tipo es un combobox multiselección con opciones marcables; los filtros activos aparecen como chips removibles.
- Los controles se ordenan como Search, Ordenar, Generación y Tipo.
- Se actualizó la identidad visual: fondo rojo predominante con acentos amarillo y azul, logo de Pokémon en PNG centrado, panel de filtros y tarjetas con fondo blanco, y contraste corregido.

## Archivos afectados

- `app/page.tsx`
- `app/layout.tsx`
- `components/pokemon/PokemonExplorer.tsx`
- `components/pokemon/PokemonCard.tsx`
- `components/ui/SearchInput.tsx`
- `pokemon-logo.png` (nuevo)
- `package.json` y `package-lock.json`
- `CHANGELOG.md`

## Decisiones técnicas

La página sigue siendo un Server Component y entrega el primer bloque renderizado desde el servidor. `PokemonExplorer` concentra el estado interactivo en el cliente y usa `IntersectionObserver` para solicitar el siguiente bloque solo cuando el usuario se acerca al final.

- La **búsqueda es exacta y contra la API** (`getPokemonByQuery` con debounce de 350 ms): un nombre o ID cualquiera se encuentra aunque ese Pokémon aún no esté cargado. Mientras hay búsqueda activa se ocultan el contador de cargados y el infinite scroll.
- **"Todas las generaciones" no declara rango de id**: así incluye también las formas con id > 1025 (mega, regionales, etc.), que solo son visibles en esta opción.
- Los filtros de tipo/generación se aplican sobre los bloques ya cargados (o sobre el resultado exacto de la búsqueda), evitando llamadas masivas y manteniendo la paginación de PokéAPI controlada.

## Cómo verificar/probar

1. Ejecutar `npm run dev`.
2. Escribir un nombre o ID en el buscador (ej. `mew`, `25`) y comprobar que aparece el resultado aunque la lista no esté cargada.
3. Cambiar tipo, generación y orden; quitar filtros desde los chips.
4. Desplazarse al final para comprobar la carga automática del siguiente bloque.
5. Ejecutar `npm run lint` y `npm run build`.

## Pendientes

- El filtrado por tipo/generación se limita a los Pokémon ya cargados para evitar descargar la lista completa de PokéAPI; al seguir desplazándose, el conjunto filtrable se amplía progresivamente.
- Recorrer el catálogo completo supone ~1.400 peticiones al cliente desde el navegador; documentado como coste aceptado de la carga progresiva.
- Evaluar en Next 16 la migración de `fetch` + `revalidate` al modelo `"use cache"` de `cacheComponents`.