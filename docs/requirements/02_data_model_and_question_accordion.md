# Requerimiento 2: Modelo de Datos y Acordeón de Preguntas

## 1. Definición de la Característica
Este requerimiento establece cómo se estructura la información (las preguntas y respuestas predefinidas) y cómo se presentarán visualmente en la interfaz principal. El objetivo es listar los resultados en un formato de Acordeón que se expanda para mostrar respuestas detalladas al hacer clic, con soporte para animaciones.

## 2. Ítems del Requerimiento
- **Ítem 4**: Definición de interfaz / propiedades para Preguntas y Respuestas. Se debe definir el modelo que contenga ID, pregunta, respuesta, categoría/tipo de entrevista y tags.
- **Ítem 7**: Componente individual de pregunta/respuesta en acordeón. Debe permitir la acción de expandir/contraer con una animación de transición.
- **Ítem 8**: Componente contenedor de lista de preguntas (`QuestionList`), que iterará sobre el modelo de datos para renderizar múltiples acordeones.

## 3. Criterios de Aceptación (AC)
- **AC1**: Existe una interfaz o tipo `Question` estandarizado que incluye: `id` (string/number), `question` (string), `answer` (string/JSX), `category` (string), y `tags` (string[]).
- **AC2**: Cada pregunta de la lista se renderiza con un título visible de forma predeterminada y un ícono (ej. de FontAwesome) que indica su estado (colapsado o expandido).
- **AC3**: Al hacer clic en el título de una pregunta, el cuerpo de la respuesta se expande hacia abajo utilizando una animación fluida (CSS transitions de Tailwind).
- **AC4**: El componente contenedor `QuestionList` puede recibir un array de objetos tipo `Question` y los renderiza sin fallos de React (usando claves/keys correctas).

## 4. Escenarios de Uso
- **Escenario 1: Visualización compacta**
  - *Dado* que el usuario tiene una lista de 10 preguntas frente a él,
  - *Cuando* observa la pantalla,
  - *Entonces* ve únicamente los enunciados de las 10 preguntas de forma compacta para escanearlas rápidamente.
- **Escenario 2: Revelación de respuesta**
  - *Dado* que el usuario encuentra la pregunta "¿Qué es el Event Loop en JS?",
  - *Cuando* hace clic sobre dicho elemento,
  - *Entonces* el contenedor se expande animadamente mostrando la respuesta predefinida. Si hace clic de nuevo, se oculta.

## 5. Componentes Involucrados
- `types/index.ts` o `models/Question.ts`: Archivo con la interfaz TypeScript de `Question`.
- `components/ui/QuestionAccordion.tsx`: Componente base de un acordeón individual.
- `components/ui/QuestionList.tsx`: Contenedor iterador que mapea la data hacia los acordeones.
