"use client";

import { Plans } from "@/modules/app/home/Plans";
import { STATIC_PLANS } from "@/modules/core/data/static-pricing";
import { useTranslations } from "next-intl";

export const StaticPricing = () => {
  const t = useTranslations("home.pricing");

  return (
    <div className="w-full h-full flex flex-col gap-8">
      <h3 className="text-4xl lg:text-5xl font-semibold">{t("our-plans")}</h3>
      <Plans plans={STATIC_PLANS(t)} />
    </div>
  );
};
