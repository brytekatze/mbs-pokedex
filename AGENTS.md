<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Directrices para Codex (Pokédex Next.js)

Este archivo define las reglas de desarrollo, arquitectura y estándares de calidad para guiar el trabajo en este proyecto.

---

## 1. Visión del Proyecto
- **Objetivo**: Crear una Pokédex moderna, rápida y responsiva consumiendo la [PokéAPI](https://pokeapi.co/).
- **Stack Tecnológico**:
  - **Framework**: Next.js 16+ (App Router).
  - **Librería UI**: React 19.
  - **Estilos**: Tailwind CSS v4.
  - **Lenguaje**: TypeScript (Modo estricto).
  - **Alias de importación**: `@/*` mapeado a la raíz del proyecto.

---

## 2. Reglas de Arquitectura y Estructura de Archivos
Toda nueva funcionalidad debe seguir la siguiente estructura:

```text
├── app/                  # Rutas, layouts y páginas (App Router)
│   ├── layout.tsx
│   ├── page.tsx          # Catálogo / Home
│   └── pokemon/
│       └── [id]/page.tsx # Detalle de Pokémon
├── components/           # Componentes modulares
│   ├── pokemon/          # Componentes de dominio Pokémon (Cards, Stats, Badges)
│   └── ui/               # Componentes UI reutilizables (Search, Pagination, Skeleton)
├── services/             # Lógica de consumo de APIs y servicios externos
│   └── pokeapi.ts
├── types/                # Interfaces y types de TypeScript
│   └── pokemon.ts
├── lib/                  # Helpers, constantes y utilidades
│   ├── colors.ts         # Mapeo de colores por tipo de Pokémon
│   └── utils.ts
├── context/              # Material de referencia y contexto del proyecto
│   └── openapi/
│       └── pokeapi.yml   # Especificación OpenAPI oficial de PokéAPI (solo lectura)
├── docs/                 # Documentación en Markdown de cada tarea/cambio (ver sección 5)
│   └── README.md         # Índice de la documentación
└── CHANGELOG.md          # Registro de cambios (Keep a Changelog 1.1.0, ver sección 5)
```

> **Nota**: `context/openapi/pokeapi.yml` es la especificación oficial de PokéAPI (OpenAPI 3.1.0). Es un archivo de **solo lectura** y sirve como contrato de referencia para los tipos y servicios. No debe modificarse manualmente.

---

## 3. Estándares de Código y Buenas Prácticas

### 3.1. Next.js & React
- **Server Components por defecto**: Mantener los componentes en el servidor a menos que requieran interactividad (`useState`, `useEffect`, eventos del DOM), en cuyo caso se debe agregar explícitamente `'use client';` en la primera línea.
- **Optimización de imágenes**: Usar siempre `<Image />` de `next/image` con `width`, `height`, `alt` descriptivo y dominios configurados en `next.config.ts`.
- **Estados de Carga y Errores**:
  - Implementar siempre componentes `loading.tsx` y `error.tsx` o esqueletos (`Skeleton`) mientras se resuelven promesas.
  - Evitar pantallas en blanco o bloqueos visuales.

### 3.2. TypeScript
- **Cero `any`**: Tipar rigurosamente todas las respuestas de PokéAPI, funciones, props de componentes y estados.
- Centralizar interfaces y contratos de datos en la carpeta `types/`.

### 3.3. Estilos con Tailwind CSS v4
- Usar clases de utilidad de Tailwind CSS.
- Diseño **Mobile-First**: asegurar que la interfaz sea totalmente responsiva (móvil, tablet, escritorio).
- Mantener una paleta consistente para los tipos de Pokémon (Fire, Water, Grass, etc.).

### 3.4. Consumo de PokéAPI
- Centralizar todos los `fetch` en `services/pokeapi.ts`.
- Manejar respuestas HTTP no exitosas con `try / catch` y lanzar errores claros.
- Optimizar peticiones concurrentes utilizando `Promise.all` cuando se consulte información de múltiples Pokémon en lote.

---

## 4. Guardarraíles y Restricciones Estrictas (Prohibiciones)

Para mantener el proyecto limpio, ligero y predecible, **queda terminantemente prohibido**:

1. **Dependencias Externas No Autorizadas**:
   - **NO** instalar librerías HTTP (como `axios`). Usar el `fetch` nativo de Next.js / Web API.
   - **NO** instalar gestores de estado globales pesados (`redux`, `zustand`, etc.). El estado debe manejarse mediante Server Components, React hooks (`useState`, `useReducer`) o parámetros de URL (`searchParams`).
   - **NO** instalar librerías de componentes UI completas (MUI, Chakra UI, Ant Design, Shadcn, etc.) salvo petición explícita. La UI se construye con Tailwind CSS v4.
2. **Arquitectura y Enrutamiento**:
   - **NO** crear la carpeta `pages/` ni mezclar Pages Router con App Router. Todo se mantiene en `app/`.
   - **NO** crear API Routes intermediarias (`app/api/...`) como proxies redundantes de la PokéAPI a menos que se requiera transformación compleja en servidor. El consumo debe hacerse directamente desde Server Components o mediante `services/pokeapi.ts`.
3. **TypeScript y Hacks de Tipado**:
   - **NO** usar `any` bajo ninguna circunstancia.
   - **NO** usar directivas que silencien el compilador (`@ts-ignore`, `@ts-expect-error`, `@ts-nocheck`) ni desactivar reglas de ESLint (`eslint-disable`). Si hay un conflicto de tipos, se debe definir el tipo o interfaz adecuada en `types/`.
4. **Consumo de PokéAPI y Rendimiento**:
   - **NO** realizar llamadas masivas sin paginación (ej. traer los 1000+ Pokémon en una sola petición). El listado debe paginarse en bloques controlados (ej. 20 o 24 elementos).
   - **NO** hardcodear datos ficticios o mocks en lugar de consumir los datos reales de PokéAPI.
   - **NO** solicitar o inventar variables de entorno para claves de API; la PokéAPI es pública y no requiere autenticación.
5. **Estilos**:
   - **NO** usar estilos en línea (`style={{ ... }}`) para diseño o maquetación, salvo valores dinámicos calculados estrictamente necesarios (ej. porcentajes dinámicos de barras de progreso).
   - **NO** crear archivos CSS adicionales o `.module.css`. Se utiliza exclusivamente Tailwind CSS v4 y las variables definidas en `app/globals.css`.
6. **Alcance y Archivos de Configuración**:
   - **NO** agregar funcionalidades fuera del alcance acordado (como sistemas de batalla, autenticación con Supabase/Firebase, etc.).
   - **NO** modificar `package.json`, `tsconfig.json` ni archivos raíz salvo que sea indispensable (como habilitar dominios en `next.config.ts`), notificándolo en el resumen. **Excepción**: el incremento de `version` en `package.json` exigido por la sección 5.2 siempre aplica y no requiere justificación adicional.
   - **NO** borrar ni sobreescribir archivos existentes sin verificar previamente su propósito.

---

## 5. Documentación, Versionado y Changelog

Esta sección es **obligatoria** para toda tarea que modifique el proyecto.

### 5.1. Documentación en `docs/`

- **Todo** cambio, tarea o decisión técnica que realice el asistente debe quedar documentado en archivos **Markdown** dentro de la carpeta `docs/`.
- **Un archivo por tarea/cambio**, con nombre descriptivo en `kebab-case` (ej.: `docs/servicio-pokeapi.md`, `docs/vista-detalle-pokemon.md`).
- Cada documento debe incluir como mínimo:
  1. **Objetivo**: qué se buscaba resolver.
  2. **Cambios realizados**: descripción de alto nivel.
  3. **Archivos afectados**: rutas creadas o modificadas.
  4. **Decisiones técnicas**: el *por qué* de las elecciones relevantes.
  5. **Cómo verificar/probar**: pasos concretos.
  6. **Pendientes**: trabajo futuro o limitaciones conocidas.
- Mantener actualizado `docs/README.md` como **índice** con enlaces a cada documento.
- **No duplicar** información: `CHANGELOG.md` responde al *qué cambió*; `docs/` responde al *por qué y cómo*.

### 5.2. Versionado en `package.json` (SemVer)

- **Cada cambio de código exige incrementar** el campo `version` de `package.json` siguiendo [Semantic Versioning](https://semver.org/):
  - **MAJOR** (`x.0.0`): cambios incompatibles o *breaking changes*.
  - **MINOR** (`0.x.0`): nuevas funcionalidades retrocompatibles.
  - **PATCH** (`0.0.x`): correcciones de bugs, refactors internos, estilos o documentación sin cambio de comportamiento.
- En la fase inicial `0.y.z` se aplica el mismo criterio de forma pragmática.
- Usar `npm version <major|minor|patch> --no-git-tag-version` para evitar commits y tags automáticos no deseados.
- El incremento de versión debe realizarse **en el mismo cambio/commit** que la modificación que lo origina.

### 5.3. `CHANGELOG.md` (Keep a Changelog 1.1.0)

- **Todo cambio debe verse reflejado** en `CHANGELOG.md` siguiendo estrictamente la estructura de <https://keepachangelog.com/en/1.1.0/>.
- El archivo se organiza por versiones, de la más reciente a la más antigua, con el formato:
  ```markdown
  ## [1.2.0] - 2026-10-12

  ### Added
  - Nueva funcionalidad X.

  ### Fixed
  - Corrección del bug Y.
  ```
- **Tipos de cambio permitidos** (usar solo los que apliquen): `Added`, `Changed`, `Deprecated`, `Removed`, `Fixed`, `Security`.
- El trabajo en curso se registra bajo `## [Unreleased]`. Al cerrar el cambio, esa entrada se mueve a una sección con la **misma versión** que se definió en `package.json` y su **fecha** (`YYYY-MM-DD`).
- **Nunca** dejar un cambio de código sin su entrada en el changelog.

---

## 6. Flujo de Trabajo y Verificación de Codex
1. **No romper código existente**: Antes de modificar o refactorizar, entender el contexto existente.
2. **Preservar bloques automáticos**: Nunca eliminar el bloque `<!-- BEGIN:nextjs-agent-rules -->` ni alterar archivos de configuración sin necesidad explícita.
3. **Documentar el cambio**: crear/actualizar el documento correspondiente en `docs/` y su índice `docs/README.md` (sección 5.1).
4. **Versionar**: incrementar `version` en `package.json` según SemVer (sección 5.2).
5. **Registrar en el changelog**: añadir la entrada en `CHANGELOG.md` bajo la nueva versión (sección 5.3).
6. **Verificación antes de concluir**:
   - Comprobar que no haya errores de TypeScript ni advertencias de linting (`npm run lint` / `npm run build`).
7. **Respuestas concisas**: Al entregar una tarea, resumir brevemente qué se implementó, la versión nueva y cuáles son los siguientes pasos recomendados.
