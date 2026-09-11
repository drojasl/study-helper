# Plan de Implementación: Requerimiento 1 - Layout y Navegación

- **Requerimiento asociado**: `docs/requirements/01_layout_and_navigation.md`
- **Reglas técnicas de referencia**: `docs/rules/technical_rules.md` y `docs/rules/code_rules.md`
- **Enfoque**: Mobile-First, Next.js (App Router), Tailwind CSS, Componentes Reutilizables, FontAwesome.

---

## 1. Visión General Técnica y Arquitectura

El objetivo es construir una estructura de layout responsiva y unificada con navegación fluida y accesible:
- **Mobile (< 768px)**: Header superior fijo (`sticky top-0`) con título/logo de la aplicación, botón para abrir/cerrar un menú lateral desplegable (Drawer con overlay traslúcido) y cierre automático al interactuar con un enlace o backdrop.
- **Desktop (>= 768px / `md:`)**: Sidebar fijo a la izquierda (`w-64`), dejando el área principal (`flex-1`) para el renderizado del contenido dinámico de cada ruta.
- **Iconografía**: Integración oficial de **FontAwesome** para React (`@fortawesome/react-fontawesome`, `@fortawesome/free-solid-svg-icons`, `@fortawesome/fontawesome-svg-core`) asegurando la prevención de salto de tamaño en SSR (FOUC) mediante `config.autoAddCss = false;`.
- **Rutas Principales**:
  - `/` (Inicio / Resumen general)
  - `/hr` (Entrevista con HR)
  - `/technical` (Entrevista Técnica Conceptual)
  - `/code` (Entrevista Técnica de Código)
  - `/cultural-fit` (Entrevista Cultural Fit)

---

## 2. Archivos a Crear y Modificar

### 2.1. Dependencias y Configuración
- `package.json`: Instalar paquetes de FontAwesome:
  - `@fortawesome/fontawesome-svg-core`
  - `@fortawesome/free-solid-svg-icons`
  - `@fortawesome/react-fontawesome`

### 2.2. Tipos y Constantes Reutilizables
- `types/navigation.ts` (Nuevo): Interfaz `NavItem` (`label`, `href`, `icon`, `description`).
- `config/navigation.ts` (Nuevo): Lista centralizada con los enlaces a las 4 categorías de entrevista y la página de inicio.

### 2.3. Componentes de Layout Reusables
- `components/layout/NavLinks.tsx` (Nuevo - Client Component): Lista interactiva de enlaces con detección de ruta activa (`usePathname()`), estados `hover`/`active`, e iconos FontAwesome.
- `components/layout/MobileNav.tsx` (Nuevo - Client Component): Header superior móvil + Drawer colapsable con transición y backdrop.
- `components/layout/Sidebar.tsx` (Nuevo): Barra lateral fija para desktop (`hidden md:flex`).
- `components/layout/Navigation.tsx` (Nuevo): Componente unificador que ensambla `Sidebar` y `MobileNav`.

### 2.4. Estilos y Layout Global
- `app/globals.css` (Modificar): Importar estilos base de FontAwesome (`@fortawesome/fontawesome-svg-core/styles.css`).
- `app/layout.tsx` (Modificar): Configurar FontAwesome (`config.autoAddCss = false`), integrar el componente `Navigation`, envolver `children` en un contenedor responsivo (`flex-1 min-w-0`), y actualizar metadatos del sitio.

### 2.5. Rutas / Páginas
- `app/page.tsx` (Modificar): Página principal con bienvenida y tarjetas de acceso directo a los 4 tipos de entrevista.
- `app/hr/page.tsx` (Nuevo): Página placeholder para Entrevistas de Recursos Humanos.
- `app/technical/page.tsx` (Nuevo): Página placeholder para Entrevistas Técnicas Conceptuales.
- `app/code/page.tsx` (Nuevo): Página placeholder para Entrevistas Técnicas de Código.
- `app/cultural-fit/page.tsx` (Nuevo): Página placeholder para Entrevistas de Cultural Fit.

---

## 3. Tareas Secuenciales para el Agente Ejecutor

### Tarea 1: Instalación y Configuración de FontAwesome
1. Ejecutar en terminal:
   ```bash
   pnpm add @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome
   ```
2. En `app/layout.tsx`:
   - Importar:
     ```ts
     import { config } from "@fortawesome/fontawesome-svg-core";
     import "@fortawesome/fontawesome-svg-core/styles.css";
     config.autoAddCss = false;
     ```

### Tarea 2: Definición de Tipos y Configuración de Enlaces
1. Crear `types/navigation.ts`:
   ```ts
   import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

   export interface NavItem {
     label: string;
     href: string;
     icon: IconDefinition;
     description: string;
   }
   ```
2. Crear `config/navigation.ts`:
   - Configurar los 5 enlaces principales utilizando iconos representativos de `@fortawesome/free-solid-svg-icons`:
     - Home: `/` (`faHouse`)
     - HR: `/hr` (`faUserTie`)
     - Técnica Conceptual: `/technical` (`faBrain`)
     - Técnica de Código: `/code` (`faCode`)
     - Cultural Fit: `/cultural-fit` (`faHandshake`)

### Tarea 3: Componente `NavLinks.tsx` (Reutilizable)
- Crear `components/layout/NavLinks.tsx`.
- Marcar con `"use client"`.
- Aceptar props opcionales:
  - `onNavigate?: () => void` (para invocar al hacer clic en móvil y cerrar el drawer).
  - `className?: string`.
- Utilizar `usePathname()` de `next/navigation`.
- Iterar sobre la configuración de `NAV_ITEMS`.
- Si `pathname === item.href`, aplicar clases de estado activo:
  - `bg-blue-600 text-white shadow-sm` o similar fondo destacado.
- Si no está activo:
  - `text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-900`.
- Renderizar icono con `<FontAwesomeIcon icon={item.icon} className="w-4 h-4 shrink-0" />`.

### Tarea 4: Componente `Sidebar.tsx` (Desktop)
- Crear `components/layout/Sidebar.tsx`.
- Renderizar un contenedor accesible `<aside aria-label="Navegación principal">`.
- Estructura:
  - Visible únicamente en escritorio: `hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950`.
  - Header del Sidebar con branding/logo: "Interview Copilot" / "Study Helper" con ícono.
  - Cuerpo con scroll si fuera necesario (`flex-1 overflow-y-auto px-4 py-6`) conteniendo `<NavLinks />`.
  - Footer sutil con información del autor o versión.

### Tarea 5: Componente `MobileNav.tsx` (Mobile-First)
- Crear `components/layout/MobileNav.tsx`.
- Marcar con `"use client"`.
- Manejar estado interno `isOpen` (`boolean`) inicializado en `false`.
- Header móvil visible solo en pantallas pequeñas:
  - Clases: `md:hidden sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-white/90 dark:bg-zinc-950/90 backdrop-blur border-b border-zinc-200 dark:border-zinc-800`.
  - Logo/título a la izquierda.
  - Botón hamburguesa accesible (`aria-label="Abrir menú"`) con icono `faBars`.
- Drawer lateral y Backdrop:
  - Backdrop traslúcido: `fixed inset-0 z-50 bg-black/50 backdrop-blur-xs` con `onClick={() => setIsOpen(false)}`.
  - Panel lateral deslizante: `fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] bg-white dark:bg-zinc-950 p-4 shadow-xl flex flex-col`.
  - Botón de cierre en el header del panel (`faXmark`).
  - Renderizar `<NavLinks onNavigate={() => setIsOpen(false)} />`.

### Tarea 6: Componente `Navigation.tsx`
- Crear `components/layout/Navigation.tsx`.
- Ensamblar y exportar:
  ```tsx
  export function Navigation() {
    return (
      <>
        <MobileNav />
        <Sidebar />
      </>
    );
  }
  ```

### Tarea 7: Actualización de `app/layout.tsx`
- Importar e integrar `<Navigation />`.
- Ajustar el cuerpo (`<body>`):
  ```tsx
  <body className="min-h-screen flex flex-col md:flex-row bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
    <Navigation />
    <div className="flex-1 flex flex-col md:pl-64 min-w-0">
      <main className="flex-1 p-4 md:p-8 max-w-6xl w-full mx-auto">
        {children}
      </main>
    </div>
  </body>
  ```
- Actualizar metadata general (`title`: "Study Helper & Interview Copilot", `description`: "Buscador rápido de respuestas predefinidas para entrevistas técnicas y conductuales").

### Tarea 8: Creación de Páginas Placeholder y Home
1. `app/page.tsx`:
   - Vista de bienvenida y descripción de la herramienta.
   - Grid responsivo (1 columna en móvil, 2 en pantallas medianas) con tarjetas informativas y enlaces hacia `/hr`, `/technical`, `/code` y `/cultural-fit`.
2. `app/hr/page.tsx`:
   - Encabezado: "Entrevista con HR".
   - Subtítulo: Preguntas conductuales, fortalezas, debilidades y metodología STAR.
   - Placeholder de contenido limpio.
3. `app/technical/page.tsx`:
   - Encabezado: "Entrevista Técnica Conceptual".
   - Subtítulo: Arquitectura de software, patrones, bases de datos y fundamentos.
   - Placeholder de contenido limpio.
4. `app/code/page.tsx`:
   - Encabezado: "Entrevista Técnica de Código".
   - Subtítulo: Algoritmos, snippets de código, manipulación de estructuras de datos y funciones clave.
   - Placeholder de contenido limpio.
5. `app/cultural-fit/page.tsx`:
   - Encabezado: "Entrevista Cultural Fit".
   - Subtítulo: Alineación de valores, cultura empresarial, resolución de conflictos y trabajo en equipo.
   - Placeholder de contenido limpio.

---

## 4. Criterios de Aceptación y Verificación

El agente ejecutor debe comprobar:
1. **Comportamiento Mobile**:
   - En pantallas pequeñas (`< 768px`), el Sidebar no es visible y aparece el header móvil sticky con botón hamburguesa.
   - Al tocar el botón hamburguesa, se despliega el menú lateral con overlay. Al pulsar un enlace o el fondo, el menú se cierra automáticamente.
2. **Comportamiento Desktop**:
   - En pantallas `>= 768px`, el Sidebar lateral se visualiza anclado a la izquierda de forma permanente y el contenido principal respeta el espacio (`md:pl-64`).
3. **Navegación Activa**:
   - Al navegar entre `/`, `/hr`, `/technical`, `/code` y `/cultural-fit`, el enlace correspondiente en la barra/menú se resalta visualmente.
4. **Verificación de Calidad**:
   - Ejecutar `pnpm run lint` -> Sin advertencias ni errores.
   - Ejecutar `pnpm run build` -> Compilación exitosa en Next.js.
