"use client";

import { AnimatedCurveSvg } from "@/modules/common/components/AnimatedCurveSvg";
import { useTranslations } from "next-intl";

export const DescriptionText = () => {
  const t = useTranslations("home.description-text");

  return (
    <div className="w-full h-full flex flex-col">
      <h2 className="text-3xl md:text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-6 leading-tight">
        {t("consults")}{" "}
        <div className="relative inline-block">
          {t("designed")}
          <span className="absolute -bottom-3 left-0 right-0">
            <AnimatedCurveSvg stroke="#946DF0" />
          </span>
        </div>
        <br /> {t("based-on")}{" "}
        <span className="text-[#8d64ed]">{t("your")}</span>
        <br />
        <span className="text-[#8d64ed]">{t("needs")}***</span>
      </h2>
      <p className="text-lg 2xl:text-xl max-w-lg -mt-6">{t("description")}</p>
    </div>
  );
};
