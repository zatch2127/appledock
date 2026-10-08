/**
 * Central business configuration for AppleDock.
 * One file to rule the whole site — update these values and every
 * phone link, WhatsApp deep link, chip, fact sheet and stat follows.
 */
export const site = {
  name: "AppleDock",
  legalName: "AppleDock",
  tagline: "Professional Apple Device Repair & Service",
  city: "Thane",
  region: "Maharashtra",
  country: "India",

  phone: "+91 98765 43210",
  whatsapp: "+91 98765 43210",
  email: "hello@appledock.in",
  hours: "Mon – Sat · 10:00 AM – 8:00 PM",
  address: "Thane, Maharashtra, India",
  established: 2020,

  /**
   * When true, call/WhatsApp buttons across the site dial and deep-link
   * directly. When false, they route visitors to the contact page.
   */
  contactConfigured: true,

  // City-level map embed.
  mapsQuery: "Thane, Maharashtra, India",

  /** Published business metrics — rendered by the animated counters. */
  stats: {
    devicesServiced: 2500 as number | null,
    satisfaction: 98 as number | null,
    yearsExperience: 6 as number | null,
    categories: 6 as number | null,
  },
} as const;

export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  site.mapsQuery
)}&output=embed`;

/** tel: href built from the configured number. */
export const telHref = `tel:${site.phone.replace(/\s/g, "")}`;

/** wa.me href built from the configured WhatsApp number. */
export const waHref = `https://wa.me/${site.whatsapp.replace(/\D/g, "")}`;
