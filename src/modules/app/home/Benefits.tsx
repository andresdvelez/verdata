"use client";

import { useTranslations } from "next-intl";

export const Benefits = () => {
  const t = useTranslations("home.benefits");

  return (
    <div className="w-full h-full flex flex-col gap-6 px-8 py-4 bg-background">
      <h3 className="text-4xl font-semibold">{t("benefits")}</h3>
      <ul className="flex flex-col gap-[9px] *:gap-4">
        <li className="flex items-center">
          <i
            className="icon-[material-symbols--check-circle-rounded] size-5"
            role="img"
            aria-hidden="true"
          />
          <p className="text-lg font-medium max-w-xs">
            {t("immediate-access")}
          </p>
        </li>
        <li className="flex items-center">
          <i
            className="icon-[material-symbols--check-circle-rounded] size-5"
            role="img"
            aria-hidden="true"
          />
          <p className="text-lg font-medium max-w-xs">{t("instant-reports")}</p>
        </li>
        <li className="flex items-center">
          <i
            className="icon-[material-symbols--check-circle-rounded] size-5"
            role="img"
            aria-hidden="true"
          />
          <p className="text-lg font-medium max-w-xs">
            {t("easy-to-read-reports")}
          </p>
        </li>
        <li className="flex items-center">
          <i
            className="icon-[material-symbols--check-circle-rounded] size-5"
            role="img"
            aria-hidden="true"
          />
          <p className="text-lg font-medium max-w-xs">
            {t("unlimited-consultations")}
          </p>
        </li>
      </ul>
    </div>
  );
};
