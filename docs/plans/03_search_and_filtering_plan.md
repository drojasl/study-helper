# Plan de Implementación: Requerimiento 3 - Búsqueda y Filtrado

- **Requerimiento asociado**: `docs/requirements/03_search_and_filtering.md`
- **Plan de alto nivel**: `docs/plans/high_level/03_search_and_filtering_hl_plan.md`
- **Enfoque**: Next.js App Router, componentes cliente reutilizables, TypeScript estricto, Tailwind CSS y búsqueda local en tiempo real.

## 1. Arquitectura de la Solución

La búsqueda se implementará como una capa reutilizable entre los datos de cada categoría y `QuestionList`.

```text
questions.json
      |
CategorySearch
      |
useSearch(questions)
      |
SearchBar + TagFilter
      |
QuestionList(filteredQuestions)
```

Cada página conservará sus preguntas originales y renderizará un contenedor cliente que gestione el término de búsqueda, los tags seleccionados, las sugerencias y la colección filtrada. La búsqueda se limitará a la categoría actual.

## 2. Archivos a Crear o Modificar

### 2.1. Lógica reutilizable

- `hooks/useSearch.ts`: hook para estado y filtrado de preguntas.
- `components/ui/CategorySearch.tsx`: contenedor cliente que conecta controles, hook y lista.

### 2.2. Controles de interfaz

- `components/ui/SearchBar.tsx`: input, sugerencias y selección de sugerencias.
- `components/ui/TagFilter.tsx`: tags únicos, selección múltiple y estados activos.

### 2.3. Integración de rutas

- `app/hr/page.tsx`
- `app/technical/page.tsx`
- `app/code/page.tsx`
- `app/cultural-fit/page.tsx`

Las páginas pasarán sus preguntas JSON al componente `CategorySearch` y conservarán `CategoryHeader`.

## 3. Implementación Paso a Paso

### Tarea 1: Crear el hook `useSearch`

1. Definir una interfaz de opciones y un resultado tipado.
2. Mantener `searchTerm` y `selectedTags` con estado React.
3. Normalizar texto con `trim()` y conversión a minúsculas.
4. Filtrar cada pregunta si el término aparece en `question`, `answer` o `tags`.
5. Exigir que todos los tags seleccionados estén presentes en la pregunta.
6. Derivar tags únicos y sugerencias desde la colección de la categoría.
7. Exponer `setSearchTerm`, `toggleTag`, `clearFilters`, `filteredQuestions` y `suggestions`.

### Tarea 2: Crear `SearchBar`

1. Recibir el término actual, callback de cambio y sugerencias.
2. Renderizar un input controlado con nombre accesible.
3. Mostrar sugerencias solo con un término no vacío y resultados disponibles.
4. Permitir seleccionar una sugerencia para completar el input.
5. Mantener la lista de sugerencias dentro del ancho disponible en mobile.
6. Usar roles y atributos accesibles apropiados para el input y las sugerencias.

### Tarea 3: Crear `TagFilter`

1. Recibir tags disponibles, tags activos y callback de alternancia.
2. Renderizar un control por tag con estado visual seleccionado/no seleccionado.
3. Permitir seleccionar múltiples tags.
4. Garantizar un área táctil mínima aproximada de 44px.
5. Usar layout con wrap para evitar overflow horizontal en mobile.

### Tarea 4: Crear `CategorySearch`

1. Marcar el componente como cliente.
2. Recibir `Question[]` y opcionalmente un mensaje vacío.
3. Inicializar `useSearch(questions)`.
4. Renderizar `SearchBar` y `TagFilter` antes de `QuestionList`.
5. Mostrar el total de resultados filtrados.
6. Mostrar `QuestionList` con la colección filtrada.
7. Personalizar el estado vacío cuando existen preguntas originales pero no hay coincidencias.
8. Permitir limpiar término y tags con una sola acción.

### Tarea 5: Integrar las páginas

1. Mantener la carga server-side de cada `questions.json`.
2. Mantener `CategoryHeader` y su contador total de preguntas preparadas.
3. Reemplazar la llamada directa a `QuestionList` por `CategorySearch`.
4. Verificar que cada ruta reciba exclusivamente su propio conjunto de preguntas.

## 4. Reglas de Filtrado

### Búsqueda textual

El término normalizado se comparará contra:

- `question.question`
- `question.answer`
- Cada elemento de `question.tags`

La comparación será case-insensitive y se realizará en tiempo real.

### Tags

Los tags activos utilizarán lógica AND. Para los tags seleccionados `["PHP", "Backend"]`, una pregunta será válida únicamente si contiene ambos valores.

### Sugerencias

Las sugerencias se obtendrán de títulos de preguntas cuyo contenido coincida con el término. Se limitará la cantidad visible para evitar un panel excesivo; la lista filtrada seguirá mostrando todos los resultados válidos.

## 5. Accesibilidad y Responsive

- El buscador tendrá label visible o `aria-label` descriptivo.
- Los tags serán botones reales, no elementos `div` con eventos de click.
- El estado activo de cada tag será perceptible visualmente y mediante `aria-pressed`.
- Las sugerencias podrán recorrerse con teclado y tendrán nombres accesibles.
- Los controles tendrán un área táctil mínima aproximada de 44px.
- Los tags usarán `flex-wrap` y el buscador ocupará el ancho disponible en mobile.
- No se introducirá overflow horizontal accidental.

## 6. Verificación

1. Ejecutar `pnpm run lint`.
2. Ejecutar `pnpm run build`.
3. Verificar búsqueda por título, respuesta y tags.
4. Verificar coincidencia case-insensitive y tolerancia de espacios.
5. Verificar selección y deselección de múltiples tags con lógica AND.
6. Verificar selección de sugerencias.
7. Verificar estado vacío y limpieza completa de filtros.
8. Verificar las cuatro rutas sin mezclar datos entre categorías.
9. Comprobar responsive mobile sin desplazamiento horizontal.

## 7. Fuera de Alcance

- Persistencia de filtros en URL.
- Búsqueda remota o conexión a base de datos.
- Paginación y ordenamiento avanzado.
- Debounce para peticiones remotas.
