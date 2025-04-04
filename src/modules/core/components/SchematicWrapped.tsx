"use client";

import { useUser } from "@clerk/nextjs";
import { useSchematic, useSchematicEvents } from "@schematichq/schematic-react";
import { ReactNode, useEffect } from "react";
import { generateToken } from "../utils/generateJwtToken";
import { FeatureFlag } from "@/modules/app/common/features/flags";
import { useSearchReportStore } from "@/modules/store/search-report-store";
import { useUserStore } from "@/modules/store/user-store";

export const SchematicWrapped = ({ children }: { children: ReactNode }) => {
  const { identify } = useSchematicEvents();
  const { client } = useSchematic();
  const { user: clerkUser } = useUser();
  const setToken = useSearchReportStore((state) => state.setToken);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    const userName =
      clerkUser?.username ??
      clerkUser?.fullName ??
      clerkUser?.emailAddresses[0] ??
      clerkUser?.id;

    const token = generateToken({
      ...client.getFlagCheck(FeatureFlag.MONTHLY_REQUESTS),
      userId: user?.id,
    });

    token.then((token) => setToken(token));

    if (clerkUser?.id) {
      identify({
        company: {
          keys: { id: clerkUser.id },
          name: userName as string,
        },
        keys: { id: clerkUser.id },
        name: userName as string,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clerkUser, identify, client, user]);

  return <>{children}</>;
};
