import {
  faHouse,
  faUserTie,
  faBrain,
  faCode,
  faHandshake,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import type { NavItem } from "@/types/navigation";

export const NAV_ITEMS: readonly NavItem[] = [
  {
    label: "Inicio",
    href: "/",
    icon: faHouse,
    description: "Resumen y accesos directos a las secciones de estudio",
  },
  {
    label: "Recursos Humanos",
    href: "/hr",
    icon: faUserTie,
    description: "Preguntas conductuales, fortalezas y metodología STAR",
  },
  {
    label: "Técnica Conceptual",
    href: "/technical",
    icon: faBrain,
    description: "Arquitectura, patrones de diseño y conceptos teóricos",
  },
  {
    label: "Técnica de Código",
    href: "/code",
    icon: faCode,
    description: "Algoritmos, estructuras de datos y resolución de problemas",
  },
  {
    label: "Cultural Fit",
    href: "/cultural-fit",
    icon: faHandshake,
    description: "Valores, trabajo en equipo y resolución de conflictos",
  },
  {
    label: "Agregar preguntas",
    href: "/questions/new",
    icon: faSquarePlus,
    description: "Añade preguntas mediante formulario o JSON RAW",
  },
] as const;
