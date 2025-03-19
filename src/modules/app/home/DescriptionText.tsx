"use client";

import { AnimatedCurveSvg } from "@/modules/common/components/AnimatedCurveSvg";
import { useTranslations } from "next-intl";

export const DescriptionText = () => {
  const t = useTranslations("home.description-text");

  return (
    <div className="w-full h-full">
      <div className="max- text-left">
        <h2 className="text-7xl font-bold mb-6 leading-tight">
          {t("consults")}{" "}
          <span className="relative inline-block">
            {t("designed")}
            <div className="absolute -bottom-3 left-0 right-0">
              <AnimatedCurveSvg stroke="#946DF0" />
            </div>
          </span>
          <br /> {t("based-on")}{" "}
          <span className="text-[#8d64ed]">{t("your")}</span>
          <br />
          <span className="text-[#8d64ed]">{t("needs")}***</span>
        </h2>
        <p className="text-xl max-w-lg">{t("description")}</p>
      </div>
    </div>
  );
};
