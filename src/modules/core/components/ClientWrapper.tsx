"use client";

import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { SchematicProvider } from "@schematichq/schematic-react";
import { SchematicWrapped } from "./SchematicWrapped";
import { UserProvider } from "./UserProvider";
import { esES } from "@clerk/localizations";
import { enUS } from "@clerk/localizations";
import { useLocale } from "next-intl";

export const ClientWrapper = ({ children }: { children: ReactNode }) => {
  const locale = useLocale();

  return (
    <HeroUIProvider>
      <ToastProvider />
      <ClerkProvider
        localization={locale === "en" ? enUS : esES}
        afterSignOutUrl={"/auth/sign-in"}
        signInFallbackRedirectUrl={"/app"}
        waitlistUrl="/auth/waitlist"
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
