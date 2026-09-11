# Plan de Alto Nivel: Búsqueda y Filtrado en Tiempo Real

- Crear un componente reusable `SearchBar` para capturar términos y mostrar sugerencias mientras el usuario escribe
- Crear un componente reusable `TagFilter` para listar tags disponibles y permitir seleccionar múltiples filtros
- Centralizar la lógica de búsqueda amplia y filtrado combinado en un hook o utilidad reusable
- Conectar la búsqueda y los filtros con las páginas de categorías y sus listas de preguntas
- Filtrar en tiempo real por pregunta, respuesta y tags sin recargar la página ni exigir presionar Enter
- Mostrar estados claros cuando no existan coincidencias y validar el comportamiento responsive en mobile