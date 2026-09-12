# Reglas de Código (Code Rules)

1. **Arquitectura y Reutilización**: Los cambios deben respetar una arquitectura en la que se reutilice el código lo mejor posible. Esto incluye la creación de:
   - Componentes reusables.
   - Custom hooks.
   - Funciones utilitarias (`utils`) reutilizables.
   - Componentes pequeños con una única responsabilidad desde su primera implementación.
   - Carpetas organizadas por dominio o responsabilidad, evitando acumular componentes no relacionados en una misma carpeta.
2. **Diseño antes del código**: Antes de escribir código, se deben identificar las responsabilidades independientes, los componentes coordinadores y las piezas reutilizables. Una vista no debe mezclar en un único archivo estructura, contenido, controles, estado y lógica de persistencia si pueden separarse claramente.
3. **Calidad de Código**: Los cambios generados deben superar las ejecuciones de linting y de build en el sistema:
   - `npm run lint`
   - `npm run build`
