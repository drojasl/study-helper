# Lineamientos del Proyecto: Buscador Rápido de Respuestas Predefinidas (Study Helper & Interview Copilot)

## ¿Qué es el proyecto y contexto general?
El proyecto es una herramienta para un Ingeniero de Sistemas / Full Stack Developer diseñada como un buscador rápido de respuestas predefinidas. Funciona como guía de estudio acelerada y como asistente durante entrevistas de trabajo técnicas y no técnicas, permitiendo consultar rápidamente respuestas preparadas ante cualquier pregunta que surja en tiempo real.

### Estructura de Páginas por Tipo de Entrevista
La aplicación contará con secciones/páginas dedicadas según el tipo de entrevista:
- **Entrevista con HR**: Preguntas conductuales y de perfil (ej. *"Háblame de tu último proyecto"*, *"Dime una fortaleza y una debilidad tuya"*).
- **Entrevista Técnica Conceptual**: Preguntas teóricas y de arquitectura (ej. *"¿Qué es el Event Loop en JS?"*, *"¿Qué es polimorfismo?"*).
- **Entrevista Técnica de Código**: Snippets, funciones y sintaxis (ej. PHP: `array_walk`, definición de interfaces, algoritmos).
- **Entrevista de Cultural Fit**: Preguntas sobre valores, trabajo en equipo y adaptación cultural.

### Experiencia de Usuario y Visualización
- Cada página mantiene un enfoque limpio y minimalista:
  - **Barra de búsqueda rápida** en la parte superior para filtrar preguntas por término o keyword en tiempo real.
  - **Filtro secundario por Tags / Etiquetas** (ej. Laravel, Backend, SQL, Docker, Frontend, etc.).
- Navegación clara y ágil: menú lateral en vista de escritorio y menú hamburguesa en dispositivos móviles (mobile-first).

---

*Nota: Los lineamientos técnicos detallados y reglas de desarrollo se encuentran en archivos independientes para optimizar el contexto de los agentes.*

## Documentación Técnica y de Reglas
- [Reglas Técnicas](./docs/rules/technical_rules.md)
- [Reglas de Código](./docs/rules/code_rules.md)

## Configuración y Flujo de Agentes
La configuración y prompts de cada agente se encuentran en la carpeta `docs/agents/`:

### 1. Nivel Alto (Definición simplificada y estratégica)
- [high_level_requester](./docs/agents/high_level_requester.md)
- [high_level_planner](./docs/agents/high_level_planner.md)

### 2. Nivel Detallado (Especificación técnica formal)
- [requirements_gatherer](./docs/agents/requirements_gatherer.md)
- [planner](./docs/agents/planner.md)

### 3. Nivel de Construcción y Control de Calidad
- [executor](./docs/agents/executor.md)
- [reviewer](./docs/agents/reviewer.md)
