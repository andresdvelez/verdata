"use client";

import { addToast, Button } from "@heroui/react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSearchSchema } from "../../lib/search-schema";
import { NationalitySelect } from "./searchbar/NationalitySelect";
import { SearchFormInterface } from "@/types/app/search";
import { SearchTypeSelect } from "./searchbar/SearchTypeSelect";
import { SearchInput } from "./searchbar/SearchInput";
import { useRouter } from "@/modules/translations/i18n/routing";
import { useSearchReportStore } from "@/modules/store/search-report-store";
import { useLocale, useTranslations } from "next-intl";
import { useRef, useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useUser } from "@clerk/nextjs";
import { useUserStore } from "@/modules/store/user-store";
import { useEntitlementsValidation } from "../../common/hooks/useEntitlementsValidation";

export const SearchBar = () => {
  // hCaptcha state
  const captchaRef = useRef<HCaptcha | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const { user } = useUser();

  const t = useTranslations("searchbar");
  const locale = useLocale();
  const { isFullReportAvailable } = useEntitlementsValidation();

  // Create the schema with translations
  const searchSchema = createSearchSchema(t);

  const router = useRouter();
  const searchReport = useSearchReportStore(
    (state) => state.handleSearchReport
  );
  const isLoading = useSearchReportStore((state) => state.isLoading);
  const addSearchedReport = useUserStore((state) => state.addSearchedReport);

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

    router.replace("/app/search");

    try {
      addToast({
        title: "Your report is being generated",
        description: "Please wait",
        color: "success",
      });
      const searchedReport = await searchReport({
        userId: user?.id as string,
        searchType,
        nationality,
        searchInput,
        isFullReportAvailable,
      });
      addSearchedReport(searchedReport);
      router.push(`/app/records/${searchedReport.id}`);
    } catch (error) {
      addToast({
        title: t(error),
        description: "Try it later",
      });
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
          !isLoading && (
            <i
              className="icon-[tdesign--search] size-4"
              role="img"
              aria-hidden="true"
            />
          )
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
