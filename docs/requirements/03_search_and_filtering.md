# Requerimiento 3: Búsqueda y Filtrado

## 1. Definición de la Característica
Este documento describe el mecanismo principal de consulta dentro de la aplicación. Para maximizar la velocidad durante una entrevista, el buscador debe reaccionar en tiempo real e implementar un autocompletado y opciones de filtrado interactivo mediante etiquetas (tags).

## 2. Ítems del Requerimiento
- **Ítem 5**: Buscador de términos con soporte de autocompletado / sugerencias.
- **Ítem 6**: Selector y filtro interactivo por Tags (ej. Laravel, SQL, Docker).
- **Ítem 10**: Ejecución de la acción de búsqueda y filtrado en tiempo real con coincidencia amplia (match en título de pregunta, cuerpo de respuesta y tags).

## 3. Criterios de Aceptación (AC)
- **AC1**: La barra de búsqueda reacciona mientras el usuario escribe, proveyendo sugerencias y autocompletado en un menú desplegable nativo.
- **AC2**: Existen botones o *pills* que actúan como selectores de Tags. Al presionar uno (ej. `SQL`), la lista de resultados se filtra instantáneamente para incluir solo preguntas que contengan ese Tag. Pueden seleccionarse múltiples tags.
- **AC3 (Coincidencia Amplia)**: El algoritmo de búsqueda realiza un match case-insensitive comprobando el input contra el `título` de la pregunta, el `cuerpo de la respuesta`, y los `tags` simultáneamente.
- **AC4**: La ejecución de búsqueda no requiere que el usuario presione el botón "Enter" ni que la página se recargue (tiempo real impulsado por el estado de React).

## 4. Escenarios de Uso
- **Escenario 1: Autocompletado**
  - *Dado* que el usuario empieza a escribir "Poli",
  - *Cuando* se encuentra escribiendo,
  - *Entonces* un modal pequeño o lista debajo del input sugiere "Polimorfismo".
- **Escenario 2: Coincidencia Amplia (Wide Match)**
  - *Dado* que el usuario necesita una respuesta sobre polimorfismo pero la pregunta almacenada se llama "Principios de POO",
  - *Cuando* busca "polimorfismo",
  - *Entonces* el sistema filtra y arroja "Principios de POO" en los resultados porque la palabra clave está presente en el texto de la respuesta.
- **Escenario 3: Filtro Múltiple**
  - *Dado* que el usuario está en la vista de Técnica de Código,
  - *Cuando* hace clic en los tags "PHP" y "Backend",
  - *Entonces* la vista solo renderiza aquellas preguntas que correspondan a ambos tags seleccionados.

## 5. Componentes Involucrados
- `components/ui/SearchBar.tsx`: Maneja el input, el estado interno de búsqueda y muestra las opciones de autocompletado.
- `components/ui/TagFilter.tsx`: Renderiza la colección de Tags disponibles con comportamiento on/off (toggle).
- `hooks/useSearch.ts` (Opcional): Un Custom Hook recomendado para centralizar la lógica de filtrado amplio e inyectarla hacia el contenedor de listas.
