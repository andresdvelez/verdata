import { NextResponse } from "next/server";
import { searchReportService } from "@/modules/app/services/searchReportService";
import { trackEntitlement } from "@/actions/trackSchematicEntitlements";
import { FeatureFlag } from "@/modules/app/common/features/flags";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const tokenHeader = request.headers.get("authorization") || "";
    const token = tokenHeader.replace(/^Bearer\s+/i, "");

    const { userId, searchType, nationality, searchInput } = body;
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("❌ Error in /api/search-report:", err);
    // If it’s an AxiosError, log the response payload too
    if (err.response) {
      console.error("➡️ Downstream response data:", err.response.data);
    }
    const msg = err.response?.data || err.message || "Unknown error";
    return NextResponse.json(
      { error: msg },
      { status: err.response?.status || 500 }
    );
  }
}
