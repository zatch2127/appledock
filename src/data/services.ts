import iphone from "../assets/svc-iphone.jpg";
import macbook from "../assets/svc-macbook.jpg";
import ipad from "../assets/svc-ipad.jpg";
import imac from "../assets/svc-imac.jpg";
import watch from "../assets/svc-watch.jpg";
import airpods from "../assets/svc-airpods.jpg";

export type Repair = {
  /** Short repair name — used in cards and the detail list. */
  name: string;
  /** One plain-language line about the faults this covers. */
  detail: string;
};

export type Service = {
  id: string;
  /** Device name on its own — "iPhone". */
  noun: string;
  /** Display name — "iPhone Repair". */
  name: string;
  /** Short card blurb. */
  blurb: string;
  /** Two-sentence introduction for the detail page. */
  intro: string;
  /** Product families covered. */
  models: string[];
  /** The repair menu for this device. */
  repairs: Repair[];
  image: string;
  alt: string;
};

export const services: Service[] = [
  {
    id: "iphone",
    noun: "iPhone",
    name: "iPhone Repair",
    blurb:
      "Screens, batteries, cameras, charging faults and board-level issues — for every iPhone generation.",
    intro:
      "Our most common — and most practised — repairs. Screens and batteries are routine bench work; no-power and liquid-damage cases get careful board-level diagnosis before any conclusion.",
    models: [
      "Latest Pro & Pro Max models",
      "iPhone 12 – 15 series",
      "iPhone X, XR & 11 series",
      "iPhone 8, 7 & 6s",
      "iPhone SE (all generations)",
    ],
    repairs: [
      {
        name: "Screen replacement",
        detail: "Cracked glass, dead pixels, touch faults and display lines.",
      },
      {
        name: "Battery service",
        detail: "Rapid drain, unexpected shutdowns and swollen batteries.",
      },
      {
        name: "Charging & ports",
        detail: "Loose or worn Lightning / USB-C ports and slow-charging faults.",
      },
      {
        name: "Cameras & lenses",
        detail: "Blurry photos, cracked lens glass and focus problems.",
      },
      {
        name: "Speakers & microphones",
        detail: "Ear speaker, loudspeaker and call-audio faults.",
      },
      {
        name: "Board-level & liquid damage",
        detail: "No-power, backlight and corrosion diagnosis on the bench.",
      },
    ],
    image: iphone,
    alt: "Rear view of a black iPhone Pro on a dark studio surface",
  },
  {
    id: "macbook",
    noun: "MacBook",
    name: "MacBook Repair",
    blurb:
      "From battery and keyboard service to logic-board diagnosis, for MacBook Air and MacBook Pro.",
    intro:
      "Work machines can't wait. We handle everything from worn batteries and sticky keyboards to logic-board faults — on Apple silicon and Intel MacBooks alike — with data handled carefully throughout.",
    models: [
      "MacBook Pro 13 / 14 / 16-inch",
      "MacBook Air 13 / 15-inch",
      "Apple silicon (M1 and later)",
      "Intel MacBook models",
    ],
    repairs: [
      {
        name: "Battery & keyboard",
        detail: "Worn or swollen batteries, dead keys and sticky butterfly keyboards.",
      },
      {
        name: "Display service",
        detail: "Cracked panels, backlight faults and flex-cable display issues.",
      },
      {
        name: "Logic-board diagnosis",
        detail: "No-power, no-display and liquid-damage assessment.",
      },
      {
        name: "Storage & data",
        detail: "SSD issues, data migration and recovery assistance.",
      },
      {
        name: "Thermal service",
        detail: "Fan faults, overheating, deep cleaning and thermal renewal.",
      },
      {
        name: "macOS support",
        detail: "Clean installs, update failures, activation and tune-ups.",
      },
    ],
    image: macbook,
    alt: "Space grey MacBook half open on a dark studio surface",
  },
  {
    id: "ipad",
    noun: "iPad",
    name: "iPad Repair",
    blurb:
      "Glass, touch and battery service for iPad, iPad Air, iPad mini and iPad Pro.",
    intro:
      "Big glass, small margins. iPad repairs demand patience — we separate, replace and reseal displays carefully, and diagnose charging and power faults before quoting.",
    models: [
      "iPad Pro 11 & 12.9-inch",
      "iPad Air (all generations)",
      "iPad mini",
      "iPad 7th generation and later",
    ],
    repairs: [
      {
        name: "Screen & glass",
        detail: "Cracked digitizers, unresponsive touch and damaged panels.",
      },
      {
        name: "Battery service",
        detail: "Short battery life, swelling and charging faults.",
      },
      {
        name: "Charging port",
        detail: "Worn or damaged USB-C / Lightning connectors.",
      },
      {
        name: "Buttons & switches",
        detail: "Home, power and volume controls repaired or replaced.",
      },
      {
        name: "Software & restore",
        detail: "Stuck on the Apple logo, failed updates and restore issues.",
      },
    ],
    image: ipad,
    alt: "iPad tablet lying on a dark studio surface",
  },
  {
    id: "imac",
    noun: "iMac",
    name: "iMac Repair",
    blurb:
      "Diagnostics, display service and storage upgrades for iMac and Apple desktop machines.",
    intro:
      "All-in-one machines age quietly — until they don't. We service iMacs and Mac minis for speed, reliability and display faults, including worthwhile storage and memory upgrades.",
    models: [
      "iMac 24-inch (Apple silicon)",
      "iMac 21.5 & 27-inch (Intel)",
      "Mac mini (all generations)",
    ],
    repairs: [
      {
        name: "Display service",
        detail: "Panel, backlight and glass faults diagnosed and repaired.",
      },
      {
        name: "Storage & memory",
        detail: "SSD and RAM upgrades for noticeably faster machines.",
      },
      {
        name: "Power faults",
        detail: "No-power, random shutdowns and power-supply issues.",
      },
      {
        name: "Thermal cleaning",
        detail: "Fan service and internal dust removal for quieter running.",
      },
      {
        name: "macOS & data",
        detail: "Setup, migration, backup and recovery support.",
      },
    ],
    image: imac,
    alt: "Slim aluminium iMac seen from a rear three-quarter angle",
  },
  {
    id: "watch",
    noun: "Apple Watch",
    name: "Apple Watch Repair",
    blurb:
      "Screen, battery and sensor service for Apple Watch, handled with small-part precision.",
    intro:
      "The smallest devices demand the steadiest hands. Apple Watch work is small-part precision — screens, batteries, crowns and sensors, handled under magnification.",
    models: [
      "Apple Watch Ultra models",
      "Series 4 and later",
      "Apple Watch SE",
    ],
    repairs: [
      {
        name: "Screen & glass",
        detail: "Cracked crystals and unresponsive touch.",
      },
      {
        name: "Battery service",
        detail: "Short battery life and swollen cells.",
      },
      {
        name: "Digital Crown & buttons",
        detail: "Stiff, stuck or unresponsive controls.",
      },
      {
        name: "Sensors & charging",
        detail: "Heart-rate sensor and charging-coil faults.",
      },
      {
        name: "Pairing & software",
        detail: "Setup, activation and sync issues.",
      },
    ],
    image: watch,
    alt: "Smartwatch with a dark band on a dark studio surface",
  },
  {
    id: "airpods",
    noun: "AirPods",
    name: "AirPods Repair",
    blurb:
      "Earbud and charging-case service — battery, audio and connectivity issues resolved.",
    intro:
      "Quiet cases of quiet earbuds. We diagnose which side has failed — earbud or case — then fix the actual fault: batteries, charging contacts, meshes and pairing issues.",
    models: [
      "AirPods Pro (1st & 2nd gen)",
      "AirPods (1st gen and later)",
      "AirPods Max",
      "Lightning & USB-C charging cases",
    ],
    repairs: [
      {
        name: "Earbud batteries",
        detail: "One side dying fast or not holding a charge.",
      },
      {
        name: "Charging case",
        detail: "Case not charging the earbuds — or itself.",
      },
      {
        name: "Audio faults",
        detail: "Low volume, left/right imbalance and crackling.",
      },
      {
        name: "Connectivity",
        detail: "Dropouts, pairing failures and device-switching issues.",
      },
      {
        name: "Deep cleaning & care",
        detail: "Safe removal of wax and debris from meshes and contacts.",
      },
    ],
    image: airpods,
    alt: "Wireless earbuds beside an open charging case on a dark surface",
  },
];

/** Total repair services across all device lines — computed, never hard-coded. */
export const totalRepairCount = services.reduce(
  (n, s) => n + s.repairs.length,
  0
);
