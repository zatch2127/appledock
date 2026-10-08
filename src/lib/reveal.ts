import { useEffect, type RefObject } from "react";
import { getGsap, prefersReducedMotion } from "./motion";

/**
 * Declarative scroll-reveal system.
 *
 * Add `data-reveal` (optionally `data-reveal-delay="0.12"`) to any element
 * inside the scoped root:
 *
 *   data-reveal="up"     fade + rise (default)
 *   data-reveal="fade"   fade only
 *   data-reveal="clip"   clip-path wipe from the bottom (for imagery)
 *   data-reveal="left"   fade + slide from the left
 *   data-reveal="line"   scaleX draw for hairline rules
 *
 * Elements are fully visible by default — animation only enhances.
 * Reduced-motion users get no transform/opacity animation at all.
 */
export function useReveal(scope: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = scope.current;
    if (!root || prefersReducedMotion()) return;

    const { gsap } = getGsap();

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-reveal]", root);

      items.forEach((el) => {
        const type = el.dataset.reveal || "up";
        const delay = Number.parseFloat(el.dataset.revealDelay || "0");
        const trigger = { trigger: el, start: "top 88%", once: true };

        if (type === "clip") {
          gsap.fromTo(
            el,
            { clipPath: "inset(12% 0% 88% 0%)", scale: 1.06 },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              scale: 1,
              duration: 1.15,
              delay,
              ease: "expo.out",
              scrollTrigger: trigger,
            }
          );
        } else if (type === "line") {
          gsap.fromTo(
            el,
            { scaleX: 0 },
            {
              scaleX: 1,
              transformOrigin: "left center",
              duration: 1.1,
              delay,
              ease: "expo.out",
              scrollTrigger: trigger,
            }
          );
        } else if (type === "fade") {
          gsap.fromTo(
            el,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.9,
              delay,
              ease: "power2.out",
              scrollTrigger: trigger,
            }
          );
        } else if (type === "left") {
          gsap.fromTo(
            el,
            { x: -36, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.9,
              delay,
              ease: "power3.out",
              scrollTrigger: trigger,
            }
          );
        } else {
          gsap.fromTo(
            el,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              delay,
              ease: "power3.out",
              scrollTrigger: trigger,
            }
          );
        }
      });
    }, root);

    return () => ctx.revert();
  }, [scope]);
}
