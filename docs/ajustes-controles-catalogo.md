# Ajustes de controles del catálogo

## Objetivo

Refinar la barra de búsqueda y filtros para hacer más clara la selección activa y respetar el orden visual solicitado.

## Cambios realizados

- Se reordenaron los controles como Search, Ordenar, Generación y Tipo.
- Tipo ahora es un combobox multiselección con opciones marcables.
- Los chips se muestran únicamente para filtros activos y permiten quitarlos con un clic.
- El encabezado quedó reducido al título Pokédex y su descripción ocupa todo el ancho disponible.
- Se reemplazó el predominio de blanco por la paleta de marca Pokémon: amarillo, rojo, azul y azul marino.
- El encabezado usa el PNG del logo de Pokémon centrado, con la descripción existente debajo.
- El panel de búsqueda/filtros y las tarjetas recuperan el fondo blanco, y el menú de Tipo queda por encima del grid mediante una capa de apilado explícita.
- El fondo interno de las imágenes también es blanco para integrar visualmente cada ilustración con su tarjeta.

## Archivos afectados

- `app/page.tsx`
- `components/pokemon/PokemonExplorer.tsx`
- `docs/catalogo-interactivo.md`
- `CHANGELOG.md`
- `package.json` y `package-lock.json`

## Decisiones técnicas

El control de Tipo usa un combobox desplegable con opciones marcables para permitir selección múltiple sin agregar dependencias. Los chips usan botones accesibles para restablecer cada filtro de forma independiente.

## Cómo verificar/probar

1. Ejecutar `npm run dev`.
2. Confirmar el orden Search, Ordenar, Generación y Tipo.
3. Seleccionar un tipo o generación y quitarlo desde el chip correspondiente.
4. Comprobar que el subtítulo se extiende por todo el ancho del encabezado.
5. Ejecutar `npm run lint` y `npx tsc --noEmit`.

## Pendientes

No hay pendientes conocidos para este ajuste.
