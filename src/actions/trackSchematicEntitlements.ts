"use server";

import {
  FeatureFlag,
  featureFlagEvents,
} from "@/modules/app/common/features/flags";
import { client } from "@/modules/app/lib/schematic";

export const trackEntitlement = async (
  featureFlag: FeatureFlag,
  userId: string
) => {
  await client.track({
    event: featureFlagEvents[featureFlag].event,
    company: {
      id: userId,
    },
    user: {
      id: userId,
    },
  });
};
