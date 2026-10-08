import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { useReveal } from "../lib/reveal";
import { Eyebrow, ArrowLink } from "../components/ui";
import { CTA } from "../components/CTA";
import { services, totalRepairCount } from "../data/services";
import { site } from "../data/site";
import why from "../assets/why.jpg";
import hero from "../assets/hero.jpg";
import workshop1 from "../assets/workshop-1.jpg";
import workshop2 from "../assets/workshop-2.jpg";

const commitments = [
  {
    n: "01",
    title: "Diagnosis before decisions",
    text: "We find the fault before we quote the fix. If bench diagnosis changes the picture, you hear about it before we continue — never after.",
  },
  {
    n: "02",
    title: "Repair over replacement",
    text: "If a component can be repaired sensibly, we'll say so. And when replacement is genuinely the smarter call, we'll say that too — with reasons.",
  },
  {
    n: "03",
    title: "Plain language",
    text: "You'll understand what we're doing, why it costs what it costs, and what to expect — without needing to know what a PMIC is.",
  },
  {
    n: "04",
    title: "Quality parts, explained",
    text: "Where part options exist, we explain the grade, the price and the warranty difference. The choice — and the trade-off — stays with you.",
  },
  {
    n: "05",
    title: "Care with your data",
    text: "Most hardware work never touches your data. Where software access is genuinely needed, we ask first and keep it between us.",
  },
  {
    n: "06",
    title: "Tested before it leaves",
    text: "Every repair closes with functional checks — display, touch, audio, cameras, sensors, charging — demonstrated at handover wherever possible.",
  },
];

const factSheet = [
  { label: "Company", value: site.legalName },
  { label: "Studio type", value: "Independent Apple device repair & service" },
  { label: "Location", value: `${site.city}, ${site.region}, ${site.country}` },
  {
    label: "Service lines",
    value: services.map((s) => s.noun).join(" · "),
  },
  { label: "Repair catalogue", value: `${totalRepairCount} listed services` },
  { label: "Diagnostics", value: "Bench-first, quoted up-front" },
  { label: "Warranty", value: "On eligible repairs — terms explained at handover" },
  { label: "Response channels", value: "Online form · Phone · WhatsApp" },
  { label: "Established", value: String(site.established) },
];

const gallery = [
  {
    src: workshop1,
    alt: "Precision driver working on a MacBook logic board under a task lamp",
    caption: "Fig. A1 — Board-level diagnosis",
    span: "lg:col-span-7",
  },
  {
    src: why,
    alt: "Technician inspecting a smartphone screen under a desk lamp",
    caption: "Fig. A2 — Inspection at the lamp",
    span: "lg:col-span-5",
  },
  {
    src: hero,
    alt: "Gloved hands working on an iPhone logic board",
    caption: "Fig. A3 — Small-part precision",
    span: "lg:col-span-5",
  },
  {
    src: workshop2,
    alt: "Organised repair workbench with an opened laptop and tools in rows",
    caption: "Fig. A4 — The organised bench",
    span: "lg:col-span-7",
  },
];

function TheMark() {
  return (
    <div className="rounded-xl border border-ink/10 bg-white p-7 sm:p-9" data-reveal>
      <div className="grid items-center gap-8 sm:grid-cols-[auto_1fr]">
        <div className="mx-auto flex size-28 items-center justify-center rounded-2xl border border-ink/10 bg-bone sm:size-32">
          <svg width="64" height="64" viewBox="0 0 32 32" aria-hidden>
            <path
              d="M9 21.5h14"
              stroke="#0B0B0C"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <path
              d="M12.5 16.5h7"
              stroke="#0B0B0C"
              strokeOpacity="0.4"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <circle cx="16" cy="11" r="2.6" fill="#DFA33B" />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-ink">
            The mark, in three strokes.
          </h3>
          <ul className="mt-4 flex flex-col gap-3">
            {[
              "The slot — where the device comes to rest.",
              "The status light — from faulty to fixed.",
              "Back online — the only point of the exercise.",
            ].map((line, i) => (
              <li key={line} className="flex items-baseline gap-3">
                <span className="eyebrow tnum shrink-0 text-brass-2">
                  0{i + 1}
                </span>
                <span className="text-[13.5px] leading-relaxed text-ink/60">
                  {line}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function AboutPage() {
  const root = useRef<HTMLDivElement>(null);
  useReveal(root);

  useEffect(() => {
    document.title = "About AppleDock — Independent Apple Repair Studio in Thane";
  }, []);

  return (
    <div ref={root}>
      {/* Page hero */}
      <section className="relative overflow-hidden bg-ink">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(245,245,243,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(245,245,243,0.035) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            WebkitMaskImage:
              "radial-gradient(ellipse 90% 90% at 50% 0%, black 25%, transparent 78%)",
            maskImage:
              "radial-gradient(ellipse 90% 90% at 50% 0%, black 25%, transparent 78%)",
          }}
        />
        <div className="wrap relative pt-32 pb-16 sm:pt-40 lg:pt-44 lg:pb-20">
          <p data-reveal className="eyebrow flex items-center gap-3">
            <span aria-hidden className="size-1.5 rounded-full bg-brass" />
            <span className="text-fog">About AppleDock</span>
          </p>
          <h1
            data-reveal
            data-reveal-delay="0.06"
            className="mt-6 max-w-[15ch] text-4xl leading-[1.06] font-semibold tracking-[-0.035em] text-bone sm:text-6xl lg:text-[68px]"
          >
            A repair studio built on discipline, not shortcuts.
          </h1>
          <p
            data-reveal
            data-reveal-delay="0.12"
            className="mt-6 max-w-[56ch] text-[15.5px] leading-relaxed text-fog"
          >
            AppleDock is an independent Apple device service studio in{" "}
            {site.city}, {site.region}. We exist to make professional repair
            feel straightforward — honest diagnosis, careful work, clear
            communication.
          </p>
          <ul
            data-reveal
            data-reveal-delay="0.18"
            className="mt-9 flex flex-wrap gap-2"
          >
            {[
              "Independent studio",
              `${site.city}, ${site.region}`,
              `${services.length} service lines`,
            ].map((chip) => (
              <li
                key={chip}
                className="rounded-full border border-white/15 px-3.5 py-1.5 font-mono text-[11px] tracking-[0.1em] text-fog uppercase"
              >
                {chip}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why we exist */}
      <section className="bg-bone text-ink">
        <div className="wrap py-16 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7" data-reveal>
              <Eyebrow index="01" tone="light">
                Why AppleDock exists
              </Eyebrow>
              <p className="mt-6 max-w-[26ch] text-[26px] leading-[1.3] font-medium tracking-[-0.02em] text-ink sm:text-[32px] lg:text-[36px]">
                Most people don't want a new device. They want their device —
                with their photos, messages and setup — back in their hands,
                working.
              </p>
            </div>
            <div className="lg:col-span-5" data-reveal data-reveal-delay="0.12">
              <div className="flex flex-col gap-5 text-[15px] leading-relaxed text-ink/60 lg:pt-14">
                <p>
                  Walk into a typical repair market and the experience is
                  depressingly familiar: a vague quote, a device that
                  disappears into a back room, and a bill that only makes sense
                  when you pay it. AppleDock was started because Apple users in{" "}
                  {site.city} deserve better than that.
                </p>
                <p>
                  So the studio runs on three working rules: the fault is
                  diagnosed before anything is quoted; nothing is repaired
                  without your approval; and nothing is returned without being
                  tested.
                </p>
                <p>
                  AppleDock is independent — not authorised or endorsed by
                  Apple Inc., and we say that plainly. Independence is what
                  lets us recommend repair over replacement, explain part
                  grades honestly, and charge for the work — not for a logo on
                  the door.
                </p>
              </div>
            </div>
          </div>

          {/* The name */}
          <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12">
            <div className="lg:col-span-5" data-reveal>
              <Eyebrow index="02" tone="light">
                Why the name
              </Eyebrow>
              <h2 className="mt-5 max-w-[18ch] text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
                A dock is where a device comes back to life.
              </h2>
              <p className="mt-5 max-w-[44ch] text-[15px] leading-relaxed text-ink/60">
                A dock is where a device rests, connects and recharges. We
                liked the idea: a place your device arrives tired — and leaves
                ready. That's the whole business in one word, so we put it on
                the door.
              </p>
            </div>
            <div className="lg:col-span-7">
              <TheMark />
            </div>
          </div>
        </div>
      </section>

      {/* Commitments */}
      <section className="border-t border-ink/10 bg-bone text-ink">
        <div className="wrap py-16 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7" data-reveal>
              <Eyebrow index="03" tone="light">
                How we work
              </Eyebrow>
              <h2 className="mt-5 max-w-[20ch] text-3xl font-semibold tracking-[-0.03em] sm:text-4xl lg:text-5xl">
                Six commitments, kept on every single job.
              </h2>
            </div>
            <p
              data-reveal
              data-reveal-delay="0.12"
              className="max-w-[46ch] text-[15px] leading-relaxed text-ink/55 lg:col-span-5 lg:justify-self-end"
            >
              Not a mission statement for the wall — the working standards our
              bench is measured against, from a battery swap to a liquid-damage
              rebuild.
            </p>
          </div>

          <ol className="mt-12 grid gap-x-12 sm:grid-cols-2">
            {commitments.map((c, i) => (
              <li
                key={c.n}
                data-reveal
                data-reveal-delay={`${(i % 2) * 0.07}`}
                className="group border-t border-ink/12 py-7 last:border-b sm:[&:nth-last-child(2)]:border-b"
              >
                <div className="flex items-baseline gap-5">
                  <span className="eyebrow tnum text-ink/35 transition-colors duration-300 group-hover:text-brass-2">
                    {c.n}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight">
                      {c.title}
                    </h3>
                    <p className="mt-2 max-w-[52ch] text-[14px] leading-relaxed text-ink/55">
                      {c.text}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Studio gallery */}
      <section className="bg-ink">
        <div className="wrap py-16 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7" data-reveal>
              <Eyebrow index="04">The studio</Eyebrow>
              <h2 className="mt-5 max-w-[20ch] text-3xl font-semibold tracking-[-0.03em] text-bone sm:text-4xl lg:text-5xl">
                A quiet, organised place to work.
              </h2>
            </div>
            <p
              data-reveal
              data-reveal-delay="0.12"
              className="max-w-[46ch] text-[15px] leading-relaxed text-fog lg:col-span-5 lg:justify-self-end"
            >
              ESD-safe benches, magnification for small-part work, and a
              parts-mapping discipline that means every screw goes back where
              it came from. This is where your device is serviced.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-12">
            {gallery.map((g, i) => (
              <figure
                key={g.caption}
                data-reveal="clip"
                data-reveal-delay={`${(i % 2) * 0.08}`}
                className={g.span}
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/10 bg-coal">
                  <img
                    src={g.src}
                    alt={g.alt}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 size-full object-cover"
                  />
                </div>
                <figcaption className="eyebrow mt-3.5 flex items-center gap-3 text-fog/70">
                  <span aria-hidden className="h-px w-7 bg-white/25" />
                  {g.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Fact sheet + people */}
      <section className="bg-bone text-ink">
        <div className="wrap py-16 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5" data-reveal>
              <div className="lg:sticky lg:top-28">
                <Eyebrow index="05" tone="light">
                  The company
                </Eyebrow>
                <h2 className="mt-5 max-w-[16ch] text-3xl font-semibold tracking-[-0.03em] sm:text-4xl lg:text-[42px] lg:leading-[1.1]">
                  The people at the bench.
                </h2>
                <p className="mt-5 max-w-[44ch] text-[15px] leading-relaxed text-ink/60">
                  Every repair is owned end-to-end by one technician — the same
                  hands that diagnosed your device are the hands that return
                  it. No hand-offs, no "the other shift will know."
                </p>
                <p className="mt-4 max-w-[44ch] text-[15px] leading-relaxed text-ink/60">
                  Walk in with a device and you'll meet the person who'll
                  actually work on it — that's deliberate. Small team, senior
                  hands, real accountability.
                </p>
                <ArrowLink tone="light" href="#/contact" className="mt-7">
                  Meet us — start a repair request
                </ArrowLink>
              </div>
            </div>

            <div className="lg:col-span-7" data-reveal data-reveal-delay="0.1">
              <div className="overflow-hidden rounded-xl border border-ink/10 bg-white">
                <div className="flex items-center justify-between border-b border-ink/10 px-6 py-4 sm:px-8">
                  <h3 className="text-[15px] font-semibold tracking-tight">
                    Company fact sheet
                  </h3>
                  <span className="eyebrow text-ink/40 tnum">
                    {site.name} / {site.city}
                  </span>
                </div>
                <dl>
                  {factSheet.map((row) => (
                    <div
                      key={row.label}
                      className="grid grid-cols-[130px_1fr] gap-4 border-b border-ink/8 px-6 py-4 last:border-b-0 sm:grid-cols-[180px_1fr] sm:px-8"
                    >
                      <dt className="eyebrow pt-0.5 text-ink/45">{row.label}</dt>
                      <dd className="text-[14px] leading-relaxed font-medium text-ink">
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-brass-2/40 bg-brass/[0.07] px-6 py-5 sm:px-8">
                <p className="max-w-[52ch] text-[13.5px] leading-relaxed text-ink/70">
                  Independent service provider. Not affiliated with, authorised
                  or endorsed by Apple Inc. Trademarks belong to their owners.
                </p>
                <a
                  href="#/contact"
                  className="btn btn-ink btn-sm group shrink-0"
                >
                  Get in touch
                  <ArrowUpRight
                    className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
}
