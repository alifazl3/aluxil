import type { HomeContent } from "@/core/domain/home";
import type { HomeOverviewProvider } from "@/core/ports/home-overview-provider";

const deContent: HomeContent = {
  metrics: [
    {
      label: "Persoenliche Beratung",
      value: "Praezise",
      delta: "Aufmass vor Ort",
      tone: "positive",
    },
    {
      label: "Lieferung",
      value: "Kostenlos",
      delta: "Innerhalb Deutschlands",
      tone: "neutral",
    },
    {
      label: "Garantie",
      value: "10 Jahre",
      delta: "Aluminiumkonstruktion",
      tone: "attention",
    },
    {
      label: "Schneelast",
      value: "150 kg/m2",
      delta: "Nach DIN EN 1991",
      tone: "positive",
    },
  ],
  projects: [
    {
      id: "prj-101",
      name: "Privates Terrassendach",
      location: "Duesseldorf",
      status: "fabrication",
      progress: 72,
      dueDate: "2026-05-18",
    },
    {
      id: "prj-102",
      name: "Gartenueberdachung",
      location: "Koeln",
      status: "installation",
      progress: 88,
      dueDate: "2026-04-29",
    },
    {
      id: "prj-103",
      name: "Hotel-Aussenbereich",
      location: "Essen",
      status: "concept",
      progress: 34,
      dueDate: "2026-06-08",
    },
  ],
  products: [
    {
      id: "aw110-340",
      name: "AW110 Terrassendach Wandmontage",
      category: "AW110",
      finish: "340 x 340 cm / 2 Pfosten",
      performance: "EUR 3,490",
    },
    {
      id: "aw110-500",
      name: "AW110 Terrassendach Wandmontage",
      category: "AW110",
      finish: "340 x 500 cm / 3 Pfosten",
      performance: "EUR 4,290",
    },
    {
      id: "aw110-600",
      name: "AW110 Terrassendach Wandmontage",
      category: "AW110",
      finish: "340 x 600 cm / 3 Pfosten",
      performance: "EUR 4,890",
    },
    {
      id: "afw135-394",
      name: "AFW135 Terrassendach Freistehend",
      category: "AFW135",
      finish: "400 x 394 cm / 2 Pfosten",
      performance: "EUR 4,290",
    },
    {
      id: "afw135-500",
      name: "AFW135 Terrassendach Freistehend",
      category: "AFW135",
      finish: "400 x 500 cm / 3 Pfosten",
      performance: "EUR 5,190",
    },
    {
      id: "afw135-600",
      name: "AFW135 Terrassendach Freistehend",
      category: "AFW135",
      finish: "400 x 600 cm / 3 Pfosten",
      performance: "EUR 5,890",
    },
  ],
  requests: [
    {
      id: "req-784",
      client: "Beratung fuer Eigenheim",
      request: "AW110 Wandmontage, Aufmass und Entwaesserung pruefen",
      priority: "high",
      eta: "Heute",
    },
    {
      id: "req-785",
      client: "Planungsbuero",
      request: "Abmessungen und Systemdaten fuer die Planung bereitstellen",
      priority: "medium",
      eta: "Morgen",
    },
    {
      id: "req-786",
      client: "Hotelterrasse",
      request: "Montagefenster fuer freistehendes System abstimmen",
      priority: "low",
      eta: "24. Apr",
    },
  ],
  benefits: [
    {
      id: "consulting",
      title: "Persoenliche Beratung",
      description:
        "Wir beraten Sie persoenlich und nehmen ein praezises Aufmass, damit das Modell zu Ihren Raeumen und Anspruechen passt.",
    },
    {
      id: "installation",
      title: "Montage-Service",
      description:
        "Professioneller Aufbau von der ersten Schraube bis zur Feinabstimmung durch das ALUXIL Team.",
    },
    {
      id: "delivery",
      title: "Kostenlose Lieferung",
      description:
        "Versandkostenfreie Lieferung per Spedition innerhalb Deutschlands direkt zu Ihnen nach Hause.",
    },
    {
      id: "warranty",
      title: "10 Jahre Garantie",
      description:
        "Statisch geprueft nach DIN EN 1991, mit Schneelast bis 150 kg/m2.",
    },
  ],
  audiences: [
    { id: "homeowners", title: "Private Eigenheimbesitzer" },
    { id: "residential", title: "Besitzer von Mehrfamilienhaeusern" },
    { id: "business", title: "Nachhaltige Unternehmen" },
    { id: "hospitality", title: "Hotels und Gastronomie" },
    { id: "care", title: "Senioren- und Pflegeheime" },
    { id: "architects", title: "Planungsbueros und Architekten" },
  ],
  testimonials: [
    {
      id: "thomas",
      quote:
        "Von der Beratung bis zur Lieferung war alles erstklassig. Das Terrassendach steht perfekt und die Qualitaet des Aluminiums ist hervorragend.",
      author: "Thomas K.",
      location: "Duesseldorf",
      initials: "T",
    },
    {
      id: "sandra",
      quote:
        "Wir haben lange nach einem hochwertigen Terrassendach gesucht. ALUXIL hat unsere Erwartungen uebertroffen.",
      author: "Sandra M.",
      location: "Koeln",
      initials: "S",
    },
    {
      id: "markus",
      quote:
        "Top Preis-Leistungs-Verhaeltnis. Das AFW135-System ist extrem stabil und sieht dabei elegant aus.",
      author: "Markus W.",
      location: "Essen",
      initials: "M",
    },
  ],
  contact: {
    phone: "+49 (211) 7306 7256",
    email: "info@aluxil.com",
    hours: "Mo-Fr: 9:00-17:00 Uhr",
    responseTime: "Antwort innerhalb 24h",
    address: ["ALUXIL GmbH", "Koenigsallee 27", "40212 Duesseldorf", "Deutschland"],
    privacyNote: "Unverbindlich und kostenlos. Ihre Daten sind bei uns sicher.",
  },
};

const enContent: HomeContent = {
  metrics: [
    {
      label: "Personal consultation",
      value: "Precise",
      delta: "On-site measurement",
      tone: "positive",
    },
    {
      label: "Delivery",
      value: "Free",
      delta: "Within Germany",
      tone: "neutral",
    },
    {
      label: "Warranty",
      value: "10 years",
      delta: "Aluminium structure",
      tone: "attention",
    },
    {
      label: "Snow load",
      value: "150 kg/m2",
      delta: "DIN EN 1991 checked",
      tone: "positive",
    },
  ],
  projects: [
    {
      id: "prj-101",
      name: "Private terrace canopy",
      location: "Dusseldorf",
      status: "fabrication",
      progress: 72,
      dueDate: "2026-05-18",
    },
    {
      id: "prj-102",
      name: "Garden roof extension",
      location: "Cologne",
      status: "installation",
      progress: 88,
      dueDate: "2026-04-29",
    },
    {
      id: "prj-103",
      name: "Hotel outdoor dining cover",
      location: "Essen",
      status: "concept",
      progress: 34,
      dueDate: "2026-06-08",
    },
  ],
  products: [
    {
      id: "aw110-340",
      name: "AW110 wall-mounted patio roof",
      category: "AW110",
      finish: "340 x 340 cm / 2 posts",
      performance: "EUR 3,490",
    },
    {
      id: "aw110-500",
      name: "AW110 wall-mounted patio roof",
      category: "AW110",
      finish: "340 x 500 cm / 3 posts",
      performance: "EUR 4,290",
    },
    {
      id: "aw110-600",
      name: "AW110 wall-mounted patio roof",
      category: "AW110",
      finish: "340 x 600 cm / 3 posts",
      performance: "EUR 4,890",
    },
    {
      id: "afw135-394",
      name: "AFW135 freestanding patio roof",
      category: "AFW135",
      finish: "400 x 394 cm / 2 posts",
      performance: "EUR 4,290",
    },
    {
      id: "afw135-500",
      name: "AFW135 freestanding patio roof",
      category: "AFW135",
      finish: "400 x 500 cm / 3 posts",
      performance: "EUR 5,190",
    },
    {
      id: "afw135-600",
      name: "AFW135 freestanding patio roof",
      category: "AFW135",
      finish: "400 x 600 cm / 3 posts",
      performance: "EUR 5,890",
    },
  ],
  requests: [
    {
      id: "req-784",
      client: "Homeowner consultation",
      request: "Check AW110 wall mounting, measurement, and drainage position",
      priority: "high",
      eta: "Today",
    },
    {
      id: "req-785",
      client: "Planning office",
      request: "Share dimensions and system data for the planning package",
      priority: "medium",
      eta: "Tomorrow",
    },
    {
      id: "req-786",
      client: "Hotel terrace",
      request: "Confirm installation window for freestanding system",
      priority: "low",
      eta: "Apr 24",
    },
  ],
  benefits: [
    {
      id: "consulting",
      title: "Personal consultation",
      description:
        "We advise you personally and take precise measurements so the model fits your space and requirements.",
    },
    {
      id: "installation",
      title: "Installation service",
      description:
        "Professional assembly from the first screw to the final adjustment, handled by the ALUXIL team.",
    },
    {
      id: "delivery",
      title: "Free delivery",
      description:
        "Freight delivery within Germany is included, shipped directly to your home.",
    },
    {
      id: "warranty",
      title: "10-year warranty",
      description:
        "Static calculation according to DIN EN 1991, with snow load capacity up to 150 kg/m2.",
    },
  ],
  audiences: [
    { id: "homeowners", title: "Private homeowners" },
    { id: "residential", title: "Multi-family property owners" },
    { id: "business", title: "Sustainable companies" },
    { id: "hospitality", title: "Hotels and restaurants" },
    { id: "care", title: "Senior and care facilities" },
    { id: "architects", title: "Planning offices and architects" },
  ],
  testimonials: [
    {
      id: "thomas",
      quote:
        "From consultation to delivery, everything was first class. The patio roof stands perfectly and the aluminium quality is excellent.",
      author: "Thomas K.",
      location: "Dusseldorf",
      initials: "T",
    },
    {
      id: "sandra",
      quote:
        "We looked for a high-quality patio roof for a long time. ALUXIL exceeded our expectations.",
      author: "Sandra M.",
      location: "Cologne",
      initials: "S",
    },
    {
      id: "markus",
      quote:
        "A strong price-performance ratio. The AFW135 system is extremely stable and still looks elegant.",
      author: "Markus W.",
      location: "Essen",
      initials: "M",
    },
  ],
  contact: {
    phone: "+49 (211) 7306 7256",
    email: "info@aluxil.com",
    hours: "Mon-Fri: 9:00-17:00",
    responseTime: "Response within 24h",
    address: ["ALUXIL GmbH", "Konigsallee 27", "40212 Dusseldorf", "Germany"],
    privacyNote: "Non-binding and free. Your data is safe with us.",
  },
};

const overview = {
  defaultLocale: "de",
  locales: {
    de: deContent,
    en: enContent,
  },
} satisfies Awaited<ReturnType<HomeOverviewProvider["getOverview"]>>;

export const mockHomeOverviewProvider: HomeOverviewProvider = {
  async getOverview() {
    return overview;
  },
};
