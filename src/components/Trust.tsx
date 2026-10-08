import { useRef } from "react";
import {
  ClipboardCheck,
  PackageCheck,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { useReveal } from "../lib/reveal";
import { Eyebrow } from "./ui";

const principles = [
  {
    icon: PackageCheck,
    title: "Quality parts",
    text: "Dependable replacement components and professional repair practice — never the cheapest option that happens to fit.",
  },
  {
    icon: Wrench,
    title: "Expert technicians",
    text: "Skilled technicians find the actual fault before recommending a fix. Diagnosis first, assumptions never.",
  },
  {
    icon: ClipboardCheck,
    title: "Transparent service",
    text: "A clear explanation of the problem, the options and the cost — agreed with you before any work begins.",
  },
  {
    icon: ShieldCheck,
    title: "Repair warranty",
    text: "Eligible repairs are backed by the AppleDock service warranty, explained in plain language before handover.",
  },
];

export function Trust() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section ref={root} className="relative bg-ink">
      <div className="wrap py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7" data-reveal>
            <Eyebrow index="01">The AppleDock standard</Eyebrow>
            <h2
              data-reveal
              data-reveal-delay="0.08"
              className="mt-5 max-w-[18ch] text-3xl font-semibold tracking-[-0.03em] text-bone sm:text-4xl lg:text-5xl"
            >
              Repair. Restore. Return with confidence.
            </h2>
          </div>
          <p
            data-reveal
            data-reveal-delay="0.16"
            className="max-w-[46ch] text-[15px] leading-relaxed text-fog lg:col-span-5 lg:justify-self-end"
          >
            A repair should feel straightforward. Four working principles shape
            every job that comes through the studio — regardless of how small
            the fix.
          </p>
        </div>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((p, i) => (
            <li
              key={p.title}
              data-reveal
              data-reveal-delay={`${i * 0.09}`}
              className="group bg-ink p-7 transition-colors duration-500 hover:bg-coal lg:p-8"
            >
              <div className="flex items-center justify-between">
                <p.icon
                  className="size-5 text-brass"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <span className="eyebrow tnum text-fog/50">0{i + 1}</span>
              </div>
              <h3 className="mt-8 text-[17px] font-semibold tracking-tight text-bone">
                {p.title}
              </h3>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-fog">
                {p.text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
