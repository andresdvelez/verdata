import { notFound } from "next/navigation";
import { redirect, routing } from "@/modules/translations/i18n/routing";
import { ClientWrapper } from "@/modules/core/components/ClientWrapper";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const supportedLocales = ["en", "es"]; // Define your supported locales
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "es")) {
    redirect({ locale, href: "/app" });
  }

  if (!supportedLocales.includes(locale)) {
    notFound();
  }

  return <ClientWrapper>{children}</ClientWrapper>;
}
