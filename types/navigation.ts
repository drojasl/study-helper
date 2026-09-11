import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface NavItem {
  label: string;
  href: string;
  icon: IconDefinition;
  description: string;
}
