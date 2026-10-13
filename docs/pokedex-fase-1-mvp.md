# Pokédex Fase 1 (MVP)

## Objetivo

Crear el catálogo inicial de la Pokédex y una vista de detalle consumiendo PokéAPI, con navegación server-side, búsqueda y estados de carga/error.

## Cambios realizados

- Se implementó el catálogo paginado en `/` con 24 Pokémon por página y búsqueda por nombre o ID mediante `searchParams`.
- Se implementó `/pokemon/[id]` con official artwork, tipos, altura, peso, habilidades, descripción en español con fallback a inglés y estadísticas base.
- Se centralizaron los accesos a PokéAPI y se tiparon los contratos usados.
- Se añadieron componentes de dominio/UI, skeletons y manejo de errores.

## Archivos afectados

- `types/pokemon.ts`, `services/pokeapi.ts`, `lib/colors.ts`, `lib/utils.ts`.
- `components/pokemon/*`, `components/ui/*`.
- `app/page.tsx`, `app/loading.tsx`, `app/error.tsx`, `app/pokemon/[id]/*`.
- `next.config.ts`, `app/layout.tsx`, `app/globals.css`.

## Decisiones técnicas

- Los listados usan `limit=24` y `offset` calculado en servidor; los 24 detalles se resuelven en paralelo con `Promise.all`.
- La búsqueda se mantiene como input cliente con debounce, pero la consulta final se resuelve en el servidor.
- Se usa `next/image` con el official artwork de GitHub y un `remotePattern` acotado al pathname de sprites.
- La descripción prioriza el idioma `es` y limpia saltos de línea propios de PokéAPI.
- Se retiró la carga remota de fuentes de la plantilla inicial para mantener el build reproducible sin red.

## Cómo verificar/probar

1. Ejecutar `npm run lint`.
2. Ejecutar `npm run build`.
3. Abrir `/`, cambiar de página y buscar `pikachu` o `25`.
4. Abrir una tarjeta y comprobar `/pokemon/[id]`; probar también un ID inexistente.

## Pendientes

Las funciones de Fase 2 —batallas, autenticación, base de datos, evolución interactiva, filtros por generación y favoritos— quedan fuera de este MVP.
