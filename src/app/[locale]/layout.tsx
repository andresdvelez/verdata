import type { Metadata } from "next";
import { redirect, routing } from "@/modules/translations/i18n/routing";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { geistMono, geistSans } from "@/config/fonts.config";
import { ClientWrapper } from "@/modules/core/components/ClientWrapper";
import "../../styles/globals.css";

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background`}
      >
        <ClientWrapper>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ClientWrapper>
      </body>
    </html>
  );
}
