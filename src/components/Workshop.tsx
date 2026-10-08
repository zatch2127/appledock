import { useRef } from "react";
import { BadgeCheck, ScanSearch, ShieldCheck, Plus } from "lucide-react";
import { useReveal } from "../lib/reveal";
import { Eyebrow, ArrowLink } from "./ui";
import workshop1 from "../assets/workshop-1.jpg";
import workshop2 from "../assets/workshop-2.jpg";

const practices = [
  {
    icon: ShieldCheck,
    title: "ESD-safe workstations",
    text: "Antistatic mats, grounded tools and careful part handling as standard.",
  },
  {
    icon: ScanSearch,
    title: "Component-level inspection",
    text: "Boards, connectors and flexes examined closely before any conclusion.",
  },
  {
    icon: BadgeCheck,
    title: "Post-repair testing",
    text: "Display, touch, audio, cameras, sensors and charging verified after service.",
  },
];

const benchNotes = [
  "Every screw mapped",
  "Every connector seated",
  "Every function tested",
];

export function Workshop() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section id="about" ref={root} className="bg-ink">
      <div className="wrap py-20 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          {/* Copy */}
          <div className="lg:col-span-5">
            <div data-reveal>
              <Eyebrow index="05">Inside AppleDock</Eyebrow>
              <h2 className="mt-5 max-w-[16ch] text-3xl font-semibold tracking-[-0.03em] text-bone sm:text-4xl lg:text-[44px] lg:leading-[1.08]">
                Precision starts at the workbench.
              </h2>
              <p className="mt-5 max-w-[44ch] text-[15px] leading-relaxed text-fog">
                Good repair work is quiet work: a clean bench, the right tools
                and patient diagnostics. This is the environment your device is
                serviced in.
              </p>
            </div>

            <ul className="mt-10 flex flex-col gap-6">
              {practices.map((p, i) => (
                <li
                  key={p.title}
                  data-reveal
                  data-reveal-delay={`${0.08 + i * 0.07}`}
                  className="flex gap-4"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-white/12 bg-coal">
                    <p.icon
                      className="size-[18px] text-brass"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                  </span>
                  <div>
                    <h3 className="text-[15px] font-semibold tracking-tight text-bone">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-[13.5px] leading-relaxed text-fog">
                      {p.text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10" data-reveal="fade" data-reveal-delay="0.3">
              <ArrowLink tone="dark" href="#/about">
                More about the studio & the company
              </ArrowLink>
            </div>
          </div>

          {/* Imagery */}
          <div className="grid content-start gap-5 lg:col-span-7">
            <figure data-reveal="clip">
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/10">
                <img
                  src={workshop1}
                  alt="Precision driver working on a MacBook logic board under a task lamp"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 size-full object-cover"
                />
              </div>
              <figcaption className="eyebrow mt-3.5 flex items-center gap-3 text-fog/70">
                <span aria-hidden className="h-px w-7 bg-white/25" />
                Fig. 02 — Component-level diagnosis
              </figcaption>
            </figure>

            <div className="grid gap-5 sm:grid-cols-2">
              <figure data-reveal="clip" data-reveal-delay="0.08">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10">
                  <img
                    src={workshop2}
                    alt="Organised repair workbench with an opened laptop, screw trays and tools"
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 size-full object-cover"
                  />
                </div>
                <figcaption className="eyebrow mt-3.5 flex items-center gap-3 text-fog/70">
                  <span aria-hidden className="h-px w-7 bg-white/25" />
                  Fig. 03 — The organised bench
                </figcaption>
              </figure>

              <div
                data-reveal
                data-reveal-delay="0.14"
                className="flex flex-col justify-between rounded-xl border border-white/10 bg-coal p-6"
              >
                <p className="eyebrow text-fog/70">Bench notes</p>
                <ul className="mt-6 flex flex-col divide-y divide-white/8">
                  {benchNotes.map((n) => (
                    <li
                      key={n}
                      className="flex items-center gap-3 py-3.5 first:pt-0 last:pb-0"
                    >
                      <Plus className="size-3.5 text-brass" aria-hidden />
                      <span className="font-mono text-[12.5px] tracking-[0.04em] text-bone/85 uppercase">
                        {n}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-[12.5px] leading-relaxed text-fog/80">
                  The discipline behind every repair that leaves the studio.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
