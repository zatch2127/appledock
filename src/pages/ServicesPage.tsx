import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BatteryCharging,
  Cable,
  Camera,
  Cpu,
  Droplets,
  HardDrive,
  Mic,
  MonitorSmartphone,
  Plus,
} from "lucide-react";
import { useReveal } from "../lib/reveal";
import { prefersReducedMotion } from "../lib/motion";
import { queueDevicePrefill } from "../lib/router";
import { services, totalRepairCount, type Service } from "../data/services";
import { Eyebrow, ArrowLink } from "../components/ui";
import { CTA } from "../components/CTA";
import { cn } from "../utils/cn";

/* What we repair — capability categories across every device line. */
const capabilities = [
  {
    icon: MonitorSmartphone,
    title: "Screen & display",
    text: "Cracked glass, dead pixels, touch faults, lines and backlight issues.",
  },
  {
    icon: BatteryCharging,
    title: "Battery & charging",
    text: "Fast drain, swollen cells, loose ports and slow-charging faults.",
  },
  {
    icon: Cpu,
    title: "Board-level faults",
    text: "No-power and no-display cases diagnosed at component level.",
  },
  {
    icon: Camera,
    title: "Cameras & sensors",
    text: "Blurry images, cracked lens glass, focus and sensor failures.",
  },
  {
    icon: Mic,
    title: "Audio & microphones",
    text: "Ear speakers, loudspeakers, crackling and dead microphones.",
  },
  {
    icon: Cable,
    title: "Buttons, ports & flexes",
    text: "Power and volume buttons, connectors and damaged flex cables.",
  },
  {
    icon: HardDrive,
    title: "Software & data",
    text: "Boot loops, restores, OS installs, migration and backup help.",
  },
  {
    icon: Droplets,
    title: "Liquid damage assessment",
    text: "Careful teardown, corrosion inspection and honest recovery advice.",
  },
];

function DeviceSection({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const flip = index % 2 === 1;

  return (
    <section
      id={`svc-${service.id}`}
      aria-label={service.name}
      className="scroll-mt-36 border-t border-ink/10 py-16 first:border-t-0 first:pt-10 lg:py-20"
    >
      <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Image */}
        <figure
          data-reveal="clip"
          className={cn("lg:col-span-5", flip && "lg:order-2")}
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-ink/10 bg-coal">
            <img
              src={service.image}
              alt={service.alt}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 size-full object-cover"
            />
          </div>
          <figcaption className="eyebrow mt-3.5 flex items-center gap-3 text-ink/45">
            <span aria-hidden className="h-px w-7 bg-ink/25" />
            <span className="tnum">Fig. S{index + 1}</span>
            <span>—</span>
            <span>{service.noun} service bench</span>
          </figcaption>
        </figure>

        {/* Content */}
        <div className={cn("lg:col-span-7", flip && "lg:order-1")}>
          <div data-reveal>
            <Eyebrow index={String(index + 1).padStart(2, "0")} tone="light">
              {service.name}
            </Eyebrow>
            <h3 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-4xl">
              {service.noun}
            </h3>
            <p className="mt-4 max-w-[58ch] text-[15px] leading-relaxed text-ink/55">
              {service.intro}
            </p>
          </div>

          <div className="mt-9" data-reveal data-reveal-delay="0.08">
            <h4 className="eyebrow text-ink/45">
              What we repair on {service.noun}
            </h4>
            <ul className="mt-4 grid gap-x-10 sm:grid-cols-2">
              {service.repairs.map((r) => (
                <li key={r.name} className="flex gap-3 border-b border-ink/10 py-4">
                  <Plus
                    className="mt-1 size-3.5 shrink-0 text-brass-2"
                    strokeWidth={2.25}
                    aria-hidden
                  />
                  <div>
                    <p className="text-[14.5px] font-semibold tracking-tight text-ink">
                      {r.name}
                    </p>
                    <p className="mt-1 text-[13px] leading-relaxed text-ink/55">
                      {r.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8" data-reveal data-reveal-delay="0.14">
            <h4 className="eyebrow text-ink/45">Models covered</h4>
            <ul className="mt-3.5 flex flex-wrap gap-1.5">
              {service.models.map((m) => (
                <li
                  key={m}
                  className="rounded-md border border-ink/10 bg-white px-2.5 py-1.5 font-mono text-[10.5px] tracking-[0.06em] text-ink/60 uppercase"
                >
                  {m}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-4" data-reveal data-reveal-delay="0.2">
            <a
              href="#/contact"
              onClick={() => queueDevicePrefill(service.id)}
              className="btn btn-ink btn-md group"
            >
              Book {service.noun} repair
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              />
            </a>
            <p className="text-[12.5px] text-ink/45">
              Diagnosis first — fixed quote before any work begins.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServicesPage() {
  const root = useRef<HTMLDivElement>(null);
  useReveal(root);
  const [activeDevice, setActiveDevice] = useState(services[0].id);

  useEffect(() => {
    document.title =
      "Services — iPhone, MacBook, iPad, iMac, Watch & AirPods Repair | AppleDock Thane";
  }, []);

  // Sub-nav scroll-spy.
  useEffect(() => {
    const sections = services
      .map((s) => document.getElementById(`svc-${s.id}`))
      .filter((el): el is HTMLElement => Boolean(el));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting)
            setActiveDevice(e.target.id.replace("svc-", ""));
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const jumpTo = (id: string) => {
    document.getElementById(`svc-${id}`)?.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "start",
    });
  };

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
            <span className="text-fog">Services · Full catalogue</span>
          </p>
          <h1
            data-reveal
            data-reveal-delay="0.06"
            className="mt-6 max-w-[15ch] text-4xl leading-[1.06] font-semibold tracking-[-0.035em] text-bone sm:text-6xl lg:text-[68px]"
          >
            What we repair — and everything we repair it on.
          </h1>
          <p
            data-reveal
            data-reveal-delay="0.12"
            className="mt-6 max-w-[56ch] text-[15.5px] leading-relaxed text-fog"
          >
            From cracked screens to board-level faults, every service below
            follows the same discipline: diagnose first, quote up-front, repair
            carefully, verify before handover.
          </p>
          <ul
            data-reveal
            data-reveal-delay="0.18"
            className="mt-9 flex flex-wrap gap-2"
          >
            {[
              `${services.length} device lines`,
              `${totalRepairCount} repair services`,
              "All generations covered",
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

      {/* What we repair */}
      <section className="bg-bone text-ink">
        <div className="wrap py-16 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7" data-reveal>
              <Eyebrow index="01" tone="light">
                What we repair
              </Eyebrow>
              <h2 className="mt-5 max-w-[20ch] text-3xl font-semibold tracking-[-0.03em] sm:text-4xl lg:text-5xl">
                Faults we see — and fix — every day.
              </h2>
            </div>
            <p
              data-reveal
              data-reveal-delay="0.12"
              className="max-w-[46ch] text-[15px] leading-relaxed text-ink/55 lg:col-span-5 lg:justify-self-end"
            >
              Eight fault categories cover most of what goes wrong with an
              Apple device. If yours isn't here, ask — diagnosis comes before
              promises.
            </p>
          </div>

          <ul className="mt-12 grid gap-px overflow-hidden rounded-xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((c, i) => (
              <li
                key={c.title}
                data-reveal
                data-reveal-delay={`${(i % 4) * 0.07}`}
                className="group bg-bone p-6 transition-colors duration-500 hover:bg-white lg:p-7"
              >
                <div className="flex items-center justify-between">
                  <c.icon
                    className="size-5 text-brass-2"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  <span className="eyebrow tnum text-ink/30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-7 text-[15.5px] font-semibold tracking-tight text-ink">
                  {c.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-ink/55">
                  {c.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Device sub-nav */}
      <nav
        aria-label="Browse by device"
        className="sticky top-[68px] z-40 border-y border-ink/10 bg-bone/85 backdrop-blur-md"
      >
        <div className="wrap flex items-center gap-2 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <span className="eyebrow mr-2 hidden shrink-0 text-ink/40 sm:block">
            Devices
          </span>
          {services.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => jumpTo(s.id)}
              aria-current={activeDevice === s.id ? "true" : undefined}
              className={cn(
                "h-9 shrink-0 cursor-pointer rounded-full border px-4 text-[13px] font-medium whitespace-nowrap transition-all duration-300",
                activeDevice === s.id
                  ? "border-ink bg-ink text-bone"
                  : "border-ink/15 bg-transparent text-ink/60 hover:border-ink/50 hover:text-ink"
              )}
            >
              {s.noun}
            </button>
          ))}
        </div>
      </nav>

      {/* Which products we repair */}
      <section className="bg-bone text-ink">
        <div className="wrap pb-8 lg:pb-12">
          <div className="pt-14 lg:pt-20">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7" data-reveal>
                <Eyebrow index="02" tone="light">
                  Which products we repair
                </Eyebrow>
                <h2 className="mt-5 max-w-[22ch] text-3xl font-semibold tracking-[-0.03em] sm:text-4xl lg:text-5xl">
                  Choose your device. See exactly what's covered.
                </h2>
              </div>
              <p
                data-reveal
                data-reveal-delay="0.12"
                className="max-w-[46ch] text-[15px] leading-relaxed text-ink/55 lg:col-span-5 lg:justify-self-end"
              >
                Every device line has its own repair menu and supported model
                list — no vague "we fix everything" claims.
              </p>
            </div>
          </div>

          {services.map((s, i) => (
            <DeviceSection key={s.id} service={s} index={i} />
          ))}

          <div
            data-reveal
            className="flex flex-col items-center gap-4 border-t border-ink/10 py-14 text-center"
          >
            <p className="max-w-[46ch] text-[15px] leading-relaxed text-ink/55">
              Can't find your fault or your model? We diagnose before we
              promise — start a request and describe it in your own words.
            </p>
            <ArrowLink tone="light" href="#/contact">
              Ask about your repair
            </ArrowLink>
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
}
