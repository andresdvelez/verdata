import { Benefits } from "@/modules/app/home/Benefits";
import { DescriptionText } from "@/modules/app/home/DescriptionText";
import { HowItWorks } from "@/modules/app/home/HowItWorks";
import { StaticPricing } from "@/modules/app/home/Pricing";
import { MobileMenu } from "@/modules/app/layout/components/burger-menu/BurgerMenu";
import { Header } from "@/modules/app/layout/components/Header";
import { Sidebar } from "@/modules/app/layout/components/Sidebar";

export default function Home() {
  return (
    <main className="h-screen w-screen flex">
      <div className="hidden lg:flex">
        <Sidebar />
      </div>
      <MobileMenu />
      <section className="w-full h-full overflow-hidden">
        <Header />
        <aside className="p-4 md:p-8 w-full max-h-[calc(100vh-102px)] flex flex-col xl:flex-row gap-8 bg-white overflow-y-auto">
          <div className="xl:w-2/3 h-full flex-1 flex flex-col gap-6">
            <DescriptionText />
            <StaticPricing />
          </div>
          <div className="h-full flex flex-col md:flex-row xl:flex-col xl:w-1/3  gap-5">
            <Benefits />
            <HowItWorks />
          </div>
        </aside>
      </section>
    </main>
  );
}
