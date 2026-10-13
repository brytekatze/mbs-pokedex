# Especificación OpenAPI de PokéAPI

## Objetivo

Disponer de la especificación OpenAPI oficial de [PokéAPI](https://pokeapi.co/) dentro del repositorio, para usarla como **contrato de referencia** al definir los tipos de TypeScript y la capa de servicios del proyecto.

## Cambios realizados

- Se añadió el archivo `context/openapi/pokeapi.yml` con la especificación oficial completa.

## Archivos afectados

- `context/openapi/pokeapi.yml` (nuevo, solo lectura).
- `AGENTS.md` (se registró la carpeta en la estructura del proyecto).

## Decisiones técnicas

- **Fuente oficial**: el archivo se obtuvo del repositorio oficial `PokeAPI/pokeapi` (rama `master`), en lugar de redactarse a mano, para garantizar fidelidad total con la API real.
- **Formato**: se conserva en YAML tal cual lo publica el proyecto, sin reformatear.
- **Sin recortes**: se eligió la versión completa para tener disponible cualquier endpoint futuro (no solo los del alcance actual).
- **Solo lectura**: es un artefacto de referencia; no debe editarse a mano.

## Detalles de la especificación

| Propiedad | Valor |
| --- | --- |
| Versión OpenAPI | 3.1.0 |
| Versión de la API | 2.10.0 |
| Servidor | `https://pokeapi.co` |
| Rutas (`paths`) | 102 |
| Schemas | 278 |

> Las rutas incluyen el prefijo `/api/v2/`, por lo que las URLs resultantes son del tipo `https://pokeapi.co/api/v2/pokemon/25/`.

## Cómo verificar / probar

Validar que el archivo es YAML correcto y revisar sus metadatos:

```bash
python3 -c "
import yaml
spec = yaml.safe_load(open('context/openapi/pokeapi.yml'))
print(spec['openapi'], spec['info']['version'])
print('paths:', len(spec['paths']))
print('schemas:', len(spec['components']['schemas']))
"
```

## Pendientes

- Derivar las interfaces de dominio (`types/pokemon.ts`) a partir de los schemas relevantes (`Pokemon`, `PokemonSpecies`, `Type`, `EvolutionChain`, `Ability`, `Stat`).
- Evaluar si conviene generar tipos automáticamente con `openapi-typescript` (requeriría autorizar una dependencia de desarrollo).
