"use client";

import { addToast, Button } from "@heroui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSearchSchema } from "../../lib/search-schema";
import { NationalitySelect } from "./searchbar/NationalitySelect";
import { SearchFormInterface, SearchType } from "@/types/app/search";
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
import { clsx } from "clsx";

export const SearchBar = ({
  variant = "header",
}: {
  variant?: "header" | "search-page";
}) => {
  const captchaRef = useRef<HCaptcha | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const { user } = useUser();
  const t = useTranslations("searchbar");
  const locale = useLocale();
  const router = useRouter();
  const { isFullReportAvailable } = useEntitlementsValidation();

  const searchSchema = createSearchSchema(t);

  const searchReport = useSearchReportStore(
    (state) => state.handleSearchReport
  );
  const searchByName = useSearchReportStore((state) => state.searchByName);
  const isLoading = useSearchReportStore((state) => state.isLoading);
  const setIsLoading = useSearchReportStore((state) => state.setIsLoading);
  const addSearchedReport = useUserStore((state) => state.addSearchedReport);
  const resetSearchState = useSearchReportStore(
    (state) => state.resetSearchState
  );

  const { control, handleSubmit, reset } = useForm<SearchFormInterface>({
    resolver: zodResolver(searchSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const processSearch = async (formData: SearchFormInterface) => {
    router.replace("/app/search");

    try {
      if (!user) {
        addToast({
          title: t("alerts.have-to-sign-in"),
          description: t("alerts.please-sign-in"),
          color: "warning",
        });
        router.push("/auth/sign-in");
        setIsLoading(false);
      }

      if (formData.searchType === SearchType.DOCUMENT) {
        addToast({
          title: t("alerts.report-being-generated"),
          description: t("alerts.please-wait"),
          color: "success",
        });

        const searchedReport = await searchReport({
          userId: user?.id as string,
          searchType: formData.searchType as SearchType,
          nationality: formData.nationality,
          searchInput: formData.searchInput,
          isFullReportAvailable,
        });

        addSearchedReport(searchedReport);
        router.push(`/app/records/${searchedReport.id}`);
      } else if (formData.searchType === SearchType.NAME) {
        await searchByName({
          userId: user?.id as string,
          countryCode: formData.nationality,
          searchName: formData.searchInput,
        });
      }

      resetForm();
    } catch (error) {
      console.log("test");
      addToast({
        title: t(error),
        description: t("alerts.try-it-later"),
      });
    }
  };

  // Handler for form submission
  const onSubmit: SubmitHandler<SearchFormInterface> = (data) => {
    if (captchaToken) {
      processSearch(data);
    } else {
      setIsLoading(true);
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

  const handleVerify = (token: string) => {
    setCaptchaToken(token);

    handleSubmit((data) => {
      processSearch(data);
    })();
  };

  return (
    <form
      className={clsx(
        "flex flex-col lg:flex-row items-center justify-start 2xl:justify-center w-full",
        {
          "hidden xl:flex flex-1": variant === "header",
        }
      )}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className=" flex flex-col lg:flex-row items-center lg:*:border-r border-black/35 *:px-1">
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
      </div>
      {/* Invisible hCaptcha */}
      <HCaptcha
        sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || ""}
        size="invisible"
        ref={captchaRef}
        onVerify={handleVerify}
        languageOverride={locale}
        onClose={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
        onExpire={() => setIsLoading(false)}
      />
    </form>
  );
};
