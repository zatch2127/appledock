import { useRef } from "react";
import { useReveal } from "../lib/reveal";
import { services, type Service } from "../data/services";
import { Eyebrow, ArrowLink } from "./ui";

function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <article
      data-reveal
      data-reveal-delay={`${(index % 3) * 0.09}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-ink/10 bg-white transition-all duration-500 hover:-translate-y-1 hover:border-ink/30 hover:shadow-[0_28px_64px_-36px_rgba(11,11,12,0.35)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-coal">
        <img
          src={service.image}
          alt={service.alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
        />
      </div>

      <div className="flex flex-1 flex-col p-6 lg:p-7">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-[19px] font-semibold tracking-tight text-ink">
            {service.name}
          </h3>
          <span className="eyebrow tnum text-ink/35">0{index + 1}</span>
        </div>

        <p className="mt-2 text-[13.5px] leading-relaxed text-ink/55">
          {service.blurb}
        </p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {service.repairs.slice(0, 5).map((r) => (
            <li
              key={r.name}
              className="rounded-md border border-ink/10 bg-bone/70 px-2.5 py-1 font-mono text-[10.5px] tracking-[0.06em] text-ink/55 uppercase"
            >
              {r.name}
            </li>
          ))}
          {service.repairs.length > 5 ? (
            <li className="rounded-md border border-brass-2/30 bg-brass/[0.08] px-2.5 py-1 font-mono text-[10.5px] tracking-[0.06em] text-brass-2 uppercase">
              +{service.repairs.length - 5} more
            </li>
          ) : null}
        </ul>

        <div className="mt-auto pt-6">
          <div className="border-t border-ink/10 pt-4">
            <ArrowLink
              tone="light"
              href={`#/services/${service.id}`}
              className="after:absolute after:inset-0"
            >
              View {service.noun} service
            </ArrowLink>
          </div>
        </div>
      </div>
    </article>
  );
}

export function Services() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section id="services" ref={root} className="bg-bone text-ink">
      <div className="wrap py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7" data-reveal>
            <Eyebrow index="02" tone="light">
              What we service
            </Eyebrow>
            <h2 className="mt-5 max-w-[20ch] text-3xl font-semibold tracking-[-0.03em] sm:text-4xl lg:text-5xl">
              Repair for every Apple device you own.
            </h2>
          </div>
          <div
            className="lg:col-span-5 lg:justify-self-end"
            data-reveal
            data-reveal-delay="0.12"
          >
            <p className="max-w-[46ch] text-[15px] leading-relaxed text-ink/55">
              Six service lines, every generation covered. Browse the overview
              here — or open the full catalogue for repair menus and supported
              models.
            </p>
            <ArrowLink tone="light" href="#/services" className="mt-5">
              View the full service catalogue
            </ArrowLink>
          </div>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
