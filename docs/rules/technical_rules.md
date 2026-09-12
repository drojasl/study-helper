# Reglas Técnicas del Proyecto

## Herramientas Técnicas
- **Framework**: Aplicación en **Next.js**.
- **Estilos**: **Tailwind CSS**.
- **Diseño**: **Responsive y Mobile-First** (la vista más importante es en un celular).
- **Almacenamiento**: Las preguntas y respuestas se pueden almacenar en formato JSON o en Base de Datos. Por agilidad y simplicidad inicial, se recomienda el uso de archivos **JSON** para lecturas rápidas.

## Listas en React
- Evita usar `key={index}` como clave de elementos renderizados, ya que el índice puede cambiar cuando se agregan, eliminan o reordenan elementos.
- Usa un identificador estable del elemento. Cuando no exista uno, combina el valor identificable con el índice, por ejemplo `key={item + "-" + index}`.
