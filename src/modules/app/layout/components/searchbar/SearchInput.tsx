"use client";

import {
  SEARCH_TYPE_NAME,
  SEARCH_TYPE_ID,
} from "@/modules/app/constants/search";
import { documentValidation } from "@/modules/app/lib/search-schema";
import { useSearchReportStore } from "@/modules/store/search-report-store";
import { SearchFormInterface } from "@/types/app/search";
import { Input } from "@heroui/react";
import { useTranslations } from "next-intl";
import { Control, Controller } from "react-hook-form";

export const SearchInput = ({
  control,
}: {
  control: Control<SearchFormInterface>;
}) => {
  const t = useTranslations("search-data-input");
  const tError = useTranslations("searchbar.errors");

  const localSearchType = useSearchReportStore(
    (state) => state.localSearchType
  );
  const nationality = useSearchReportStore((state) => state.countryCode);
  const searchDocumentLabel = useSearchReportStore(
    (state) => state.searchDocumentLabel
  );

  const isDoc = localSearchType === SEARCH_TYPE_ID;
  const isName = localSearchType === SEARCH_TYPE_NAME;

  // Name regex: at least two words, each ≥2 letters, allows more words
  const nameRegex = /^(?:[A-Za-zÀ-ÖØ-öø-ÿ]{2,}\s+){1,}[A-Za-zÀ-ÖØ-öø-ÿ]{2,}$/;
  const nameError = tError("nameTwoWords");

  // Document validation rule
  const docRule = isDoc && documentValidation[nationality!];
  const docRegex = docRule ? docRule.regex : null;

  // derive max length from regex
  let docMax: number | undefined;
  if (docRegex) {
    const src = docRegex.source;
    const exact = src.match(/\\d\\{(\\d+)\\}/);
    const range = src.match(/\\d\\{(\\d+),(\\d+)\\}/);
    if (exact) docMax = parseInt(exact[1], 10);
    else if (range) docMax = parseInt(range[2], 10);
  }

  const validateValue = (value: string) => {
    const v = value.trim();
    if (!v) return tError("searchInputRequired");

    if (isName && !nameRegex.test(v)) {
      return nameError;
    }

    if (isDoc) {
      if (docRegex) {
        if (!docRegex.test(v))
          return tError(
            `invalidDocument_${docRule ? docRule.messageKey : "generic"}`
          );
      } else if (!/^\d+$/.test(v)) {
        return tError("invalidDocumentGeneric");
      }
    }

    return true;
  };

  return (
    <Controller
      name="searchInput"
      control={control}
      rules={{ validate: validateValue }}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <Input
          type="text"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          // block invalid keys for name, cap length only for ID
          onKeyDown={(e) => {
            if (isName) {
              const allowed = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]$/;
              if (!allowed.test(e.key) && e.key.length === 1) {
                e.preventDefault();
              }
            }
            if (
              isDoc &&
              typeof docMax === "number" &&
              e.key.length === 1 &&
              value.length >= docMax
            ) {
              e.preventDefault();
            }
          }}
          isInvalid={!!error}
          validationBehavior="native"
          errorMessage={error?.message}
          className="bg-transparent shadow-none lg:min-w-[200px] xl:min-w-[225px] border-none"
          classNames={{
            inputWrapper:
              "!bg-transparent shadow-none data-[hover=true]:bg-transparent group-data-[focus=true]:!bg-transparent data-[hover=true]:!bg-transparent",
            errorMessage: "absolute bottom-0",
          }}
          label={isName ? t("name") : isDoc ? searchDocumentLabel : undefined}
          placeholder={isName ? t("name") : searchDocumentLabel}
          {...(isName && { pattern: nameRegex.source, title: nameError })}
          {...(isDoc &&
            docRegex && {
              pattern: docRegex.source,
              title: tError(
                `invalidDocument_${docRule ? docRule.messageKey : "generic"}`
              ),
              maxLength: docMax,
            })}
        />
      )}
    />
  );
};
