import { NextResponse } from "next/server";
import { searchReportService } from "@/modules/app/services/searchReportService";
import { trackEntitlement } from "@/actions/trackSchematicEntitlements";
import { FeatureFlag } from "@/modules/app/common/features/flags";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      console.error("❌ Failed to parse request body:", parseError);
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    const tokenHeader = request.headers.get("authorization") || "";
    const token = tokenHeader.replace(/^Bearer\s+/i, "");

    const { userId, searchType, nationality, searchInput } = body;

    // Validate required fields
    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }
    if (!searchType) {
      return NextResponse.json(
        { error: "Missing searchType" },
        { status: 400 }
      );
    }
    if (!nationality) {
      return NextResponse.json(
        { error: "Missing nationality" },
        { status: 400 }
      );
    }
    if (!searchInput) {
      return NextResponse.json(
        { error: "Missing searchInput" },
        { status: 400 }
      );
    }
    if (!token) {
      return NextResponse.json(
        { error: "Missing authorization token" },
        { status: 401 }
      );
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
    console.error("❌ Error in /api/search-report:", {
      message: err.message,
      name: err.name,
      stack: err.stack,
    });

    // If it's an AxiosError, log the response payload too
    if (err.response) {
      console.error("➡️ Downstream response:", {
        status: err.response.status,
        statusText: err.response.statusText,
        data: err.response.data,
        headers: err.response.headers,
      });
    }

    // Handle different types of errors
    if (err.code === "ETIMEDOUT" || err.code === "ECONNABORTED") {
      return NextResponse.json(
        { error: "Request timeout - please try again" },
        { status: 408 }
      );
    }

    if (err.response?.status === 401) {
      return NextResponse.json(
        { error: "Unauthorized - invalid token" },
        { status: 401 }
      );
    }

    if (err.response?.status === 400) {
      return NextResponse.json(
        { error: err.response.data || "Bad request to backend service" },
        { status: 400 }
      );
    }

    const msg = err.response?.data?.message || err.message || "Unknown error";
    const status = err.response?.status || 500;

    return NextResponse.json({ error: msg }, { status });
  }
}
