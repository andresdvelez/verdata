"use client";

import { Button } from "@heroui/react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSearchSchema } from "../../lib/search-schema";
import { NationalitySelect } from "./searchbar/NationalitySelect";
import { SearchFormInterface } from "@/types/app/search";
import { SearchTypeSelect } from "./searchbar/SearchTypeSelect";
import { SearchInput } from "./searchbar/SearchInput";
import { SEARCH_TYPE_ID, SEARCH_TYPE_NAME } from "../../constants/search";
import { useRouter } from "@/modules/translations/i18n/routing";
import { useSearchReportStore } from "@/modules/store/search-report-store";
import { useTranslations } from "next-intl";

export const SearchBar = () => {
  const t = useTranslations("searchbar");

  // Create the schema with translations
  const searchSchema = createSearchSchema(t);

  const router = useRouter();
  const searchByName = useSearchReportStore((state) => state.searchByName);
  const searchById = useSearchReportStore((state) => state.searchById);
  const isLoading = useSearchReportStore((state) => state.isLoading);

  const { control, handleSubmit, reset } = useForm<SearchFormInterface>({
    resolver: zodResolver(searchSchema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<SearchFormInterface> = ({
    nationality,
    searchType,
    searchInput,
  }: FieldValues) => {
    if (searchType === SEARCH_TYPE_NAME) {
      searchByName(nationality, searchInput);
    }
    if (searchType === SEARCH_TYPE_ID) {
      searchById(nationality, searchInput);
    }
    reset();
    router.push(`/app/search`);
  };

  return (
    <form
      className="flex items-center justify-start 2xl:justify-center flex-1"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex items-center *:border-r border-black/35 *:px-1">
        <NationalitySelect control={control} />
        <SearchTypeSelect control={control} />
        <SearchInput control={control} />
      </div>
      <Button
        id="tooltip-select-0"
        isLoading={isLoading}
        variant="solid"
        radius="none"
        className="px-8 font-medium text-lg"
        color="primary"
        type="submit"
        startContent={
          <i
            className="icon-[tdesign--search] size-4"
            role="img"
            aria-hidden="true"
          />
        }
      >
        {t("search")}
      </Button>
    </form>
  );
};
