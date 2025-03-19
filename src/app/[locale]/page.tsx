import { Benefits } from "@/modules/app/home/Benefits";
import { DescriptionText } from "@/modules/app/home/DescriptionText";
import { HowItWorks } from "@/modules/app/home/HowItWorks";
import { StaticPricing } from "@/modules/app/home/Pricing";
import { Header } from "@/modules/app/layout/components/Header";
import { Sidebar } from "@/modules/app/layout/components/Sidebar";

export default function Home() {
  return (
    <main className="h-screen w-screen overflow-hidden flex">
      <Sidebar />
      <section className="w-full h-full">
        <Header />
        <aside className="py-12 px-8 w-full h-[calc(100vh-89px)] flex gap-8 bg-white overflow-auto">
          <div className="w-full h-full flex-1 flex flex-col gap-6">
            <DescriptionText />
            <StaticPricing />
          </div>
          <div className="h-full w-[450px] flex flex-col gap-5">
            <Benefits />
            <HowItWorks />
          </div>
        </aside>
      </section>
    </main>
  );
}
