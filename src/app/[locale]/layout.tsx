import type { Metadata } from "next";
import { redirect, routing } from "@/modules/translations/i18n/routing";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "../../styles/globals.css";
import { geistMono, geistSans } from "@/config/fonts.config";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Verdata | Home",
  description: "Verdata website",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "en" | "es")) {
    redirect({ locale, href: "/app" });
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClerkProvider>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
