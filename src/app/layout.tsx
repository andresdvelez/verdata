import type { Metadata } from "next";
import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { bricolageGrotesque } from "@/config/fonts.config";
import "../styles/globals.css";
import { Hotjar } from "@/modules/app/layout/components/Hotjar";

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

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${bricolageGrotesque.variable} font-bricolage antialiased bg-background`}
      >
        <NextIntlClientProvider
          messages={messages.default as AbstractIntlMessages}
        >
          {children}
          <Hotjar />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
