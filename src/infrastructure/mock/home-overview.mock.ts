import type { HomeOverviewProvider } from "@/core/ports/home-overview-provider";

const overview = {
  metrics: [
    {
      label: "Active projects",
      value: "18",
      delta: "+4 this month",
      tone: "positive",
    },
    {
      label: "Production capacity",
      value: "86%",
      delta: "balanced load",
      tone: "neutral",
    },
    {
      label: "Open requests",
      value: "7",
      delta: "2 high priority",
      tone: "attention",
    },
    {
      label: "On-time delivery",
      value: "94%",
      delta: "+8% vs last quarter",
      tone: "positive",
    },
  ],
  projects: [
    {
      id: "prj-101",
      name: "Nikan Office Tower",
      location: "Tehran",
      status: "fabrication",
      progress: 72,
      dueDate: "2026-05-18",
    },
    {
      id: "prj-102",
      name: "Caspian Residence",
      location: "Rasht",
      status: "installation",
      progress: 88,
      dueDate: "2026-04-29",
    },
    {
      id: "prj-103",
      name: "Atlas Retail Front",
      location: "Shiraz",
      status: "concept",
      progress: 34,
      dueDate: "2026-06-08",
    },
  ],
  products: [
    {
      id: "sys-70",
      name: "ALX 70 Thermal",
      category: "Window system",
      finish: "Graphite anodized",
      performance: "Uw 1.6 W/m2K",
    },
    {
      id: "cur-55",
      name: "ALX Curtain 55",
      category: "Facade system",
      finish: "Natural matte",
      performance: "Air class AE",
    },
    {
      id: "sl-42",
      name: "ALX Slide 42",
      category: "Sliding door",
      finish: "Bronze brushed",
      performance: "Water class 7A",
    },
  ],
  requests: [
    {
      id: "req-784",
      client: "Aria Build",
      request: "Revise facade mullion spacing",
      priority: "high",
      eta: "Today",
    },
    {
      id: "req-785",
      client: "Mehr Studio",
      request: "Share color swatch bundle",
      priority: "medium",
      eta: "Tomorrow",
    },
    {
      id: "req-786",
      client: "Vista Group",
      request: "Confirm installation crew window",
      priority: "low",
      eta: "Apr 24",
    },
  ],
} satisfies Awaited<ReturnType<HomeOverviewProvider["getOverview"]>>;

export const mockHomeOverviewProvider: HomeOverviewProvider = {
  async getOverview() {
    return overview;
  },
};
