import type { HomeOverviewProvider } from "@/core/ports/home-overview-provider";

const overview = {
  metrics: [
    {
      label: "Consultation",
      value: "Personal",
      delta: "Precise measurement",
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
      request: "Check wall-mounted AW110 fit and drainage position",
      priority: "high",
      eta: "Today",
    },
    {
      id: "req-785",
      client: "Architecture office",
      request: "Share canopy dimensions for planning package",
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
        "We advise you personally and take precise measurements so the model fits your spatial and aesthetic requirements.",
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
        "Freight delivery within Germany is included, shipped directly to your home or ready for local pickup.",
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
        "We looked for a high-quality patio roof for a long time. ALUXIL exceeded our expectations and the result is beautiful.",
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
    privacyNote: "Your data is safe with us. Consultation is non-binding and free.",
  },
} satisfies Awaited<ReturnType<HomeOverviewProvider["getOverview"]>>;

export const mockHomeOverviewProvider: HomeOverviewProvider = {
  async getOverview() {
    return overview;
  },
};
