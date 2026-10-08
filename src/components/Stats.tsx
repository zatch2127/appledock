import { useEffect, useRef, useState } from "react";
import { useReveal } from "../lib/reveal";
import { prefersReducedMotion } from "../lib/motion";
import { site } from "../data/site";

function Counter({
  value,
  suffix,
}: {
  value: number | null;
  suffix: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (value === null) return;
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      setDisplay(value);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const duration = 1400;
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / duration);
          const eased = 1 - Math.pow(1 - p, 4);
          setDisplay(Math.round(eased * value));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="tnum">
      {value === null ? "XX" : display.toLocaleString("en-IN")}
      {suffix ? <span className="text-brass">{suffix}</span> : null}
    </span>
  );
}

export function Stats() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  const metrics = [
    { label: "Devices serviced", value: site.stats.devicesServiced, suffix: "+" },
    { label: "Customer satisfaction", value: site.stats.satisfaction, suffix: "%" },
    { label: "Years of experience", value: site.stats.yearsExperience, suffix: "+" },
    { label: "Service categories", value: site.stats.categories, suffix: "" },
  ];

  return (
    <section ref={root} aria-label="AppleDock at a glance" className="bg-ink">
      <div className="wrap border-y border-white/10 py-14 lg:py-16">
        <dl className="grid gap-y-10 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-4 lg:gap-x-0">
          {metrics.map((m, i) => (
            <div
              key={m.label}
              data-reveal
              data-reveal-delay={`${i * 0.08}`}
              className="border-white/10 lg:border-l lg:px-10 lg:first:border-l-0 lg:first:pl-0"
            >
              <dd className="text-5xl font-semibold tracking-tight text-bone lg:text-6xl">
                <Counter value={m.value} suffix={m.suffix} />
              </dd>
              <dt className="eyebrow mt-3 text-fog">{m.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
