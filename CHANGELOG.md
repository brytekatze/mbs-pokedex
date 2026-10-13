# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.6.0] - 2026-10-12

### Added

- Nueva identidad visual inspirada en el segmento "¿Quién es ese Pokémon?" de la serie animada: el catálogo muestra el arte oficial como **silueta negra con badge "?"** que se **revela en color al pasar el ratón**.
- Cabecera del catálogo con la tagline retro "¿QUIÉN ES ESE POKÉMON?" en amarillo con sombra dura índigo/azul.

### Changed

- Fondo del catálogo: del rojo a la noche índigo/violeta (`#1e1b4b → #312e81 → #5b21b6`) con glows amarillo, azul y lila.
- Vista de detalle como momento del "reveal": hero índigo/violeta, cartel "¡Es {nombre}!" y acentos de la nueva paleta (`#3b4cca`/`#1e1b4b`).
- El borde de las tarjetas pasa a amarillo al hover y se unifica el navy de acento a `#1e1b4b`.

## [0.5.0] - 2026-10-12

### Fixed

- "Todas las generaciones" ahora incluye todos los Pokémon (antes ocultaba las formas con id > 1025, ej. mega y regionales).
- La búsqueda vuelve a consultar la PokéAPI por nombre o ID desde el primer momento, en lugar de limitarse a lo ya cargado.

### Changed

- La vista de detalle recupera un fondo y acentos acordes a la identidad visual (rojo/amarillo/azul).
- El menú de tipos admite navegación por teclado y declara `aria-haspopup="listbox"`.
- Se consolida el historial 0.4.0–0.4.5 del catálogo interactivo en una sola entrada y se fusiona la documentación duplicada.

### Removed

- `docs/ajustes-controles-catalogo.md`, fusionado con `docs/catalogo-interactivo.md`.

## [0.4.5] - 2026-10-12

### Added

- Infinite scroll con carga progresiva de bloques de 24 Pokémon.
- Filtros reactivos por tipo, generación y orden alfabético o numérico.
- Logo de Pokémon en PNG centrado en el encabezado.

### Changed

- La búsqueda filtra nombres e IDs conforme se escribe (en 0.5.0 se sustituye por la búsqueda contra la API).
- Se renueva la identidad visual: fondo rojo predominante con acentos amarillo y azul, panel de filtros y tarjetas con fondo blanco, e imagen de las tarjetas sobre fondo blanco.
- Tipo se presenta como combobox multiselección; los chips representan únicamente filtros activos removibles, en el orden Search, Ordenar, Generación y Tipo.
- El menú de tipos se muestra por encima del grid de tarjetas.

### Removed

- La navegación de paginación anterior y su dependencia de los parámetros `page`/`q` en la URL.
- La leyenda "PokéAPI · Fase 1" del encabezado.

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

[Unreleased]: https://github.com/brytekatze/mbs-pokedex/compare/v0.6.0...HEAD
[0.6.0]: https://github.com/brytekatze/mbs-pokedex/releases/tag/v0.6.0
[0.5.0]: https://github.com/brytekatze/mbs-pokedex/releases/tag/v0.5.0
[0.4.5]: https://github.com/brytekatze/mbs-pokedex/releases/tag/v0.4.5
[0.3.1]: https://github.com/brytekatze/mbs-pokedex/releases/tag/v0.3.1
[0.3.0]: https://github.com/brytekatze/mbs-pokedex/releases/tag/v0.3.0
[0.2.0]: https://github.com/brytekatze/mbs-pokedex/releases/tag/v0.2.0