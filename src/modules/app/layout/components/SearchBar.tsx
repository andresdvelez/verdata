"use client";

import { addToast, Button, Chip } from "@heroui/react";
import { useForm, SubmitHandler } from "react-hook-form";
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
  const captchaRef = useRef<HCaptcha | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const { user } = useUser();
  const t = useTranslations("searchbar");
  const locale = useLocale();
  const router = useRouter();
  const { isFullReportAvailable } = useEntitlementsValidation();

  // Create the schema with translations
  const searchSchema = createSearchSchema(t);

  // Store functions
  const searchReport = useSearchReportStore(
    (state) => state.handleSearchReport
  );
  const isLoading = useSearchReportStore((state) => state.isLoading);
  const addSearchedReport = useUserStore((state) => state.addSearchedReport);
  const resetSearchState = useSearchReportStore(
    (state) => state.resetSearchState
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<SearchFormInterface>({
    resolver: zodResolver(searchSchema),
  });

  // Function to process the actual search
  const processSearch = async (formData: SearchFormInterface) => {
    router.replace("/app/search");

    try {
      addToast({
        title: "Your report is being generated",
        description: "Please wait",
        color: "success",
      });

      const searchedReport = await searchReport({
        userId: user?.id as string,
        searchType: formData.searchType as "name" | "identification",
        nationality: formData.nationality,
        searchInput: formData.searchInput,
        isFullReportAvailable,
      });

      addSearchedReport(searchedReport);
      router.push(`/app/records/${searchedReport.id}`);

      // Reset form and state
      resetForm();
    } catch (error) {
      addToast({
        title: t(error),
        description: "Try it later",
      });
    }
  };

  // Handler for form submission
  const onSubmit: SubmitHandler<SearchFormInterface> = (data) => {
    if (captchaToken) {
      // If captcha is already verified, proceed with search
      processSearch(data);
    } else {
      // Otherwise, trigger captcha verification
      captchaRef.current?.execute();
    }
  };

  // Reset form and state
  const resetForm = () => {
    reset({
      nationality: "",
      searchType: "",
      searchInput: "",
    });
    resetSearchState();
    setCaptchaToken(null);
  };

  // Handle captcha verification
  const handleVerify = (token: string) => {
    setCaptchaToken(token);

    // Get current form values and submit the form programmatically
    // This is a better approach than storing form values in state
    handleSubmit((data) => {
      processSearch(data);
    })();
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
      <div className="relative">
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
        {isDirty && !captchaToken && (
          <Chip
            className="absolute -left-3 -bottom-7"
            variant="flat"
            color="warning"
            size="sm"
            startContent={
              <i
                className="icon-[typcn--warning]"
                role="img"
                aria-hidden="true"
              />
            }
          >
            {t("complete-captcha")}
          </Chip>
        )}
      </div>
      {/* Invisible hCaptcha */}
      <HCaptcha
        sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || ""}
        size="invisible"
        ref={captchaRef}
        onVerify={handleVerify}
        languageOverride={locale}
      />
    </form>
  );
};
