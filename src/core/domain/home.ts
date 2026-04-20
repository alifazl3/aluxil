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

export type HomeOverview = {
  metrics: DashboardMetric[];
  projects: ProjectSummary[];
  products: ProductLine[];
  requests: ServiceRequest[];
};
