import type { HomeOverview } from "@/core/domain/home";

export interface HomeOverviewProvider {
  getOverview(): Promise<HomeOverview>;
}
