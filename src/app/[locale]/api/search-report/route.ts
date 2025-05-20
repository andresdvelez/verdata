import { NextResponse } from "next/server";
import { searchReportService } from "@/modules/app/services/searchReportService";
import { trackEntitlement } from "@/actions/trackSchematicEntitlements";
import { FeatureFlag } from "@/modules/app/common/features/flags";

export const runtime = "edge";
export const revalidate = 0;
export const maxDuration = 60;

export async function POST(request: Request) {
  const { userId, searchType, nationality, searchInput } = await request.json();
  const token =
    request.headers.get("authorization")?.replace("Bearer ", "") || "";

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  const report = await searchReportService({
    searchType,
    nationality,
    searchInput,
    token,
  });
  await trackEntitlement(FeatureFlag.MONTHLY_REQUESTS, userId);

  return NextResponse.json(report);
}
