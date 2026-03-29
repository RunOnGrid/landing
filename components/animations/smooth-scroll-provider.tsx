"use client";

import Lenis from "lenis";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useReducedMotion } from "framer-motion";

type SmoothScrollContextValue = {
  lenis: Lenis | null;
  reduceMotion: boolean;
};

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  lenis: null,
  reduceMotion: false,
});

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion() ?? false;
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (reduceMotion) {
      document.documentElement.classList.remove("lenis");
      setLenis(null);
      return undefined;
    }

    const instance = new Lenis({
      duration: 1.1,
      lerp: 0.085,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.95,
      touchMultiplier: 1,
      gestureOrientation: "vertical",
      autoRaf: false,
    });

    let rafId = 0;

    const raf = (time: number) => {
      instance.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };

    document.documentElement.classList.add("lenis");
    rafId = window.requestAnimationFrame(raf);
    setLenis(instance);

    return () => {
      window.cancelAnimationFrame(rafId);
      instance.destroy();
      setLenis(null);
      document.documentElement.classList.remove("lenis");
    };
  }, [reduceMotion]);

  const value = useMemo(
    () => ({
      lenis,
      reduceMotion,
    }),
    [lenis, reduceMotion],
  );

  return (
    <SmoothScrollContext.Provider value={value}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}
