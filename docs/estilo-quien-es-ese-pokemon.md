# Estilo visual "¿Quién es ese Pokémon?"

## Objetivo

Renovar la identidad visual de la Pokédex tomando como referencia el segmento clásico **"¿Quién es ese Pokémon?"** de la serie animada original: silueta negra sobre fondo dramático, tipografía retro con sombra dura y el "reveal" cuando se descubre la identidad.

## Cambios realizados

- **Fondo del catálogo** (`app/page.tsx`): se sustituye el degradado rojo por la "noche" del segmento (índigo → violeta, `#1e1b4b → #312e81 → #5b21b6`) con los glows amarillo, azul y lila como estrellas/luces de fondo.
- **Cabecera** (`app/page.tsx`): nueva tagline **"¿QUIÉN ES ESE POKÉMON?"** en amarillo con sombra dura índigo/azul (`text-shadow` vía clase arbitraria de Tailwind), estilo cómic retro, bajo el logo.
- **Tarjetas del catálogo** (`components/pokemon/PokemonCard.tsx`): el arte oficial se muestra por defecto como **silueta negra** (`filter: brightness(0)`), con badge **"?"** amarillo en la esquina. Al hacer **hover** el arte se revela en color y el badge se desvanece (el "reveal" del anime). El borde de la tarjeta pasa a amarillo al hover.
- **Vista de detalle** (`components/pokemon/PokemonDetailView.tsx`): es el momento del "reveal" — el arte se muestra a todo color sobre un hero índigo/violeta con el cartel **"¡Es {name}!"** en amarillo. Fondo general en índigo claro y los acentos de la paleta nueva (`#3b4cca`/`#1e1b4b`).

## Archivos afectados

- `app/page.tsx`
- `components/pokemon/PokemonCard.tsx`
- `components/pokemon/PokemonDetailView.tsx`
- `components/pokemon/PokemonExplorer.tsx` (unificación del navy de acento a `#1e1b4b`)
- `docs/README.md`, `CHANGELOG.md`, `package.json`, `package-lock.json` (bump a 0.6.0)

## Decisiones técnicas

- **Silueta con CSS puro**: `filter: brightness(0)` sobre el PNG de official artwork (fondo transparente) produce la silueta negra exacta sin generar assets ni JavaScript. El reveal usa `group-hover:brightness-100` — sin estado de cliente ni animaciones complejas.
- **Sin estilos en línea**: el sombreado retro de la tagline usa clases arbitrarias de Tailwind `[text-shadow:...]`, respetando la regla de no usar `style={{...}}`.
- **Comportamiento en táctil**: sin hover, las tarjetas quedan como silueta hasta entrar al detalle, que es el "reveal". Es el mismo arco narrativo del segmento (acertijo → revelación) y evita añadir estado de cliente.
- El rojo se retira del fondo principal; amarillo (`#ffde00`) y azul (`#3b4cca`) se mantienen como acentos, ahora sobre la paleta índigo/violeta.

## Cómo verificar/probar

1. Ejecutar `npm run dev` y abrir `/`.
2. Comprobar la cabecera: logo + "¿QUIÉN ES ESE POKÉMON?" en amarillo retro sobre fondo índigo/violeta.
3. En el grid, las primeras tarjetas se ven como siluetas negras con "?"; al pasar el ratón por encima se revelan en color y el borde pasa a amarillo.
4. Visitar `/pokemon/25`: hero índigo/violeta, arte a color y cartel "¡Es pikachu!".
5. Ejecutar `npm run lint` y `npm run build`.

## Pendientes

- En pantallas táctiles el revelado por hover no existe; evaluar si se quiere un modo "adivinar" con botón de revelado, o mantener el reveal solo al entrar al detalle.
- El resto de pantallas (loading, error, not-found) mantienen la paleta anterior; unificar cuando se rediseñen.