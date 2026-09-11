<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Configuración de Agentes (Subagents)
*Nota: La configuración de los agentes está organizada en archivos independientes para evitar sobrecarga de contexto.*

## ⚠️ Regla Estricta de Transición entre Fases y Agentes
- **Control por el Usuario**: Cada subagente o fase únicamente concluye su labor y se da por finalizada cuando el usuario lo aprueba explícitamente o pide de forma directa pasar a otra fase.
- **Prohibido el avance automático**: Bajo ninguna circunstancia el asistente debe encadenar o invocar automáticamente al siguiente agente del flujo (por ejemplo, pasar del planeador de alto nivel al planeador detallado, o del planeador al ejecutor) sin que el usuario haya revisado el resultado y haya dado su visto bueno expreso para avanzar.

---

El flujo de trabajo se ejecuta en el siguiente orden:

1. **Fase de Alto Nivel (Vista de pájaro y pasos simples)**:
   - `docs/agents/high_level_requester.md` (Requester de Alto Nivel)
   - `docs/agents/high_level_planner.md` (Planeador de Alto Nivel)

2. **Fase Detallada**:
   - `docs/agents/requirements_gatherer.md` (Levantamiento detallado con AC y escenarios)
   - `docs/agents/planner.md` (Plan de implementación técnico paso a paso)

3. **Fase de Construcción y Validación**:
   - `docs/agents/executor.md` (Implementación de código limpio)
   - `docs/agents/reviewer.md` (Revisión de arquitectura, seguridad y criterios)
