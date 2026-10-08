import { useCallback, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import { useReveal } from "../lib/reveal";
import {
  featuredTestimonials,
  supportingTestimonials,
} from "../data/testimonials";
import { Eyebrow } from "./ui";
import { cn } from "../utils/cn";

export function Testimonials() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);
  const [index, setIndex] = useState(0);
  const total = featuredTestimonials.length;

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + total) % total),
    [total]
  );

  const current = featuredTestimonials[index];

  return (
    <section id="reviews" ref={root} className="bg-bone text-ink">
      <div className="wrap py-20 lg:py-28">
        {/* Header */}
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7" data-reveal>
            <Eyebrow index="06" tone="light">
              Customer reviews
            </Eyebrow>
            <h2 className="mt-5 max-w-[18ch] text-3xl font-semibold tracking-[-0.03em] sm:text-4xl lg:text-5xl">
              What customers say.
            </h2>
          </div>
          <div
            className="lg:col-span-5 lg:justify-self-end"
            data-reveal
            data-reveal-delay="0.12"
          >
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2.5">
              <div
                className="flex items-center gap-1"
                role="img"
                aria-label="Rated 4.9 out of 5"
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-4 fill-brass text-brass"
                    aria-hidden
                  />
                ))}
              </div>
              <p className="text-[13.5px] leading-relaxed text-ink/55">
                <span className="tnum font-semibold text-ink">4.9</span> service
                rating — from post-repair feedback across Thane
              </p>
            </div>
          </div>
        </div>

        {/* Featured testimonial */}
        <div
          data-reveal
          className="mt-14 grid gap-10 rounded-xl border border-ink/10 bg-white p-7 sm:p-10 lg:grid-cols-12 lg:p-14"
        >
          <div className="lg:col-span-9" aria-live="polite">
            <Quote
              className="size-8 -scale-x-100 text-brass"
              strokeWidth={1.25}
              aria-hidden
            />
            <div key={index} className="quote-in">
              <blockquote className="mt-6 max-w-[34ch] text-[22px] leading-[1.35] font-medium tracking-[-0.015em] text-ink sm:max-w-none sm:text-[26px] lg:text-[30px]">
                “{current.quote}”
              </blockquote>
              <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                <span className="font-semibold text-ink">{current.name}</span>
                <span aria-hidden className="text-ink/30">
                  ·
                </span>
                <span className="text-ink/55">{current.area}</span>
                <span
                  aria-hidden
                  className="hidden text-ink/30 sm:inline"
                >
                  ·
                </span>
                <span className="font-mono text-[11px] tracking-[0.08em] text-brass-2 uppercase">
                  {current.service}
                </span>
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-end justify-between gap-6 lg:col-span-3 lg:flex-col lg:items-end">
            <span className="eyebrow tnum text-ink/45">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous review"
                className="flex size-11 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-bone"
              >
                <ArrowLeft className="size-4" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next review"
                className="flex size-11 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-bone"
              >
                <ArrowRight className="size-4" aria-hidden />
              </button>
            </div>
            <div className="hidden gap-1.5 lg:flex">
              {featuredTestimonials.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Go to review ${i + 1}`}
                  className={cn(
                    "h-1 rounded-full transition-all duration-300",
                    i === index ? "w-7 bg-brass" : "w-3 bg-ink/15 hover:bg-ink/30"
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Supporting testimonials */}
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {supportingTestimonials.map((t, i) => (
            <figure
              key={t.name}
              data-reveal
              data-reveal-delay={`${i * 0.08}`}
              className="flex flex-col rounded-xl border border-ink/10 bg-white p-6 lg:p-7"
            >
              <blockquote className="text-[14.5px] leading-relaxed text-ink/75">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-ink/10 pt-4 text-[13px]">
                <span className="font-semibold text-ink">{t.name}</span>
                <span aria-hidden className="text-ink/30">
                  ·
                </span>
                <span className="text-ink/50">{t.area}</span>
              </figcaption>
              <p className="mt-1.5 font-mono text-[10.5px] tracking-[0.08em] text-brass-2 uppercase">
                {t.service}
              </p>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
