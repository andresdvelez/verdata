import type { Metadata } from "next";
import { redirect, routing } from "@/modules/translations/i18n/routing";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { bricolageGrotesque } from "@/config/fonts.config";
import { ClientWrapper } from "@/modules/core/components/ClientWrapper";
import "../../styles/globals.css";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
const OPEN_GRAPH_IMAGE_URL = `${BASE_URL}/brand/thumbnail.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Verdata | Inicio",
  description: "Inicio - Verifica y valida antecedentes penales | Verdata",
  alternates: {
    canonical: "https://app.verdata.co/en",
  },
  openGraph: {
    title: "Verdata | Inicio",
    description: "Inicio - Verifica y valida antecedentes penales | Verdata",
    url: BASE_URL,
    siteName: "Verdata | Inicio",
    images: [
      {
        url: OPEN_GRAPH_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Verdata | Inicio",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Verdata | Inicio",
    description: "Inicio - Verifica y valida antecedentes penales | Verdata",
    images: [OPEN_GRAPH_IMAGE_URL],
  },
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
        className={`${bricolageGrotesque.variable} font-bricolage antialiased bg-background`}
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
