export type ProjectStatus = "concept" | "fabrication" | "installation";

export type DashboardMetric = {
  label: string;
  value: string;
  delta: string;
  tone: "positive" | "neutral" | "attention";
};

export type ProjectSummary = {
  id: string;
  name: string;
  location: string;
  status: ProjectStatus;
  progress: number;
  dueDate: string;
};

export type ProductLine = {
  id: string;
  name: string;
  category: string;
  finish: string;
  performance: string;
};

export type ServiceRequest = {
  id: string;
  client: string;
  request: string;
  priority: "low" | "medium" | "high";
  eta: string;
};

export type SiteBenefit = {
  id: string;
  title: string;
  description: string;
};

export type AudienceSegment = {
  id: string;
  title: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  location: string;
  initials: string;
};

export type ContactProfile = {
  phone: string;
  email: string;
  hours: string;
  responseTime: string;
  address: string[];
  privacyNote: string;
};

export type HomeOverview = {
  metrics: DashboardMetric[];
  projects: ProjectSummary[];
  products: ProductLine[];
  requests: ServiceRequest[];
  benefits: SiteBenefit[];
  audiences: AudienceSegment[];
  testimonials: Testimonial[];
  contact: ContactProfile;
};
