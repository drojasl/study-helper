# Requerimiento 1: Layout y Navegación

## 1. Definición de la Característica
Este requerimiento define la base estructural y de navegación para el buscador de respuestas de entrevistas. Se busca establecer una plantilla (Template) con enfoque **Mobile-First** utilizando el **App Router** de Next.js y Tailwind CSS. La navegación permitirá al usuario saltar rápidamente entre los 4 tipos de entrevista principales: Entrevista HR, Técnica Conceptual, Técnica de Código, y Cultural Fit.

## 2. Ítems del Requerimiento
- **Ítem 1**: Diseñar la plantilla base (Layout responsive mobile-first, Next.js App Router, Tailwind).
- **Ítem 2**: Diseñar el menú de navegación (Menú hamburguesa en mobile, Sidebar fijo en desktop, enlaces a los 4 tipos de entrevista).

## 3. Criterios de Aceptación (AC)
- **AC1**: El proyecto utiliza la estructura recomendada del App Router (`app/layout.tsx`).
- **AC2**: El diseño en mobile se muestra con un header superior y un menú de navegación colapsado tras un ícono tipo "hamburguesa".
- **AC3**: El diseño en pantallas desktop (`md` o superiores en Tailwind) despliega un Sidebar fijo a la izquierda que contiene todos los enlaces, dejando la sección derecha para el contenido principal.
- **AC4**: Los enlaces de navegación (HR, Técnica Conceptual, Código, Cultural Fit) enrutan correctamente a sus respectivas vistas y resaltan la ruta activa.

## 4. Escenarios de Uso
- **Escenario 1: Navegación Mobile**
  - *Dado* que accedo desde mi teléfono,
  - *Cuando* abro la aplicación,
  - *Entonces* veo un layout limpio y, al presionar el menú hamburguesa, se despliegan las categorías de entrevistas disponibles.
- **Escenario 2: Navegación Desktop**
  - *Dado* que accedo desde mi PC,
  - *Cuando* visualizo la aplicación,
  - *Entonces* observo de forma continua el menú de navegación (Sidebar) anclado a la izquierda, pudiendo cambiar de sección sin abrir menús extra.

## 5. Componentes Involucrados
- `app/layout.tsx`: Layout raíz que inyecta la navegación base.
- `components/layout/Navigation.tsx`: Contiene la lógica visual (Sidebar o Menú Hamburguesa según el tamaño de la pantalla).
