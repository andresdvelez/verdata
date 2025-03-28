"use client";

import { useTranslations } from "next-intl";

export const CreditsHeader = () => {
  const t = useTranslations("credits");

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 my-">{t("manage-plan")}</h2>
      <p className="text-gray-600 mb-8">{t("manage-subscription-here")}</p>
    </div>
  );
};
