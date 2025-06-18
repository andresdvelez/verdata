import { SchematicClient } from "@schematichq/schematic-typescript-node";
import { FeatureFlag } from "../common/features/flags";

if (!process.env.SCHEMATIC_API_KEY) {
  throw new Error("SCHEMATIC_API_KEY is not set");
}

export const client = new SchematicClient({
  apiKey: process.env.SCHEMATIC_API_KEY,
  cacheProviders: {
    flagChecks: [],
  },
});

export const isFullReportAvailable = async (
  userId: string
): Promise<boolean> => {
  const featuresUsageResult = await client.entitlements.listFeatureUsage({
    companyKeys: { id: userId },
  });

  const requiredFeatures = [
    FeatureFlag.INTERNATIONAL_LISTS_SEARCH,
    FeatureFlag.NATIONAL_LISTS_SEARCH,
  ];

  const usageAccess = requiredFeatures.every((requiredFeature) => {
    const usageDetail = featuresUsageResult.data.find((item) => {
      return item.feature && item.feature.flags[0].key === requiredFeature;
    });
    return usageDetail !== undefined && usageDetail.access === true;
  });

  return usageAccess;
};
