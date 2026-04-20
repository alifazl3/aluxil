import type { HomeOverviewProvider } from "@/core/ports/home-overview-provider";
import { mockHomeOverviewProvider } from "@/infrastructure/mock/home-overview.mock";

export async function getHomeOverview(
  provider: HomeOverviewProvider = mockHomeOverviewProvider,
) {
  return provider.getOverview();
}
