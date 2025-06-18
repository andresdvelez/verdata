"use client";

import { useSchematicEvents } from "@schematichq/schematic-react";
import { ReactNode, useEffect } from "react";
import { useUserStore } from "@/modules/store/user-store";

export const SchematicWrapped = ({ children }: { children: ReactNode }) => {
  const { identify } = useSchematicEvents();
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (!user) return;

    const userName =
      [user.firstName, user.lastName].filter(Boolean).join(" ") || user.email;

    identify({
      company: { keys: { id: user.clerk_id }, name: userName },
      keys: { id: user.clerk_id },
      name: userName,
    });
  }, [user, identify]);

  return <>{children}</>;
};
