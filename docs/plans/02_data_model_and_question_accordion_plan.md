# Plan de Implementación: Requerimiento 2 - Modelo de Datos y Acordeón de Preguntas

- **Requerimiento asociado**: `docs/requirements/02_data_model_and_question_accordion.md`
- **Plan de alto nivel**: `docs/plans/high_level/02_data_model_and_question_accordion_hl_plan.md`
- **Reglas técnicas de referencia**: `docs/rules/technical_rules.md` y `docs/rules/code_rules.md`
- **Enfoque**: Mobile-First, Next.js (App Router), Tailwind CSS v4, Componentes Reutilizables, Arquitectura de Datos Co-ubicada por Módulo, TypeScript estricto, FontAwesome.

---

## 1. Visión General Técnica y Arquitectura

El objetivo es establecer el modelo de datos de preguntas y respuestas para la preparación de entrevistas, almacenar un set inicial de preguntas realistas en formato JSON modular y co-ubicado por módulo de ruta, y construir componentes de interfaz tipo acordeón con animaciones fluidas en Tailwind CSS, alta accesibilidad (`aria-expanded`, touch targets de al menos 44px para móvil) y soporte para snippets de código (especialmente PHP).

### Principios de Diseño del Requerimiento

1. **Modelo de Datos Estandarizado (`types/question.ts`)**: Tipos estrictos para categorías (`hr`, `technical`, `code`, `cultural-fit`), etiquetas (`tags`), enunciados, respuestas y soporte opcional para snippets de código (`codeSnippet`, `codeLanguage`) y tips clave (`keyPoints`).
2. **Arquitectura de Datos Co-ubicada y Modular (`app/[category]/questions.json`)**: En lugar de un único archivo centralizado monolítico, cada módulo de ruta tiene su propio archivo `questions.json` co-ubicado:
   - `app/hr/questions.json`
   - `app/technical/questions.json`
   - `app/code/questions.json`
   - `app/cultural-fit/questions.json`
   Esta decisión aísla el dominio de cada módulo, simplifica el mantenimiento independiente y permite que cada página Next.js importe directamente sus datos sin sobrecarga ni intermediarios innecesarios.
3. **Componente de Acordeón Reusable (`components/ui/QuestionAccordion.tsx`)**: Componente cliente (`"use client"`) con animación de altura suave basada en CSS Grid de Tailwind (`grid-rows-[0fr]` a `grid-rows-[1fr]`), ícono indicador de FontAwesome (`faChevronDown` con rotación a 180°), badges estilizados para tags y touch targets de al menos 44px para interacción táctil óptima en móvil.
4. **Contenedor de Lista Reusable (`components/ui/QuestionList.tsx`)**: Componente iterador que recibe una colección `Question[]`, gestiona keys únicas de React y presenta un estado vacío amigable (`EmptyState`) cuando no hay elementos.
5. **Componente de Cabecera de Categoría (`components/ui/CategoryHeader.tsx`)**: Encabezado visual estandarizado y responsivo que incluye badge temático, título semántico (`<h1>`), descripción y contador dinámico de preguntas preparadas.
6. **Carga Directa y Tipada en Server Components**: Cada página de módulo (`app/[category]/page.tsx`) se mantiene como Server Component liviano, importa directamente su `questions.json` local y lo pasa tipado a los componentes de UI.
7. **Ajuste de Tipografía Global (`app/globals.css`)**: Vincular la variable `--font-sans` (Geist) al elemento `body` para homogeneidad visual en todo el proyecto.

---

## 2. Archivos a Crear y Modificar

### 2.1. Tipos y Modelos
- `types/question.ts` (Nuevo): Define el tipo de categoría `QuestionCategory` y la interfaz `Question`.

### 2.2. Archivos de Datos Co-ubicados
- `app/hr/questions.json` (Nuevo): Preguntas conductuales, trayectoria y metodología STAR.
- `app/technical/questions.json` (Nuevo): Preguntas técnicas de arquitectura, JavaScript, bases de datos y principios SOLID.
- `app/code/questions.json` (Nuevo): Desafíos de lógica y código PHP con snippets y explicaciones técnicas.
- `app/cultural-fit/questions.json` (Nuevo): Preguntas de comunicación, resolución de desacuerdos y priorización en equipo.

### 2.3. Componentes de UI Reusables
- `components/ui/QuestionAccordion.tsx` (Nuevo): Acordeón accesible individual con animación fluida, tags y área de respuesta/código.
- `components/ui/QuestionList.tsx` (Nuevo): Contenedor de lista de acordeones con manejo de estado vacío.
- `components/ui/CategoryHeader.tsx` (Nuevo): Encabezado reusable y compacto para las páginas de categoría.

### 2.4. Estilos Globales
- `app/globals.css` (Modificar): Actualizar `font-family` en `body` para utilizar `var(--font-sans)`.

### 2.5. Rutas de la Aplicación
- `app/hr/page.tsx` (Modificar): Cargar `app/hr/questions.json` y renderizar `CategoryHeader` + `QuestionList`.
- `app/technical/page.tsx` (Modificar): Cargar `app/technical/questions.json` y renderizar `CategoryHeader` + `QuestionList`.
- `app/code/page.tsx` (Modificar): Cargar `app/code/questions.json` y renderizar `CategoryHeader` + `QuestionList`.
- `app/cultural-fit/page.tsx` (Modificar): Cargar `app/cultural-fit/questions.json` y renderizar `CategoryHeader` + `QuestionList`.

---

## 3. Especificación Detallada de Tareas para el Ejecutor

### Tarea 1: Definición del Modelo de Datos (`types/question.ts`)
1. Crear el archivo `types/question.ts`.
2. Definir las siguientes estructuras TypeScript:
   ```ts
   export type QuestionCategory = "hr" | "technical" | "code" | "cultural-fit";

   export interface Question {
     id: string;
     question: string;
     answer: string;
     category: QuestionCategory;
     tags: string[];
     codeSnippet?: string;
     codeLanguage?: string;
     keyPoints?: string[];
   }
   ```

---

### Tarea 2: Creación de Archivos de Datos Co-ubicados (`questions.json`)

Crear 4 archivos `questions.json` independientes co-ubicados en sus respectivas carpetas de ruta, cada uno conteniendo entre 3 y 4 preguntas de alta calidad técnica y profesional:

#### 2.1. `app/hr/questions.json`
Crear array de objetos `Question` con `category: "hr"`:
- **`hr-1`**: *Cuéntame sobre ti y tu trayectoria profesional.* (Estructura: Presente, Pasado, Futuro y propuesta de valor).
- **`hr-2`**: *Describe una situación de alta presión o conflicto en un proyecto anterior (Metodología STAR).* (Estructura: Situación, Tarea, Acción, Resultado).
- **`hr-3`**: *¿Cuáles consideras que son tus mayores fortalezas y áreas de oportunidad?* (Enfoque honesto con acciones concretas de superación).
- **`hr-4`**: *¿Por qué te interesa formar parte de nuestro equipo y proyecto?* (Alineación con el impacto, retos técnicos y crecimiento profesional).

#### 2.2. `app/technical/questions.json`
Crear array de objetos `Question` con `category: "technical"`:
- **`tech-1`**: *¿Qué es el Event Loop en JavaScript y cómo interactúan el Call Stack, Web APIs y la Task/Microtask Queue?* (Explicación conceptual de asincronía).
- **`tech-2`**: *Explica los principios SOLID y da un ejemplo práctico de Inversión de Dependencias (DIP).* (Desglose de cada principio).
- **`tech-3`**: *Bases de Datos Relacionales (SQL) vs No Relacionales (NoSQL): diferencias clave, ACID vs BASE y casos de uso.*
- **`tech-4`**: *¿Cuáles son las principales estrategias para optimizar el rendimiento (Core Web Vitals) en una aplicación web moderna?* (SSR/SSG, imágenes optimizadas, lazy loading, code splitting, CDN y caching).

#### 2.3. `app/code/questions.json`
Crear array de objetos `Question` con `category: "code"`, `codeLanguage: "php"` y campo `codeSnippet` con código PHP limpio y formateado:
- **`code-1`**: *¿Cómo invertirías un string en PHP sin utilizar la función nativa `strrev()`?*
  - Explicación de manipulación de índices y complejidad $O(n)$.
  - Snippet PHP con función e iteración decreciente.
- **`code-2`**: *Implementación del patrón de diseño Singleton en PHP.*
  - Explicación de constructor y método `clone` privados, instancia estática y método `getInstance()`.
  - Snippet PHP demostrando la clase singleton.
- **`code-3`**: *Manejo funcional de arrays en PHP: comparación entre `array_map`, `array_filter` y `array_reduce`.*
  - Explicación de inmutabilidad y funciones puras vs bucles `foreach`.
  - Snippet PHP con ejemplos ilustrativos de las tres funciones.
- **`code-4`**: *Prevención de Inyecciones SQL en PHP mediante PDO y Consultas Preparadas.*
  - Explicación de `prepare()`, `execute()` y `bindParam()`.
  - Snippet PHP con conexión PDO y consulta segura parametrizada.

#### 2.4. `app/cultural-fit/questions.json`
Crear array de objetos `Question` con `category: "cultural-fit"`:
- **`cult-1`**: *¿Cómo manejas un desacuerdo técnico o de arquitectura con un compañero de equipo?* (Búsqueda de consensos, benchmarks y decisiones orientadas a negocio).
- **`cult-2`**: *¿Qué actitud adoptas cuando una decisión de arquitectura o producto no coincide con tu opinión?* (Principio "Disagree and Commit", compromiso total con el objetivo del equipo).
- **`cult-3`**: *¿Cómo gestionas tu tiempo y priorizas cuando surgen múltiples requerimientos urgentes al mismo tiempo?* (Matriz de impacto/urgencia, comunicación temprana con stakeholders y negociación de plazos).
- **`cult-4`**: *¿Cómo das y recibes feedback técnico continuo (ej. en revisiones de código / Pull Requests)?* (Feedback constructivo, sin sesgos personales y enfocado en la calidad del código).

---

### Tarea 3: Componente `QuestionAccordion.tsx` (`components/ui/QuestionAccordion.tsx`)
1. Crear `components/ui/QuestionAccordion.tsx` con directiva `"use client"`.
2. Props del componente:
   ```ts
   interface QuestionAccordionProps {
     question: Question;
     defaultOpen?: boolean;
   }
   ```
3. Estado local: `const [isOpen, setIsOpen] = useState(defaultOpen ?? false);`.
4. Requisitos de Accesibilidad y UI:
   - Botón toggle accesible: `<button type="button" aria-expanded={isOpen} aria-controls={`faq-${question.id}`}>`
   - Touch Target: altura mínima garantizada para mobile (`min-h-[44px]`), padding ergonómico (`py-4 px-4 sm:px-5`), `w-full text-left`.
   - Indicador de rotación: FontAwesome `faChevronDown` con transición `duration-200` y rotación `rotate-180` cuando esté abierto.
   - Badges de Tags: Badges compactos y legibles (`text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 px-2 py-0.5 rounded-md`).
   - Animación de expansión suave mediante CSS Grid de Tailwind:
     ```tsx
     <div
       id={`faq-${question.id}`}
       role="region"
       className={`grid transition-all duration-200 ease-in-out ${
         isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
       }`}
     >
       <div className="overflow-hidden">
         <div className="pt-2 pb-5 px-4 sm:px-5 text-sm md:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed space-y-4">
           {/* Respuesta formateada */}
           <div className="whitespace-pre-line">{question.answer}</div>

           {/* Snippet de código condicional */}
           {question.codeSnippet && (
             <div className="rounded-lg bg-zinc-950 p-4 border border-zinc-800 font-mono text-xs md:text-sm text-emerald-400 overflow-x-auto">
               <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-800 text-zinc-400 text-xs uppercase tracking-wider">
                 <span>{question.codeLanguage || "code"}</span>
               </div>
               <pre><code>{question.codeSnippet}</code></pre>
             </div>
           )}

           {/* Puntos clave opcionales */}
           {question.keyPoints && question.keyPoints.length > 0 && (
             <div className="mt-3 p-3 rounded-lg bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50">
               <h4 className="text-xs font-semibold text-blue-800 dark:text-blue-300 mb-1.5 uppercase tracking-wider">
                 Puntos Clave:
               </h4>
               <ul className="list-disc list-inside space-y-1 text-xs text-blue-900 dark:text-blue-200">
                 {question.keyPoints.map((point, index) => (
                   <li key={index}>{point}</li>
                 ))}
               </ul>
             </div>
           )}
         </div>
       </div>
     </div>
     ```
   - Contenedor de tarjeta con bordes y sombra sutil: `border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-950 shadow-xs`.

---

### Tarea 4: Componente `QuestionList.tsx` (`components/ui/QuestionList.tsx`)
1. Crear `components/ui/QuestionList.tsx`.
2. Props:
   ```ts
   interface QuestionListProps {
     questions: Question[];
     emptyMessage?: string;
     className?: string;
   }
   ```
3. Lógica de renderizado:
   - Si `questions.length === 0`: Mostrar estado vacío con ícono ilustrativo (`faInbox` de FontAwesome) y mensaje informativo.
   - Si `questions.length > 0`: Renderizar `<div className="space-y-3">` mapeando cada elemento a `<QuestionAccordion key={item.id} question={item} />`.

---

### Tarea 5: Componente de Cabecera de Categoría (`components/ui/CategoryHeader.tsx`)
1. Crear `components/ui/CategoryHeader.tsx` para estandarizar el encabezado de cada vista de módulo.
2. Props:
   - `title: string`
   - `subtitle: string`
   - `badge: string`
   - `categoryIcon: IconDefinition`
   - `count: number`
3. Layout mobile-first con badge temático superior, título semántico `<h1>`, subtítulo descriptivo e indicador estilizado del total de preguntas (`"${count} preguntas preparadas"`).

---

### Tarea 6: Integración y Carga de Datos Co-ubicados en Páginas de Categorías

Actualizar cada página de ruta para importar directamente su respectivo archivo `questions.json` local con tipado estricto `Question[]`:

1. **`app/hr/page.tsx`**:
   ```tsx
   import questionsData from "./questions.json";
   import { Question } from "@/types/question";
   import { QuestionList } from "@/components/ui/QuestionList";
   import { CategoryHeader } from "@/components/ui/CategoryHeader";
   import { faUsers } from "@fortawesome/free-solid-svg-icons";

   const questions = questionsData as Question[];

   export default function HRPage() {
     return (
       <div className="space-y-6">
         <CategoryHeader
           title="Entrevista RRHH & Comportamiento"
           subtitle="Estrategias de comunicación, trayectoria profesional y metodología STAR para destacar ante recursos humanos."
           badge="Recursos Humanos"
           categoryIcon={faUsers}
           count={questions.length}
         />
         <QuestionList questions={questions} />
       </div>
     );
   }
   ```

2. **`app/technical/page.tsx`**:
   ```tsx
   import questionsData from "./questions.json";
   import { Question } from "@/types/question";
   import { QuestionList } from "@/components/ui/QuestionList";
   import { CategoryHeader } from "@/components/ui/CategoryHeader";
   import { faCode } from "@fortawesome/free-solid-svg-icons";

   const questions = questionsData as Question[];

   export default function TechnicalPage() {
     return (
       <div className="space-y-6">
         <CategoryHeader
           title="Preguntas Técnicas Conceptuales"
           subtitle="Domina conceptos fundamentales de arquitectura, patrones de diseño, bases de datos y rendimiento web."
           badge="Técnica Conceptual"
           categoryIcon={faCode}
           count={questions.length}
         />
         <QuestionList questions={questions} />
       </div>
     );
   }
   ```

3. **`app/code/page.tsx`**:
   ```tsx
   import questionsData from "./questions.json";
   import { Question } from "@/types/question";
   import { QuestionList } from "@/components/ui/QuestionList";
   import { CategoryHeader } from "@/components/ui/CategoryHeader";
   import { faLaptopCode } from "@fortawesome/free-solid-svg-icons";

   const questions = questionsData as Question[];

   export default function CodePage() {
     return (
       <div className="space-y-6">
         <CategoryHeader
           title="Desafíos de Código y Lógica (PHP)"
           subtitle="Ejercicios prácticos, algoritmos, patrones de diseño y buenas prácticas orientadas a desarrollo en PHP."
           badge="Live Coding & Lógica"
           categoryIcon={faLaptopCode}
           count={questions.length}
         />
         <QuestionList questions={questions} />
       </div>
     );
   }
   ```

4. **`app/cultural-fit/page.tsx`**:
   ```tsx
   import questionsData from "./questions.json";
   import { Question } from "@/types/question";
   import { QuestionList } from "@/components/ui/QuestionList";
   import { CategoryHeader } from "@/components/ui/CategoryHeader";
   import { faHeart } from "@fortawesome/free-solid-svg-icons";

   const questions = questionsData as Question[];

   export default function CulturalFitPage() {
     return (
       <div className="space-y-6">
         <CategoryHeader
           title="Fit Cultural & Trabajo en Equipo"
           subtitle="Resolución de desacuerdos, alineación con la cultura del equipo, gestión de prioridades y feedback constructivo."
           badge="Cultura & Colaboración"
           categoryIcon={faHeart}
           count={questions.length}
         />
         <QuestionList questions={questions} />
       </div>
     );
   }
   ```

---

### Tarea 7: Ajuste Tipográfico en `app/globals.css`
1. Modificar la regla `body` en `app/globals.css`:
   ```css
   body {
     background: var(--background);
     color: var(--foreground);
     font-family: var(--font-sans), Arial, Helvetica, sans-serif;
   }
   ```

---

## 4. Plan de Verificación y Control de Calidad

El Agente Ejecutor deberá comprobar los siguientes puntos antes de dar por completada la implementación:

1. **Integridad de los 4 Archivos JSON Co-ubicados**:
   - Comprobar que `app/hr/questions.json`, `app/technical/questions.json`, `app/code/questions.json` y `app/cultural-fit/questions.json` sean archivos JSON sintácticamente válidos.
   - Verificar que todos los objetos cumplan con la interfaz `Question` (id, question, answer, category, tags).
   - En `app/code/questions.json`, verificar que los snippets de PHP contengan código sintácticamente correcto y legible.

2. **Verificación de Tipos y Compilación**:
   - Ejecutar `pnpm run lint` y verificar 0 errores o advertencias críticas de ESLint.
   - Ejecutar `pnpm run build` y confirmar que Next.js compile todas las rutas estáticas (`/`, `/hr`, `/technical`, `/code`, `/cultural-fit`) sin fallas de tipos.

3. **Prueba de Interfaz y Comportamiento**:
   - Navegar a `/hr`, `/technical`, `/code` y `/cultural-fit`: cada página debe desplegar su lista de preguntas correspondiente con el contador exacto en la cabecera.
   - En `/code`, los acordeones deben mostrar los snippets de código formateados dentro del contenedor oscuro con resaltado monoespaciado.
   - Al hacer clic en un acordeón, este debe expandirse con una animación suave de altura y el chevron debe rotar 180°. Al volver a hacer clic, debe replegarse.
   - Accesibilidad: el atributo `aria-expanded` debe alternar dinámicamente entre `true` y `false`, y `aria-controls` debe coincidir con el id del contenedor.

4. **Responsive y Mobile-First**:
   - En viewports móviles (< 640px), confirmar que los botones toggle tengan al menos 44px de altura táctil, sin desbordamiento horizontal y con espaciado cómodo.
