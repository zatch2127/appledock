import { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";
import { useReveal } from "../lib/reveal";
import { Contact } from "../components/Contact";
import { Eyebrow } from "../components/ui";
import { site } from "../data/site";
import { cn } from "../utils/cn";

const nextSteps = [
  {
    n: "01",
    title: "We review your request",
    text: "A technician reads your description and notes the likely causes before we respond.",
  },
  {
    n: "02",
    title: "We call to confirm",
    text: "Symptoms confirmed, questions answered, and an approximate direction shared before you visit.",
  },
  {
    n: "03",
    title: "You approve, we repair",
    text: "A fixed quote agreed up-front. Your device is tested and returned with the warranty explained.",
  },
];

const faqs = [
  {
    q: "How much will my repair cost?",
    a: "It depends on the fault — not guesses. We diagnose first, then give you a fixed quote before any work begins. You approve only if it makes sense to you.",
  },
  {
    q: "How long does a repair take?",
    a: "Many common repairs are quick, but the honest answer depends on the fault and parts availability. Your timeline is confirmed when you approve the quote — never before.",
  },
  {
    q: "Do you use genuine parts?",
    a: "We offer quality replacement options and explain the differences — grade, price and warranty — so you can choose with full information rather than fine print.",
  },
  {
    q: "Will I lose my data?",
    a: "Most hardware repairs don't touch your data. We still recommend a backup before any service, and for software work we confirm the options with you first.",
  },
  {
    q: "Is there a warranty on repairs?",
    a: "Eligible repairs include the AppleDock service warranty. Coverage and terms are explained in plain language when your device is returned.",
  },
  {
    q: "Do I need an appointment?",
    a: "No. Start a request online and we'll confirm a time that suits you — or visit during opening hours and we'll take it from there.",
  },
];

function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mt-12">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className="border-t border-ink/12 last:border-b" data-reveal data-reveal-delay={`${i * 0.04}`}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${i}`}
              className="group flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left"
            >
              <span
                className={cn(
                  "text-[17px] font-semibold tracking-tight transition-colors duration-300 sm:text-lg",
                  isOpen ? "text-ink" : "text-ink/75 group-hover:text-ink"
                )}
              >
                {f.q}
              </span>
              <span
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                  isOpen
                    ? "rotate-45 border-ink bg-ink text-bone"
                    : "border-ink/15 text-ink/60 group-hover:border-ink/40"
                )}
              >
                <Plus className="size-4" aria-hidden />
              </span>
            </button>
            <div
              id={`faq-panel-${i}`}
              role="region"
              aria-hidden={!isOpen}
              className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="max-w-[68ch] pb-7 text-[14.5px] leading-relaxed text-ink/55">
                  {f.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function ContactPage() {
  const root = useRef<HTMLDivElement>(null);
  useReveal(root);

  useEffect(() => {
    document.title = "Contact & Bookings — AppleDock, Thane";
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
            <span className="text-fog">Contact & bookings</span>
          </p>
          <h1
            data-reveal
            data-reveal-delay="0.06"
            className="mt-6 max-w-[15ch] text-4xl leading-[1.06] font-semibold tracking-[-0.035em] text-bone sm:text-6xl lg:text-[68px]"
          >
            Talk to a technician, not a ticket queue.
          </h1>
          <p
            data-reveal
            data-reveal-delay="0.12"
            className="mt-6 max-w-[54ch] text-[15.5px] leading-relaxed text-fog"
          >
            Describe the fault in your own words — no technical knowledge
            needed. Every request is read by a technician at our {site.city}{" "}
            studio, and you'll hear back with a diagnosis plan and a clear
            quote.
          </p>
          <ul
            data-reveal
            data-reveal-delay="0.18"
            className="mt-9 flex flex-wrap gap-2"
          >
            {[`${site.city}, ${site.region}`, site.hours, "Walk-ins & bookings"].map(
              (chip) => (
                <li
                  key={chip}
                  className="rounded-full border border-white/15 px-3.5 py-1.5 font-mono text-[11px] tracking-[0.1em] text-fog uppercase"
                >
                  {chip}
                </li>
              )
            )}
          </ul>
        </div>
      </section>

      {/* Info + form */}
      <section className="bg-bone text-ink">
        <div className="wrap py-16 lg:py-20">
          <div data-reveal>
            <Contact />
          </div>
        </div>
      </section>

      {/* What happens next */}
      <section className="border-t border-ink/10 bg-bone text-ink">
        <div className="wrap py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7" data-reveal>
              <Eyebrow index="01" tone="light">
                After you reach out
              </Eyebrow>
              <h2 className="mt-5 max-w-[20ch] text-2xl font-semibold tracking-[-0.03em] sm:text-3xl lg:text-4xl">
                What happens next.
              </h2>
            </div>
          </div>
          <ol className="mt-10 grid gap-10 sm:grid-cols-3 sm:gap-8">
            {nextSteps.map((s, i) => (
              <li
                key={s.n}
                data-reveal
                data-reveal-delay={`${i * 0.08}`}
                className="border-t-2 border-ink/80 pt-6"
              >
                <span className="eyebrow tnum text-brass-2">{s.n}</span>
                <h3 className="mt-4 text-[16.5px] font-semibold tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-ink/55">
                  {s.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-ink/10 bg-bone text-ink">
        <div className="wrap py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4" data-reveal>
              <Eyebrow index="02" tone="light">
                Questions
              </Eyebrow>
              <h2 className="mt-5 max-w-[14ch] text-2xl font-semibold tracking-[-0.03em] sm:text-3xl lg:text-4xl">
                Before you ask.
              </h2>
              <p className="mt-4 max-w-[40ch] text-[14px] leading-relaxed text-ink/55">
                Straight answers to the questions every repair customer
                deserves to ask.
              </p>
            </div>
            <div className="lg:col-span-8">
              <Faq />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
