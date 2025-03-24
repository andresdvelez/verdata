import { MobileMenu } from "@/modules/app/layout/components/burger-menu/BurgerMenu";
import { Header } from "@/modules/app/layout/components/Header";
import { Sidebar } from "@/modules/app/layout/components/Sidebar";
import SentryFeedbackWidget from "@/modules/common/components/SentryFeedbackWidget";
import { FrigadeWrapped } from "@/modules/core/components/FrigadeWrapped";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verdata | App",
  description: "Verdata website",
};

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FrigadeWrapped>
      <main className="h-screen w-screen flex">
        <div className="hidden lg:flex">
          <Sidebar />
        </div>
        <MobileMenu />
        <section className="w-full overflow-hidden">
          <Header />
          <aside className="bg-white overflow-auto w-full max-h-[calc(100vh-102px)] overflow-y-auto p-8">
            {children}
            <SentryFeedbackWidget />
          </aside>
        </section>
      </main>
    </FrigadeWrapped>
  );
}
