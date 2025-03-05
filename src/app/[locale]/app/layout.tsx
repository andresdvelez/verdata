import { Header } from "@/modules/app/components/Header";
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
      <aside className="h-full w-[320px] border-r border-primary"></aside>
      <section className="w-full">
        <Header />
        {children}
      </section>
    </main>
  );
}
