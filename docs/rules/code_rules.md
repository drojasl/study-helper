# Reglas de Código (Code Rules)

1. **Arquitectura y Reutilización**: Los cambios deben respetar una arquitectura en la que se reutilice el código lo mejor posible. Esto incluye la creación de:
   - Componentes reusables.
   - Custom hooks.
   - Funciones utilitarias (`utils`) reutilizables.
2. **Calidad de Código**: Los cambios generados deben superar las ejecuciones de linting y de build en el sistema:
   - `npm run lint`
   - `npm run build`
