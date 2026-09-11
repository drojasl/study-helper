# Plan de Alto Nivel: Modelo de Datos y Acordeón de Preguntas (Modular por Página)

- Definir la interfaz TypeScript para el modelo de datos `Question` (id, question, answer, category, tags)
- Crear archivos `questions.json` independientes dentro de cada módulo/página (`app/hr/questions.json`, `app/code/questions.json`, `app/cultural-fit/questions.json`, `app/technical/questions.json`)
- Crear componente reusable `QuestionAccordion` con animación de expandir/contraer e indicador visual
- Crear componente reusable `QuestionList` para iterar y renderizar la colección de preguntas
- Conectar cada página (`hr`, `code`, `cultural-fit`, `technical`) con su respectivo archivo `questions.json` local
