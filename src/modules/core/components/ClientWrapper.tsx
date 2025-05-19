"use client";

import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { ClerkProvider } from "@clerk/nextjs";
import { SchematicProvider } from "@schematichq/schematic-react";
import { SchematicWrapped } from "./SchematicWrapped";
import { UserProvider } from "./UserProvider";
import { useLocale } from "next-intl";
import { enUS, esES } from "@clerk/localizations";
import { UserType } from "@/types/app/users";

interface ClientWrapperProps {
  children: React.ReactNode;
  serverUser: UserType | null;
  serverToken: string;
}

export const ClientWrapper = ({
  children,
  serverUser,
  serverToken,
}: ClientWrapperProps) => {
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
          <UserProvider serverUser={serverUser} serverToken={serverToken}>
            <SchematicWrapped>{children}</SchematicWrapped>
          </UserProvider>
        </SchematicProvider>
      </ClerkProvider>
    </HeroUIProvider>
  );
};
