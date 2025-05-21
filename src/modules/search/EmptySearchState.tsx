import { useTranslations } from "next-intl";
import { SearchBar } from "../app/layout/components/SearchBar";

export const EmptySearchState = () => {
  const t = useTranslations("report.empty");

  return (
    <div className="h-[calc(100vh-102px)] w-full flex flex-col justify-center items-center gap-12">
      <h2 className="text-center text-4xl font-semibold lg:max-w-4xl lg:text-5xl xl:text-6xl mt-6">
        {t("get-started")}
      </h2>
      <SearchBar variant={"search-page"} />
    </div>
  );
};
