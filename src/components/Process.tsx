import { useRef } from "react";
import { useReveal } from "../lib/reveal";
import { Eyebrow } from "./ui";

const steps = [
  {
    n: "01",
    title: "Diagnose",
    text: "We inspect the device and identify the underlying fault — not just the symptom on the surface.",
  },
  {
    n: "02",
    title: "Explain",
    text: "You get a clear explanation of the problem, the repair options and the cost. No work starts without your go-ahead.",
  },
  {
    n: "03",
    title: "Repair",
    text: "A trained technician performs the service using the right tools, quality components and careful practice.",
  },
  {
    n: "04",
    title: "Verify",
    text: "The functions that matter are tested before the device is returned — and the warranty is explained.",
  },
];

export function Process() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section id="process" ref={root} className="bg-coal">
      <div className="wrap py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7" data-reveal>
            <Eyebrow index="03">The repair process</Eyebrow>
            <h2 className="mt-5 max-w-[20ch] text-3xl font-semibold tracking-[-0.03em] text-bone sm:text-4xl lg:text-5xl">
              A clear process, from first look to final test.
            </h2>
          </div>
          <p
            className="max-w-[46ch] text-[15px] leading-relaxed text-fog lg:col-span-5 lg:justify-self-end"
            data-reveal
            data-reveal-delay="0.12"
          >
            Four steps, no surprises. You'll always know what we're doing to
            your device, why, and what it costs — before it happens.
          </p>
        </div>

        <ol className="mt-16 grid gap-12 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li
              key={s.n}
              data-reveal
              data-reveal-delay={`${i * 0.1}`}
              className="relative"
            >
              <span
                aria-hidden
                data-reveal="line"
                data-reveal-delay={`${0.1 + i * 0.12}`}
                className="relative mb-8 block h-px w-full bg-white/12"
              >
                <span className="absolute top-0 left-0 h-px w-10 bg-brass" />
              </span>
              <span
                aria-hidden
                className="tnum block text-[64px] leading-none font-semibold tracking-tight text-transparent"
                style={{ WebkitTextStroke: "1px rgba(245,245,243,0.28)" }}
              >
                {s.n}
              </span>
              <h3 className="mt-5 text-xl font-semibold tracking-tight text-bone">
                {s.title}
              </h3>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-fog">
                {s.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
