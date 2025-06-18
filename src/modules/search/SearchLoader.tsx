import { useTranslations } from "next-intl";
import React from "react";
import { KYCReportSkeleton } from "../app/home/kyc-report/KYCReportSkeleton";

export const SearchLoader = () => {
  const t = useTranslations("report.loader");

  return (
    <div className="h-[calc(100vh-102px)] relative w-full">
      <div className="w-full opacity-35">
        <KYCReportSkeleton />
      </div>
      <div className="absolute inset-0 h-full w-full flex flex-col items-center justify-center">
        <div className="flex items-center justify-center  w-full ">
          <div className="relative w-20 h-20 animate-spin">
            <div className="absolute inset-0 border-4 border-gray-300 rounded-full animate-spin"></div>
            <div className="absolute inset-0 border-t-4 border-blue-500 rounded-full animate-spin-fast"></div>
          </div>
        </div>
        <h2 className="text-center text-4xl font-semibold lg:max-w-4xl lg:text-5xl xl:text-6xl mt-6">
          {t("loading-text")}
        </h2>
      </div>
    </div>
  );
};
