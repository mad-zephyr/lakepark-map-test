"use client";

import { FC, PropsWithChildren, useEffect } from "react";
import { ReactLenis } from "@/libs/lenis/lenis";
import Lenis from "lenis";

export const ContextWrapper: FC<PropsWithChildren> = ({ children }) => {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);

      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return <ReactLenis root>{children}</ReactLenis>;
};
