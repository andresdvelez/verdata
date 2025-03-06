"use client";

import { HeroUIProvider } from "@heroui/react";
import { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { SchematicProvider } from "@schematichq/schematic-react";
import { SchematicWrapped } from "./SchematicWrapped";
import { UserProvider } from "./UserProvider";

export const ClientWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <HeroUIProvider>
      <ClerkProvider
        afterSignOutUrl={"/auth/sign-in"}
        waitlistUrl="/auth/whitelist"
      >
        <SchematicProvider
          publishableKey={process.env.NEXT_PUBLIC_SCHEMATIC_PUBLISHABLE_KEY!}
        >
          <SchematicWrapped>
            <UserProvider>{children}</UserProvider>
          </SchematicWrapped>
        </SchematicProvider>
      </ClerkProvider>
    </HeroUIProvider>
  );
};
