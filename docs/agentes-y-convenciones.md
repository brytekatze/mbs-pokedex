# Agentes y convenciones del proyecto

## Objetivo

Definir las reglas obligatorias con las que trabaja el asistente (Codex) en este repositorio: documentación en `docs/`, versionado semántico en `package.json` y registro de cambios en `CHANGELOG.md`.

## Cambios realizados

- Se añadió la **sección 5** a `AGENTS.md`: *Documentación, Versionado y Changelog*.
- Se renumeró la antigua sección 5 a **sección 6** (*Flujo de Trabajo y Verificación de Codex*) y se amplió con los nuevos pasos obligatorios.
- Se actualizó la estructura de archivos de la sección 2 para incluir `docs/` y `CHANGELOG.md`.
- Se creó `CHANGELOG.md` siguiendo Keep a Changelog 1.1.0.

## Archivos afectados

- `AGENTS.md` (modificado).
- `CHANGELOG.md` (nuevo).
- `package.json` (bump de versión).
- `docs/README.md`, `docs/pokeapi-openapi.md`, `docs/agentes-y-convenciones.md` (nuevos).

## Decisiones técnicas

- **Documentación por tarea**: se eligió un archivo Markdown por cambio (en lugar de un único documento monolítico) para evitar conflictos de fusión y mantener el contexto acotado.
- **Separación de responsabilidades**: `CHANGELOG.md` registra *qué* cambió; `docs/` explica *por qué* y *cómo*. Así se evita duplicación.
- **SemVer pragmático**: en la fase `0.y.z` se aplica el criterio de SemVer de forma flexible (todas las versiones previas a 1.0.0 pueden considerarse inestables).
- **Sin commits/tags automáticos**: se recomienda `npm version <tipo> --no-git-tag-version` para controlar manualmente el historial.
- **Enlaces del changelog**: se usan los formatos `compare` y `releases/tag` apuntando al remoto real (`github.com/brytekatze/mbs-pokedex`).

## Cómo verificar / probar

1. Revisar que `AGENTS.md` contiene las secciones 5 y 6 con las reglas descritas.
2. Comprobar que `package.json` tiene la versión incrementada.
3. Comprobar que `CHANGELOG.md` incluye una sección con esa misma versión y su fecha.
4. Verificar que `docs/README.md` enlaza todos los documentos existentes.

```bash
node -p "require('./package.json').version"
head -20 CHANGELOG.md
ls docs
```

## Pendientes

- Crear los tags de Git (`v0.2.0`, ...) al publicar versiones, para que los enlaces del changelog resuelvan correctamente.
- Definir una convención de commits (por ejemplo, Conventional Commits) alineada con el versionado.
