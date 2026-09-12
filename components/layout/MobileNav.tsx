"use client";

import { MobileNavDrawer } from "./MobileNavDrawer";
import { MobileNavHeader } from "./MobileNavHeader";
import { useMobileNav } from "./useMobileNav";

export function MobileNav() {
  const { close, isOpen, toggle } = useMobileNav();

  return (
    <>
      <MobileNavHeader isOpen={isOpen} onToggle={toggle} />
      {isOpen && <MobileNavDrawer onClose={close} />}
    </>
  );
}
