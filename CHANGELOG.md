# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.4.5] - 2026-10-12

### Changed

- El fondo del área de imágenes de cada card ahora también es blanco para integrarse con la tarjeta.

## [0.4.4] - 2026-10-12

### Fixed

- El menú multiselección de tipos se muestra por encima de las tarjetas.

### Changed

- El panel de búsqueda/filtros y las tarjetas recuperan el fondo blanco sobre el fondo rojo de la página.

## [0.4.3] - 2026-10-12

### Changed

- El fondo pasa a tener rojo como color predominante, con amarillo y azul como acentos.
- El título textual se sustituye por el PNG del logo de Pokémon centrado.
- La descripción existente se mantiene debajo del logo.

## [0.4.2] - 2026-10-12

### Changed

- El filtro de tipo permite seleccionar varios tipos simultáneamente mediante un combobox desplegable.
- Se reduce el uso de blanco y se aplica una paleta basada en amarillo, rojo, azul y azul marino de Pokémon.

## [0.4.1] - 2026-10-12

### Changed

- Tipo se presenta como combobox y los chips representan únicamente filtros activos removibles.
- Los controles se ordenan como búsqueda, orden, generación y tipo.
- El encabezado muestra solo “Pokédex” y su descripción ocupa el ancho completo.

## [0.4.0] - 2026-10-12

### Added

- Infinite scroll con carga progresiva de bloques de Pokémon.
- Filtros reactivos por tipo, generación y orden alfabético o numérico.

### Changed

- La búsqueda ahora filtra nombres e IDs conforme se escribe.
- Se renueva el fondo y la paleta visual con colores inspirados en Pokémon.
- Se elimina la leyenda “PokéAPI · Fase 1” del encabezado.

### Removed

- La navegación de paginación anterior y su dependencia de parámetros `page`/`q` en la URL.

## [0.3.1] - 2026-10-12

### Fixed

- La paginación ya no revierte a la primera página al pulsar "Anterior"/"Siguiente".
- El catálogo acota la página solicitada al rango disponible en lugar de mostrar un estado vacío.
- El mensaje "no encontramos ese Pokémon" usa el total real de Pokémon en lugar de un valor fijo.
- Se corrige el contraste de textos secundarios (`slate-400` → `slate-500`) detectado por Lighthouse.
- Los controles deshabilitados de paginación ya no son navegables con teclado.

### Changed

- `SearchInput` solo actualiza la URL cuando el término de búsqueda cambia realmente.
- El catálogo usa el componente `PokemonGrid` en lugar de duplicar el grid en la página.
- Se reformatea el JSX de páginas y componentes a un formato multilínea legible y consistente.
- Los botones de reintento de los `error.tsx` ahora declaran `type="button"`.

### Removed

- `docs/agentes-y-convenciones.md`, que duplicaba reglas ya presentes en `AGENTS.md`.

## [0.3.0] - 2026-10-12

### Added

- Catálogo Pokédex paginado y buscable con datos reales de PokéAPI.
- Vista de detalle con descripción localizada, tipos, medidas, habilidades y estadísticas base.
- Componentes tipados, estados de carga/error y estilos responsivos con Tailwind CSS.

### Changed

- Configuración de `next/image` para servir official artwork desde `raw.githubusercontent.com`.
- La tipografía del layout usa una pila local para evitar fallos de build por descargas externas.

## [0.2.0] - 2026-10-12

### Added

- Especificación OpenAPI oficial de PokéAPI en `context/openapi/pokeapi.yml` (OpenAPI 3.1.0, 102 endpoints, 278 schemas) como contrato de referencia para tipos y servicios.
- Carpeta `docs/` con documentación en Markdown de cada tarea y su índice `docs/README.md`.
- `CHANGELOG.md` siguiendo la estructura de [Keep a Changelog 1.1.0](https://keepachangelog.com/en/1.1.0/).
- Sección 5 en `AGENTS.md` con las reglas obligatorias de documentación, versionado (SemVer) y changelog.

### Changed

- `AGENTS.md`: se amplía la estructura de archivos reportada y el flujo de trabajo de Codex (documentar, versionar y registrar cada cambio).

[Unreleased]: https://github.com/brytekatze/mbs-pokedex/compare/v0.4.5...HEAD
[0.4.5]: https://github.com/brytekatze/mbs-pokedex/releases/tag/v0.4.5
[0.4.4]: https://github.com/brytekatze/mbs-pokedex/releases/tag/v0.4.4
[0.4.3]: https://github.com/brytekatze/mbs-pokedex/releases/tag/v0.4.3
[0.4.2]: https://github.com/brytekatze/mbs-pokedex/releases/tag/v0.4.2
[0.4.1]: https://github.com/brytekatze/mbs-pokedex/releases/tag/v0.4.1
[0.4.0]: https://github.com/brytekatze/mbs-pokedex/releases/tag/v0.4.0
[0.3.1]: https://github.com/brytekatze/mbs-pokedex/releases/tag/v0.3.1
[0.3.0]: https://github.com/brytekatze/mbs-pokedex/releases/tag/v0.3.0
[0.2.0]: https://github.com/brytekatze/mbs-pokedex/releases/tag/v0.2.0
