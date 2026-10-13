# Catálogo interactivo y filtros

## Objetivo

Actualizar la experiencia del catálogo para que la exploración sea más visual y fluida: búsqueda reactiva, carga progresiva y filtros útiles.

## Cambios realizados

- Se sustituyó la paginación visible por infinite scroll con bloques de 24 Pokémon.
- La búsqueda filtra nombres e IDs inmediatamente mientras el usuario escribe.
- Se agregaron filtros por tipo, generación y orden por número o nombre. Tipo y generación se muestran como controles combinables; los filtros activos aparecen como chips removibles.
- Se actualizó la identidad visual con una paleta azul, roja y amarilla inspirada en Pokémon.
- Se eliminó la leyenda “PokéAPI · Fase 1” del encabezado.

## Archivos afectados

- `app/page.tsx`
- `app/layout.tsx`
- `components/pokemon/PokemonExplorer.tsx`
- `components/pokemon/PokemonCard.tsx`
- `components/ui/SearchInput.tsx`
- `package.json` y `package-lock.json`
- `CHANGELOG.md`

## Decisiones técnicas

La página sigue siendo un Server Component y entrega el primer bloque renderizado desde el servidor. `PokemonExplorer` concentra el estado interactivo en el cliente y usa `IntersectionObserver` para solicitar el siguiente bloque solo cuando el usuario se acerca al final. Los filtros se calculan sobre los Pokémon cargados, evitando llamadas masivas y manteniendo la paginación de PokéAPI controlada.

## Cómo verificar/probar

1. Ejecutar `npm run dev`.
2. Escribir un nombre o ID en el buscador y comprobar que las tarjetas se reducen al instante.
3. Cambiar tipo, generación y orden.
4. Desplazarse al final para comprobar la carga automática del siguiente bloque.
5. Ejecutar `npm run lint` y `npm run build`.

## Pendientes

El filtrado por texto se limita a los Pokémon que ya fueron cargados para evitar descargar la lista completa de PokéAPI. Al seguir desplazándose, el conjunto disponible para buscar se amplía progresivamente.
