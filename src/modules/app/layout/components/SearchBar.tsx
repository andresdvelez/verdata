"use client";

import { addToast, Button } from "@heroui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSearchSchema } from "../../lib/search-schema";
import { NationalitySelect } from "./searchbar/NationalitySelect";
import { SearchFormInterface, SearchType } from "@/types/app/search";
import { SearchTypeSelect } from "./searchbar/SearchTypeSelect";
import { SearchInput } from "./searchbar/SearchInput";
import { usePathname, useRouter } from "@/modules/translations/i18n/routing";
import { useSearchReportStore } from "@/modules/store/search-report-store";
import { useLocale, useTranslations } from "next-intl";
import { useRef, useState, useEffect } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useUser } from "@clerk/nextjs";
import { useUserStore } from "@/modules/store/user-store";
import { useEntitlementsValidation } from "../../common/hooks/useEntitlementsValidation";
import { clsx } from "clsx";

// Configuration for intelligent captcha behavior
const CAPTCHA_CONFIG = {
  // Time window for tracking searches (in milliseconds)
  TIME_WINDOW: 60 * 1000, // 1 minute
  // Number of searches allowed before requiring captcha
  SEARCH_THRESHOLD: 3,
  // Time to keep captcha token valid (in milliseconds)
  TOKEN_VALIDITY: 5 * 60 * 1000, // 5 minutes
  // Time to trust a user after successful captcha (in milliseconds)
  TRUST_PERIOD: 30 * 60 * 1000, // 30 minutes
};

interface SearchHistory {
  timestamp: number;
  searchType: string;
}

export const SearchBar = ({
  variant = "header",
}: {
  variant?: "header" | "search-page";
}) => {
  const captchaRef = useRef<HCaptcha | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [tokenTimestamp, setTokenTimestamp] = useState<number | null>(null);
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);
  const [lastVerifiedTimestamp, setLastVerifiedTimestamp] = useState<
    number | null
  >(null);
  const [requiresCaptcha, setRequiresCaptcha] = useState(false);
  const [pendingFormData, setPendingFormData] =
    useState<SearchFormInterface | null>(null);

  const { user } = useUser();
  const t = useTranslations("searchbar");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
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

  // Load search history from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedHistory = localStorage.getItem("searchHistory");
      const storedLastVerified = localStorage.getItem("lastVerifiedTimestamp");

      if (storedHistory) {
        try {
          const parsed = JSON.parse(storedHistory);
          // Filter out old entries
          const recentHistory = parsed.filter(
            (item: SearchHistory) =>
              Date.now() - item.timestamp < CAPTCHA_CONFIG.TIME_WINDOW
          );
          setSearchHistory(recentHistory);
        } catch (e) {
          console.error("Failed to parse search history:", e);
        }
      }

      if (storedLastVerified) {
        const timestamp = parseInt(storedLastVerified, 10);
        if (Date.now() - timestamp < CAPTCHA_CONFIG.TRUST_PERIOD) {
          setLastVerifiedTimestamp(timestamp);
        } else {
          localStorage.removeItem("lastVerifiedTimestamp");
        }
      }
    }
  }, []);

  // Clean up old search history periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setSearchHistory((prev) => {
        const filtered = prev.filter(
          (item) => Date.now() - item.timestamp < CAPTCHA_CONFIG.TIME_WINDOW
        );
        if (filtered.length !== prev.length) {
          localStorage.setItem("searchHistory", JSON.stringify(filtered));
        }
        return filtered;
      });
    }, 10000); // Clean up every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const isTokenValid = () => {
    if (!captchaToken || !tokenTimestamp) return false;
    return Date.now() - tokenTimestamp < CAPTCHA_CONFIG.TOKEN_VALIDITY;
  };

  const isUserTrusted = () => {
    if (!lastVerifiedTimestamp) return false;
    return Date.now() - lastVerifiedTimestamp < CAPTCHA_CONFIG.TRUST_PERIOD;
  };

  const shouldRequireCaptcha = (formData: SearchFormInterface) => {
    // If user is in trust period, don't require captcha
    if (isUserTrusted()) return false;

    // If we have a valid token, don't require new captcha
    if (isTokenValid()) return false;

    // Check recent search history
    const recentSearches = searchHistory.filter(
      (item) => Date.now() - item.timestamp < CAPTCHA_CONFIG.TIME_WINDOW
    );

    // Check for rapid searches
    if (recentSearches.length >= CAPTCHA_CONFIG.SEARCH_THRESHOLD) {
      return true;
    }

    // Check for suspicious patterns (e.g., same search type repeatedly)
    const sameTypeSearches = recentSearches.filter(
      (item) => item.searchType === formData.searchType
    );
    if (sameTypeSearches.length >= CAPTCHA_CONFIG.SEARCH_THRESHOLD - 1) {
      return true;
    }

    return false;
  };

  const updateSearchHistory = (formData: SearchFormInterface) => {
    const newEntry: SearchHistory = {
      timestamp: Date.now(),
      searchType: formData.searchType,
    };

    const updatedHistory = [...searchHistory, newEntry].filter(
      (item) => Date.now() - item.timestamp < CAPTCHA_CONFIG.TIME_WINDOW
    );

    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };

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
        return;
      }

      // Update search history
      updateSearchHistory(formData);

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
      addToast({
        title: t(error),
        description: t("alerts.try-it-later"),
      });
    } finally {
      setIsLoading(false);
      setPendingFormData(null);
    }
  };

  // Handler for form submission
  const onSubmit: SubmitHandler<SearchFormInterface> = (data) => {
    const needsCaptcha = shouldRequireCaptcha(data);

    if (!needsCaptcha || isTokenValid()) {
      // Process search directly
      setIsLoading(true);
      processSearch(data);
    } else {
      // Store form data and trigger captcha
      setPendingFormData(data);
      setRequiresCaptcha(true);
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
    setRequiresCaptcha(false);
  };

  const handleVerify = (token: string) => {
    setCaptchaToken(token);
    setTokenTimestamp(Date.now());
    setRequiresCaptcha(false);

    // Update last verified timestamp
    const now = Date.now();
    setLastVerifiedTimestamp(now);
    localStorage.setItem("lastVerifiedTimestamp", now.toString());

    // Process the pending search
    if (pendingFormData) {
      processSearch(pendingFormData);
    }
  };

  const handleCaptchaError = () => {
    setIsLoading(false);
    setRequiresCaptcha(false);
    setPendingFormData(null);
    addToast({
      title: t("alerts.captcha-error"),
      description: t("alerts.try-it-later"),
    });
  };

  if (variant === "header" && pathname === "/app/search") return <></>;

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
      {/* Invisible hCaptcha - only renders when needed */}
      {requiresCaptcha && (
        <HCaptcha
          sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || ""}
          size="invisible"
          ref={captchaRef}
          onVerify={handleVerify}
          languageOverride={locale}
          onClose={() => {
            setIsLoading(false);
            setRequiresCaptcha(false);
            setPendingFormData(null);
          }}
          onError={handleCaptchaError}
          onExpire={() => {
            setCaptchaToken(null);
            setTokenTimestamp(null);
            handleCaptchaError();
          }}
        />
      )}
    </form>
  );
};
