"use client";

import { HeroUIProvider } from "@heroui/react";
import { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { SchematicProvider } from "@schematichq/schematic-react";
import { SchematicWrapped } from "./SchematicWrapped";

export const ClientWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <HeroUIProvider>
      <ClerkProvider afterSignOutUrl={"/"}>
        <SchematicProvider
          publishableKey={process.env.NEXT_PUBLIC_SCHEMATIC_PUBLISHABLE_KEY!}
        >
          <SchematicWrapped>{children}</SchematicWrapped>
        </SchematicProvider>
      </ClerkProvider>
    </HeroUIProvider>
  );
};
