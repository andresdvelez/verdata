export enum FeatureFlag {
  MONTHLY_REQUESTS = "monthly-requests",
  IDENTITY_VERIFICATION = "identity-verification",
  NATIONAL_LISTS_SEARCH = "national-lists-search",
  INTERNATIONAL_LISTS_SEARCH = "international-lists-search",
}

export const featureFlagEvents: Record<FeatureFlag, { event: string }> = {
  [FeatureFlag.MONTHLY_REQUESTS]: {
    event: "request-report",
  },
  [FeatureFlag.IDENTITY_VERIFICATION]: {
    event: "",
  },
  [FeatureFlag.NATIONAL_LISTS_SEARCH]: {
    event: "",
  },
  [FeatureFlag.INTERNATIONAL_LISTS_SEARCH]: {
    event: "",
  },
};
