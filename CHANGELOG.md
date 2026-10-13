# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

[Unreleased]: https://github.com/brytekatze/mbs-pokedex/compare/v0.3.1...HEAD
[0.3.1]: https://github.com/brytekatze/mbs-pokedex/releases/tag/v0.3.1
[0.3.0]: https://github.com/brytekatze/mbs-pokedex/releases/tag/v0.3.0
[0.2.0]: https://github.com/brytekatze/mbs-pokedex/releases/tag/v0.2.0
