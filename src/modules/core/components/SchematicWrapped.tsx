"use client";

import { useUser } from "@clerk/nextjs";
import { useSchematicEvents } from "@schematichq/schematic-react";
import { ReactNode, useEffect } from "react";
import { useUserStore } from "@/modules/store/user-store";

export const SchematicWrapped = ({ children }: { children: ReactNode }) => {
  const { identify } = useSchematicEvents();
  const { user: clerkUser } = useUser();
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    const userName =
      clerkUser?.username ??
      clerkUser?.fullName ??
      clerkUser?.emailAddresses[0] ??
      clerkUser?.id;

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
  }, [clerkUser, identify, user]);

  return <>{children}</>;
};
