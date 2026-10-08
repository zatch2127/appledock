export type Testimonial = {
  quote: string;
  name: string;
  area: string;
  service: string;
};

/**
 * Placeholder reviews shown until verified AppleDock customer reviews
 * are supplied. Replace with genuine, sourced reviews before launch.
 */
export const featuredTestimonials: Testimonial[] = [
  {
    quote:
      "Professional service, clear communication and a smooth repair experience. They explained exactly what was wrong with my iPhone before touching anything.",
    name: "Rohan M.",
    area: "Thane West",
    service: "iPhone screen replacement",
  },
  {
    quote:
      "My MacBook wouldn't power on and I expected the worst. AppleDock diagnosed it the same day, quoted upfront, and had it back to me working perfectly.",
    name: "Sneha K.",
    area: "Ghodbunder Road",
    service: "MacBook board diagnosis",
  },
  {
    quote:
      "No upselling, no vague answers. Just a proper diagnosis, a fair price and an iPad screen that looks brand new. This is how repair service should feel.",
    name: "Aditya P.",
    area: "Majiwada",
    service: "iPad screen & glass",
  },
];

export const supportingTestimonials: Testimonial[] = [
  {
    quote:
      "Battery swapped and phone tested in front of me before I left. Transparent from start to finish.",
    name: "Priya D.",
    area: "Thane East",
    service: "iPhone battery service",
  },
  {
    quote:
      "They fixed my Apple Watch screen and walked me through the warranty terms without me even asking.",
    name: "Karan S.",
    area: "Pokhran Road",
    service: "Apple Watch screen",
  },
  {
    quote:
      "One AirPod had gone quiet. Cleaned, tested and sorted — with honest advice about the battery going forward.",
    name: "Meera J.",
    area: "Vasant Vihar, Thane",
    service: "AirPods audio service",
  },
];
