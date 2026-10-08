import { useRef } from "react";
import { useReveal } from "../lib/reveal";
import { Eyebrow } from "./ui";
import whyImg from "../assets/why.jpg";

const reasons = [
  {
    n: "01",
    title: "Professional diagnostics",
    text: "Faults are confirmed on the bench before anything is quoted.",
  },
  {
    n: "02",
    title: "Transparent recommendations",
    text: "We repair what needs repairing — and tell you honestly what doesn't.",
  },
  {
    n: "03",
    title: "Quality-focused repairs",
    text: "Dependable components and careful assembly, checked before handover.",
  },
  {
    n: "04",
    title: "Experienced technicians",
    text: "Hands that know Apple hardware across every generation.",
  },
  {
    n: "05",
    title: "Customer-first service",
    text: "Plain language, realistic timelines and no pressure to commit.",
  },
  {
    n: "06",
    title: "Convenient support",
    text: "Start a request online, by phone or on WhatsApp — whatever suits you.",
  },
];

export function WhyUs() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section id="why" ref={root} className="bg-bone text-ink">
      <div className="wrap py-20 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          {/* Editorial column */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div data-reveal>
                <Eyebrow index="04" tone="light">
                  Why AppleDock
                </Eyebrow>
                <h2 className="mt-5 max-w-[16ch] text-3xl font-semibold tracking-[-0.03em] sm:text-4xl lg:text-[44px] lg:leading-[1.08]">
                  Why customers choose AppleDock.
                </h2>
                <p className="mt-5 max-w-[44ch] text-[15px] leading-relaxed text-ink/55">
                  Because a repair should feel straightforward: an honest
                  diagnosis, careful work, and a device that comes back working
                  the way it should.
                </p>
              </div>

              <figure className="mt-10" data-reveal="clip" data-reveal-delay="0.1">
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
                  <img
                    src={whyImg}
                    alt="AppleDock technician inspecting a smartphone under a desk lamp"
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 size-full object-cover"
                  />
                </div>
                <figcaption className="eyebrow mt-3.5 flex items-center gap-3 text-ink/45">
                  <span aria-hidden className="h-px w-7 bg-ink/25" />
                  Inside the AppleDock studio — Thane
                </figcaption>
              </figure>
            </div>
          </div>

          {/* Reasons */}
          <ol className="lg:col-span-7">
            {reasons.map((r, i) => (
              <li
                key={r.n}
                data-reveal
                data-reveal-delay={`${i * 0.06}`}
                className="group grid grid-cols-[auto_1fr] gap-x-6 border-t border-ink/12 py-7 transition-colors duration-300 last:border-b hover:bg-ink/[0.03] sm:gap-x-10 sm:py-8"
              >
                <span className="eyebrow tnum pt-1.5 text-ink/35 transition-colors duration-300 group-hover:text-brass-2">
                  {r.n}
                </span>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                    {r.title}
                  </h3>
                  <p className="mt-1.5 max-w-[52ch] text-[14px] leading-relaxed text-ink/55">
                    {r.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
