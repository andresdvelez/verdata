"use client";

import { useUser } from "@clerk/nextjs";
import { useSchematicEvents } from "@schematichq/schematic-react";
import { ReactNode, useEffect } from "react";

export const SchematicWrapped = ({ children }: { children: ReactNode }) => {
  const { identify } = useSchematicEvents();
  const { user } = useUser();

  useEffect(() => {
    const userName =
      user?.username ?? user?.fullName ?? user?.emailAddresses[0] ?? user?.id;

    if (user?.id) {
      identify({
        company: {
          keys: {
            id: user.id,
          },
          name: userName as string,
        },
        keys: {
          id: user.id,
        },
        name: userName as string,
      });
    }
  }, [user, identify]);

  return <>{children}</>;
};
