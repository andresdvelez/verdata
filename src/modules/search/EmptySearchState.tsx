import { useTranslations } from "next-intl";

export const EmptySearchState = () => {
  const t = useTranslations("report.empty");

  return (
    <div className="h-[calc(100vh-102px)] w-full flex flex-col justify-center items-center">
      <span className="icon-[ph--magnifying-glass-duotone] text-6xl text-gray-400"></span>
      <h2 className="text-center text-4xl font-semibold lg:text-6xl mt-6">
        {t("get-started")}
      </h2>
    </div>
  );
};
