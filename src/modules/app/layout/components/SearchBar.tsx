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
import { useLocale, useTranslations } from "next-intl";
import { useRef, useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";

export const SearchBar = () => {
  // hCaptcha state
  const captchaRef = useRef<HCaptcha | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const t = useTranslations("searchbar");
  const locale = useLocale();

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

  const onSubmit: SubmitHandler<SearchFormInterface> = async ({
    nationality,
    searchType,
    searchInput,
  }: FieldValues) => {
    if (!captchaToken) {
      captchaRef.current?.execute();
      return;
    }

    router.push("/app/search");
    if (searchType === SEARCH_TYPE_NAME) {
      searchByName(nationality, searchInput);
      // const searchedReport = await searchReportByName();
      // router.push(`/app/records/${searchedReport.id}`);
    }
    if (searchType === SEARCH_TYPE_ID) {
      searchById(nationality, searchInput);
      // const searchedReport = await searchReportById();
      // router.push(`/app/records/${searchedReport.id}`);
    }
    reset();
    setCaptchaToken(null);
  };

  return (
    <form
      className="hidden xl:flex items-center justify-start 2xl:justify-center flex-1"
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
        className="px-8 font-medium text-lg rounded-md"
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
      {/* Invisible hCaptcha */}
      <HCaptcha
        sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || ""}
        size="invisible"
        ref={captchaRef}
        onVerify={(token) => setCaptchaToken(token)}
        languageOverride={locale}
      />
    </form>
  );
};
