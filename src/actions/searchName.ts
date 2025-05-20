"use server";

import { trackEntitlement } from "@/actions/trackSchematicEntitlements";
import { FeatureFlag } from "@/modules/app/common/features/flags";
import { listNames } from "@/modules/app/services/listNames";
import { parseCountry } from "@/modules/app/utils/parseCountry";
import { handleSearchNameType } from "@/modules/store/search-report-store";

export async function performSearchName({
  userId,
  countryCode,
  searchName,
  token,
}: handleSearchNameType & { token: string }) {
  const usersByName = await listNames({
    countryCode: parseCountry(countryCode),
    identityName: searchName,
    token: token,
  });
  await trackEntitlement(FeatureFlag.MONTHLY_REQUESTS, userId);
  return usersByName;
}
