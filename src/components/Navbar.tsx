import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "../utils/cn";
import { site } from "../data/site";
import { useRoute } from "../lib/router";

const links = [
  { label: "Home", href: "#/", key: "home" },
  { label: "About", href: "#/about", key: "about" },
  { label: "Services", href: "#/services", key: "services" },
  { label: "Why AppleDock", href: "#why", key: "why" },
  { label: "Reviews", href: "#reviews", key: "reviews" },
  { label: "Contact", href: "#/contact", key: "contact" },
];

const homeSectionIds = ["home", "services", "why", "reviews"];

export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <a
      href="#home"
      onClick={onClick}
      className="flex items-center gap-2.5"
      aria-label="AppleDock — home"
    >
      <svg width="26" height="26" viewBox="0 0 32 32" aria-hidden>
        <rect
          x="1.25"
          y="1.25"
          width="29.5"
          height="29.5"
          rx="8"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.25"
          strokeWidth="1.5"
        />
        <path
          d="M9 21.5h14"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M12.5 16.5h7"
          stroke="currentColor"
          strokeOpacity="0.5"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <circle cx="16" cy="11" r="2.6" fill="#DFA33B" />
      </svg>
      <span className="text-[17px] font-semibold tracking-tight text-bone">
        {site.name}
      </span>
    </a>
  );
}

export function Navbar() {
  const route = useRoute();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [homeSection, setHomeSection] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Section scroll-spy — only meaningful on the home page.
  useEffect(() => {
    if (route.page !== "home") return;
    let observer: IntersectionObserver | null = null;
    const t = window.setTimeout(() => {
      const sections = homeSectionIds
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => Boolean(el));
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) setHomeSection(e.target.id);
          });
        },
        { rootMargin: "-38% 0px -55% 0px" }
      );
      sections.forEach((s) => observer!.observe(s));
    }, 80);
    return () => {
      window.clearTimeout(t);
      observer?.disconnect();
    };
  }, [route.page]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const active = route.page === "home" ? homeSection : route.page;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled || route.page !== "home"
            ? "border-b border-white/10 bg-ink/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <div className="wrap flex h-[68px] items-center justify-between">
          <Logo />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {links.map((l) => (
                <li key={l.key}>
                  <a
                    href={l.href}
                    aria-current={active === l.key ? "true" : undefined}
                    className={cn(
                      "relative text-[13.5px] font-medium transition-colors duration-300",
                      active === l.key ? "text-bone" : "text-fog hover:text-bone"
                    )}
                  >
                    {l.label}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute -bottom-[7px] left-1/2 size-[3px] -translate-x-1/2 rounded-full bg-brass transition-opacity duration-300",
                        active === l.key ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <a href="#/contact" className="btn btn-light btn-sm hidden sm:inline-flex">
              Book a Repair
              <ArrowRight className="size-3.5" aria-hidden />
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-label="Open menu"
              className="flex size-10 items-center justify-center rounded-full border border-white/15 text-bone transition-colors hover:border-white/40 lg:hidden"
            >
              <Menu className="size-5" aria-hidden />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={cn(
          "fixed inset-0 z-[60] flex flex-col bg-ink transition-all duration-500 lg:hidden",
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
      >
        <div className="wrap flex h-[68px] items-center justify-between">
          <Logo onClick={() => setOpen(false)} />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="flex size-10 items-center justify-center rounded-full border border-white/15 text-bone transition-colors hover:border-white/40"
          >
            <X className="size-5" aria-hidden />
          </button>
        </div>

        <nav aria-label="Mobile" className="wrap mt-6 flex-1 overflow-y-auto">
          <ul className="flex flex-col">
            {links.map((l, i) => (
              <li
                key={l.key}
                className="border-b border-white/10"
                style={{
                  transform: open ? "none" : "translateY(14px)",
                  opacity: open ? 1 : 0,
                  transition: `transform 0.5s cubic-bezier(0.22,1,0.36,1) ${
                    90 + i * 55
                  }ms, opacity 0.5s ease ${90 + i * 55}ms`,
                }}
              >
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-center justify-between py-4"
                >
                  <span className="text-[26px] font-semibold tracking-tight text-bone">
                    {l.label}
                  </span>
                  <span className="eyebrow tnum text-fog/70">0{i + 1}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="wrap pb-10">
          <a
            href="#/contact"
            onClick={() => setOpen(false)}
            className="btn btn-light btn-lg w-full"
          >
            Book a Repair
            <ArrowRight className="size-4" aria-hidden />
          </a>
          <p className="eyebrow mt-6 text-center text-fog/70">
            {site.city} · {site.region}
          </p>
        </div>
      </div>
    </>
  );
}
