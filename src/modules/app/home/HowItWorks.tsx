"use client";

import { useTranslations } from "next-intl";
import React from "react";

export const HowItWorks = () => {
  const t = useTranslations("home.how-it-works");

  return (
    <div className="w-full h-full flex flex-col gap-6 px-8 py-4 bg-background">
      <h3 className="text-4xl font-semibold">{t("title")}</h3>
      <ul className="flex flex-col gap-[9px] *:gap-4 list-disc *:text-lg *:font-medium">
        <li className="">{t("complete-report")}</li>
        <li className="">{t("criminal-records")}</li>
        <li className="">{t("lawsuits")}</li>
        <li className="">{t("id-verification")}</li>
        <li className="">{t("search-options")}</li>
        <li className="">{t("civil-records")}</li>
        <li className="">{t("blacklists")}</li>
        <li className="">{t("politically-exposed")}</li>
        <li className="">{t("countries")}</li>
      </ul>
    </div>
  );
};
