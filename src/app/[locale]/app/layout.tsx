import { Header } from "@/modules/app/layout/components/Header";
import { Sidebar } from "@/modules/app/layout/components/Sidebar";
import SentryFeedbackWidget from "@/modules/common/components/SentryFeedbackWidget";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verdata | App",
  description: "Verdata website",
};

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-screen w-screen flex">
      <Sidebar />
      <section className="w-full">
        <Header />
        <main className="bg-white overflow-auto w-full h-[calc(100vh-102px)] p-8">
          {children}
          <SentryFeedbackWidget />
        </main>
      </section>
    </main>
  );
}
