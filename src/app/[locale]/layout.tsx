// app/[locale]/layout.tsx
import { auth, currentUser } from "@clerk/nextjs/server";
import { ClientWrapper } from "@/modules/core/components/ClientWrapper";
import { generateUniqueReferralCode } from "@/modules/core/lib/generateUniqueReferralCode";
import { generateToken } from "@/modules/core/utils/generateJwtToken";
import { client } from "@/modules/app/lib/schematic";
import { FeatureFlag } from "@/modules/app/common/features/flags";
import prisma from "@/modules/prisma/lib/prisma";
import { redirect, routing } from "@/modules/translations/i18n/routing";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import { CheckFlagResponse } from "@schematichq/schematic-typescript-node/api";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale;
  const supportedLocales = ["en", "es"];
  if (!routing.locales.includes(locale as "en" | "es")) {
    redirect({ href: `/${locale}/app`, locale });
  }
  if (!supportedLocales.includes(locale)) {
    notFound();
  }

  const { userId: clerkId } = await auth();
  const clerkUser = await currentUser();

  let serverUser = null;
  let serverToken = "";

  console.log(clerkUser, clerkId);

  if (clerkId && clerkUser) {
    const email = clerkUser.emailAddresses[0].emailAddress;

    // First, check if a user with this email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
      include: { searched_reports: true },
    });

    if (existingUser) {
      // If user exists with this email, update their clerk_id if needed
      serverUser = await prisma.user.update({
        where: { email },
        data: {
          clerk_id: clerkId,
          firstName: clerkUser.firstName || existingUser.firstName,
          lastName: clerkUser.lastName || existingUser.lastName,
          imageUrl: clerkUser.imageUrl || existingUser.imageUrl,
        },
        include: {
          searched_reports: true,
        },
      });
    } else {
      // If no user with this email exists, create a new one
      serverUser = await prisma.user.create({
        data: {
          clerk_id: clerkId,
          email,
          firstName: clerkUser.firstName,
          lastName: clerkUser.lastName,
          imageUrl: clerkUser.imageUrl,
          referral_code: generateUniqueReferralCode(),
        },
        include: {
          searched_reports: true,
        },
      });
    }

    await client.identify({
      company: {
        keys: { id: clerkId },
        name: `${clerkUser.firstName} ${clerkUser.lastName}`,
      },
      keys: { id: clerkId },
      name: `${clerkUser.firstName} ${clerkUser.lastName}`,
    });

    const monthly_requests: CheckFlagResponse = await client.features.checkFlag(
      FeatureFlag.MONTHLY_REQUESTS,
      { company: { id: clerkId } }
    );
    const national_lists_search: CheckFlagResponse =
      await client.features.checkFlag(FeatureFlag.NATIONAL_LISTS_SEARCH, {
        company: { id: clerkId },
      });
    const international_lists_search: CheckFlagResponse =
      await client.features.checkFlag(FeatureFlag.INTERNATIONAL_LISTS_SEARCH, {
        company: { id: clerkId },
      });

    serverToken = await generateToken({
      id: serverUser.id,
      monthly_requests,
      national_lists_search,
      international_lists_search,
    });
  }

  return (
    <ClientWrapper serverUser={serverUser} serverToken={serverToken}>
      {children}
    </ClientWrapper>
  );
}
