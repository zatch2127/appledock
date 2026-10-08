import { useEffect, useRef } from "react";
import {
  ArrowRight,
  Asterisk,
  BadgeCheck,
  SearchCheck,
  ShieldCheck,
} from "lucide-react";
import { getGsap, prefersReducedMotion } from "../lib/motion";
import { services } from "../data/services";
import { site } from "../data/site";
import heroImg from "../assets/hero.jpg";

const trustPoints = [
  { icon: SearchCheck, label: "Up-front diagnosis" },
  { icon: BadgeCheck, label: "Quality-checked repairs" },
  { icon: ShieldCheck, label: "Backed by service warranty" },
];

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !root.current) return;
    const { gsap } = getGsap();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
        delay: 0.15,
      });

      tl.fromTo(
        ".h-eyebrow",
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 }
      )
        .fromTo(
          ".h-line > span",
          { yPercent: 112 },
          { yPercent: 0, duration: 1.05, stagger: 0.09 },
          "-=0.35"
        )
        .fromTo(
          ".h-underline",
          { scaleX: 0 },
          { scaleX: 1, duration: 0.9, ease: "power3.inOut" },
          "-=0.5"
        )
        .fromTo(
          ".h-sub",
          { y: 22, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85 },
          "-=0.65"
        )
        .fromTo(
          ".h-cta",
          { y: 22, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          ".h-trust",
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.55"
        )
        .fromTo(
          ".h-media",
          { clipPath: "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.25 },
          0.35
        )
        .fromTo(
          ".h-media-img",
          { scale: 1.14 },
          { scale: 1, duration: 1.6 },
          "<"
        )
        .fromTo(
          ".h-caption",
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          "-=0.9"
        )
        .fromTo(
          ".h-marquee",
          { opacity: 0 },
          { opacity: 1, duration: 0.9 },
          "-=0.5"
        );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="home" ref={root} className="relative overflow-hidden">
      {/* Technical grid backdrop */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(245,245,243,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(245,245,243,0.035) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 85% at 55% 15%, black 25%, transparent 78%)",
          maskImage:
            "radial-gradient(ellipse 90% 85% at 55% 15%, black 25%, transparent 78%)",
        }}
      />
      <div
        aria-hidden
        className="absolute -top-48 right-[-10%] size-[560px] rounded-full bg-brass/[0.05] blur-[130px]"
      />

      <div className="wrap relative grid gap-14 pt-32 pb-16 sm:pt-36 lg:grid-cols-12 lg:items-center lg:gap-10 lg:pt-44 lg:pb-24">
        {/* Copy */}
        <div className="lg:col-span-6 xl:col-span-6">
          <p className="h-eyebrow eyebrow flex items-center gap-3">
            <span aria-hidden className="size-1.5 rounded-full bg-brass" />
            <span className="text-fog">
              Apple device repair — {site.city}, {site.region}
            </span>
          </p>

          <h1 className="mt-6 text-4xl leading-[1.06] font-semibold tracking-[-0.035em] text-bone sm:text-6xl lg:text-[64px] lg:leading-[1.04] xl:text-[72px]">
            <span className="h-line block overflow-hidden pb-1">
              <span className="block">Your Apple device,</span>
            </span>
            <span className="h-line block overflow-hidden pb-2">
              <span className="block">
                handled by{" "}
                <span className="relative inline-block">
                  experts.
                  <span
                    aria-hidden
                    className="h-underline absolute right-0 -bottom-1 left-0 h-[3px] origin-left rounded-full bg-brass"
                  />
                </span>
              </span>
            </span>
          </h1>

          <p className="h-sub mt-6 max-w-[52ch] text-[15.5px] leading-relaxed text-fog sm:text-base">
            Professional repair and service for iPhone, MacBook, iPad, iMac,
            Apple Watch and AirPods — with transparent diagnostics, honest
            recommendations and dependable support.
          </p>

          <div className="h-cta mt-9 flex flex-wrap items-center gap-3.5">
            <a href="#/contact" className="btn btn-light btn-lg group">
              Book a Repair
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              />
            </a>
            <a href="#/services" className="btn btn-ghost-light btn-lg">
              Explore Services
            </a>
          </div>

          <ul className="h-trust mt-11 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/10 pt-6">
            {trustPoints.map((t) => (
              <li
                key={t.label}
                className="flex items-center gap-2 text-[13px] text-fog"
              >
                <t.icon className="size-4 text-brass" strokeWidth={1.75} aria-hidden />
                {t.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Media */}
        <div className="lg:col-span-6">
          <figure className="relative">
            <span
              aria-hidden
              className="absolute -top-2.5 -left-2.5 font-mono text-sm text-white/30 select-none"
            >
              +
            </span>
            <span
              aria-hidden
              className="absolute -top-2.5 -right-2.5 font-mono text-sm text-white/30 select-none"
            >
              +
            </span>
            <span
              aria-hidden
              className="absolute -bottom-2.5 -left-2.5 font-mono text-sm text-white/30 select-none"
            >
              +
            </span>
            <span
              aria-hidden
              className="absolute -right-2.5 -bottom-2.5 font-mono text-sm text-white/30 select-none"
            >
              +
            </span>

            <div className="h-media relative aspect-[4/3] overflow-hidden rounded-xl border border-white/12 bg-coal">
              <img
                src={heroImg}
                alt="Technician's gloved hands repairing an iPhone logic board at the AppleDock workbench"
                className="h-media-img absolute inset-0 size-full object-cover"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent"
              />
              <figcaption className="h-caption absolute inset-x-4 bottom-4 flex flex-col items-start gap-1.5 rounded-lg border border-white/10 bg-ink/55 px-4 py-3 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <span className="eyebrow text-fog tnum">Fig. 01 — The bench</span>
                <span className="text-[12.5px] leading-snug text-bone/90 sm:text-right">
                  Board-level service at the AppleDock studio, {site.city}
                </span>
              </figcaption>
            </div>
          </figure>
        </div>
      </div>

      {/* Device marquee */}
      <div className="h-marquee marquee relative border-y border-white/10 py-4">
        <div className="marquee-track flex w-max">
          {[0, 1].map((half) => (
            <ul
              key={half}
              aria-hidden={half === 1}
              className="flex w-max items-center"
            >
              {services.map((s) => (
                <li key={s.id} className="flex items-center">
                  <span className="eyebrow px-7 text-fog">{s.name}</span>
                  <Asterisk className="size-4 text-brass/70" aria-hidden />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
