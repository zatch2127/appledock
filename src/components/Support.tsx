import { useRef } from "react";
import { BadgeCheck, CalendarCheck, Headset } from "lucide-react";
import { useReveal } from "../lib/reveal";

const items = [
  {
    icon: Headset,
    title: "Dedicated support",
    text: "Questions before or after your repair get real answers — from people who actually know your device.",
  },
  {
    icon: BadgeCheck,
    title: "Quality assurance",
    text: "Every completed repair goes through functional checks before it is handed back to you.",
  },
  {
    icon: CalendarCheck,
    title: "Convenient service",
    text: "Start a repair request online, by phone or on WhatsApp — then drop off your device when it suits you.",
  },
];

export function Support() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section ref={root} aria-label="Service highlights" className="bg-bone text-ink">
      <div className="wrap pb-20 lg:pb-28">
        <div
          data-reveal="line"
          className="h-px w-full origin-left bg-ink/15"
          aria-hidden
        />
        <div className="mt-12 grid gap-10 sm:mt-14 sm:grid-cols-3 sm:gap-8">
          {items.map((item, i) => (
            <div
              key={item.title}
              data-reveal
              data-reveal-delay={`${i * 0.08}`}
              className="border-t-2 border-ink/80 pt-6"
            >
              <div className="flex items-center justify-between">
                <item.icon
                  className="size-5 text-ink"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <span className="eyebrow tnum text-brass-2">
                  S.0{i + 1}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">
                {item.title}
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-ink/55">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
