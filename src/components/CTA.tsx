import { useRef } from "react";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { useReveal } from "../lib/reveal";
import { site, telHref, waHref } from "../data/site";

export function CTA() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  // Direct dial/chat once contact details are live; otherwise the form.
  const callHref = site.contactConfigured ? telHref : "#/contact";
  const chatHref = site.contactConfigured ? waHref : "#/contact";

  return (
    <section ref={root} className="relative overflow-hidden bg-ink">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(245,245,243,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(245,245,243,0.03) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 90% at 50% 50%, black 20%, transparent 75%)",
          maskImage:
            "radial-gradient(ellipse 70% 90% at 50% 50%, black 20%, transparent 75%)",
        }}
      />
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brass/[0.06] blur-[110px]"
      />

      <div className="wrap relative border-y border-white/10 py-24 text-center lg:py-32">
        <p data-reveal className="eyebrow flex items-center justify-center gap-3">
          <span aria-hidden className="size-1.5 rounded-full bg-brass" />
          <span className="text-fog">Next step</span>
        </p>

        <h2
          data-reveal
          data-reveal-delay="0.08"
          className="mx-auto mt-6 max-w-[16ch] text-4xl font-semibold tracking-[-0.035em] text-bone sm:text-5xl lg:text-6xl"
        >
          Something wrong with your Apple device?
        </h2>

        <p
          data-reveal
          data-reveal-delay="0.16"
          className="mx-auto mt-6 max-w-[46ch] text-[15.5px] leading-relaxed text-fog"
        >
          Tell us what's happening. Our team will help you understand the next
          step — clearly, and without obligation.
        </p>

        <div
          data-reveal
          data-reveal-delay="0.24"
          className="mt-10 flex flex-wrap items-center justify-center gap-3.5"
        >
          <a href="#/contact" className="btn btn-light btn-lg group">
            Book a Repair
            <ArrowRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden
            />
          </a>
          <a href={callHref} className="btn btn-ghost-light btn-lg">
            <Phone className="size-4" aria-hidden />
            Call AppleDock
          </a>
          <a
            href={chatHref}
            {...(site.contactConfigured
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="btn btn-ghost-light btn-lg"
          >
            <MessageCircle className="size-4" aria-hidden />
            WhatsApp Us
          </a>
        </div>

        {!site.contactConfigured ? (
          <p
            data-reveal="fade"
            data-reveal-delay="0.3"
            className="mt-8 font-mono text-[11px] tracking-[0.1em] text-fog/60 uppercase"
          >
            Direct lines publishing soon — request a callback via the form below
          </p>
        ) : null}
      </div>
    </section>
  );
}
