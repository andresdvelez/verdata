"use server";

import { trackEntitlement } from "@/actions/trackSchematicEntitlements";
import { FeatureFlag } from "@/modules/app/common/features/flags";
import { searchReportService } from "@/modules/app/services/searchReportService";
import { handleSearchReportType } from "@/modules/store/search-report-store";

export async function performSearchReport({
  userId,
  searchType,
  nationality,
  searchInput,
  token,
}: handleSearchReportType & { token: string }) {
  const report = await searchReportService({
    searchType,
    nationality,
    searchInput,
    token,
  });
  await trackEntitlement(FeatureFlag.MONTHLY_REQUESTS, userId);
  return report;
}
