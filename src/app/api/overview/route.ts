import { NextResponse } from "next/server";
import { getHomeOverview } from "@/application/home/get-home-overview";

export async function GET() {
  const overview = await getHomeOverview();

  return NextResponse.json(overview);
}
