import { NextResponse } from "next/server";
import { listNames } from "@/modules/app/services/listNames";
import { parseCountry } from "@/modules/app/utils/parseCountry";
import { trackEntitlement } from "@/actions/trackSchematicEntitlements";
import { FeatureFlag } from "@/modules/app/common/features/flags";

export const runtime = "edge";
export const revalidate = 0;
export const maxDuration = 60;

export async function POST(request: Request) {
  const { userId, countryCode, searchName } = await request.json();
  const token =
    request.headers.get("authorization")?.replace("Bearer ", "") || "";

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  const usersByName = await listNames({
    countryCode: parseCountry(countryCode),
    identityName: searchName,
    token,
  });

  await trackEntitlement(FeatureFlag.MONTHLY_REQUESTS, userId);

  return NextResponse.json(usersByName);
}
