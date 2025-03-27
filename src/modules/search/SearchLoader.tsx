import { useTranslations } from "next-intl";
import React from "react";

export const SearchLoader = () => {
  const t = useTranslations("report.loader");

  return (
    <div className="h-[calc(100vh-102px)] w-full flex flex-col justify-center items-center">
      <div className="flex items-center justify-center  w-full">
        <div className="relative w-20 h-20 animate-spin">
          <div className="absolute inset-0 border-4 border-gray-300 rounded-full animate-spin"></div>
          <div className="absolute inset-0 border-t-4 border-blue-500 rounded-full animate-spin-fast"></div>
        </div>
      </div>
      <h2 className="text-center text-4xl font-semibold lg:text-6xl mt-6">
        {t("loading-text")}
      </h2>
    </div>
  );
};
