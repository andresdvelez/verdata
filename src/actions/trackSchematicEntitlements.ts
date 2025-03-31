"use server";

import {
  FeatureFlag,
  featureFlagEvents,
} from "@/modules/app/common/features/flags";
import { client } from "@/modules/app/lib/schematic";
import { User } from "@prisma/client";

export const trackEntitlement = async (
  featureFlag: FeatureFlag,
  user: User
) => {
  await client.track({
    event: featureFlagEvents[featureFlag].event,
    company: {
      id: user.id,
    },
    user: {
      id: user.id,
    },
  });
};
