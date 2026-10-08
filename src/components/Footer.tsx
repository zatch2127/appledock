import { ArrowUp, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Logo } from "./Navbar";
import { services } from "../data/services";
import { site, telHref, waHref } from "../data/site";

const companyLinks = [
  { label: "About", href: "#/about" },
  { label: "Why AppleDock", href: "#why" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#/contact" },
];

const contactRows = [
  { icon: MapPin, value: site.address, href: "#/contact" },
  { icon: Phone, value: site.phone, href: telHref },
  { icon: MessageCircle, value: site.whatsapp, href: waHref, external: true },
  { icon: Mail, value: site.email, href: `mailto:${site.email}` },
  { icon: Clock, value: site.hours, href: "#/contact" },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-ink">
      <div className="wrap py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-5 max-w-[38ch] text-[13.5px] leading-relaxed text-fog">
              {site.tagline} in {site.city}, {site.region}. Transparent
              diagnostics, quality-checked repairs and dependable support for
              the devices you rely on.
            </p>
            <p className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-white/10 px-3.5 py-1.5">
              <span aria-hidden className="size-1.5 rounded-full bg-emerald-400" />
              <span className="font-mono text-[11px] tracking-[0.1em] text-fog uppercase">
                Accepting repair requests
              </span>
            </p>
          </div>

          {/* Services */}
          <nav aria-label="Services" className="lg:col-span-2">
            <h3 className="eyebrow text-fog/70">Services</h3>
            <ul className="mt-5 flex flex-col gap-3">
              {services.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#/services/${s.id}`}
                    className="text-[13.5px] text-fog transition-colors duration-300 hover:text-bone"
                  >
                    {s.noun}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Company" className="lg:col-span-2">
            <h3 className="eyebrow text-fog/70">Company</h3>
            <ul className="mt-5 flex flex-col gap-3">
              {companyLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-[13.5px] text-fog transition-colors duration-300 hover:text-bone"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h3 className="eyebrow text-fog/70">Contact</h3>
            <ul className="mt-5 flex flex-col gap-3.5">
              {contactRows.map((row) => (
                <li key={row.value}>
                  <a
                    href={row.href}
                    {...("external" in row && row.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group flex items-center gap-3 text-[13.5px] text-fog transition-colors duration-300 hover:text-bone"
                  >
                    <row.icon
                      className="size-4 shrink-0 text-brass"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                    {row.value}
                  </a>
                </li>
              ))}
            </ul>
            <a href="#/contact" className="btn btn-ghost-light btn-sm mt-7">
              Book a Repair
            </a>
          </div>
        </div>

        <p className="mt-16 border-t border-white/10 pt-8 text-[11.5px] leading-relaxed text-fog/60">
          {site.name} is an independent repair and service provider and is not
          affiliated with, authorised or endorsed by Apple Inc. Apple, iPhone,
          Mac, MacBook, iPad, iMac, Apple Watch and AirPods are trademarks of
          Apple Inc., registered in the U.S. and other countries.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-[12.5px] text-fog/70">
            © {year} {site.legalName}. All rights reserved.
          </p>
          <p className="font-mono text-[11px] tracking-[0.1em] text-fog/50 uppercase">
            {site.city} · {site.region} · {site.country}
          </p>
          <a
            href="#home"
            aria-label="Back to top"
            className="flex size-10 items-center justify-center rounded-full border border-white/15 text-fog transition-colors duration-300 hover:border-white/50 hover:text-bone"
          >
            <ArrowUp className="size-4" aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  );
}
