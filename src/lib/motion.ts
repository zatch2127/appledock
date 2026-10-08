import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

/** Lazily registers GSAP plugins once and returns the core modules. */
export function getGsap() {
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return { gsap, ScrollTrigger };
}

/** True when the user prefers reduced motion — skip non-essential animation. */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export const EASE = "power3.out";
export const EASE_EXPO = "expo.out";
