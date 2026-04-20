import { getHomeOverview } from "@/application/home/get-home-overview";
import { HomePage } from "@/presentation/home/home-page";

export default async function Home() {
  const overview = await getHomeOverview();

  return <HomePage overview={overview} />;
}
