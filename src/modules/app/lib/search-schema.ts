import { SearchType } from "@/types/app/search";
import { z, ZodIssueCode, ZodType } from "zod";

export const documentValidation: Record<
  string,
  { regex: RegExp; messageKey: string }
> = {
  ARG: { regex: /^(\d{7,8}|\d{2}-\d{8}-\d)$/, messageKey: "argDocument" },
  BOL: { regex: /^\d{6,8}$/, messageKey: "bolDocument" },
  BRA: { regex: /^\d{11}$/, messageKey: "braDocument" },
  CHL: { regex: /^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$/, messageKey: "chlDocument" },
  COL: { regex: /^\d{10}$/, messageKey: "colDocument" },
  CRI: { regex: /^\d{9}$/, messageKey: "criDocument" },
  ECU: { regex: /^\d{10}$/, messageKey: "ecuDocument" },
  SLV: { regex: /^\d{4}-\d{6}-\d$/, messageKey: "slvDocument" },
  GTM: { regex: /^\d{7,8}$/, messageKey: "gtmDocument" },
  HND: { regex: /^\d{9}$/, messageKey: "hndDocument" },
  MEX: { regex: /^[A-Z]{4}\d{6}[A-Z0-9]{3}$/, messageKey: "mexDocument" },
  PAN: { regex: /^\d{6}-\d{1}$/, messageKey: "panDocument" },
  PRY: { regex: /^\d{6,7}$/, messageKey: "pryDocument" },
  PER: { regex: /^\d{8}$/, messageKey: "perDocument" },
  DOM: { regex: /^\d{3}-\d{7}-\d$/, messageKey: "domDocument" },
  VEN: { regex: /^\d{8,9}$/, messageKey: "venDocument" },
};

export const createSearchSchema = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: (key: string, vars?: Record<string, any>) => string
): ZodType<{
  nationality: string;
  searchType: string;
  searchInput: string;
}> =>
  z
    .object({
      nationality: z.string().min(1, t("errors.nationalityRequired")),
      searchType: z.string().min(1, t("errors.searchTypeRequired")),
      searchInput: z.string().min(1, t("errors.searchInputRequired")),
    })
    .superRefine((data, ctx) => {
      const { nationality, searchType, searchInput } = data;

      if (searchType === SearchType.DOCUMENT) {
        const rule = documentValidation[nationality];
        if (rule) {
          if (!rule.regex.test(searchInput)) {
            ctx.addIssue({
              code: ZodIssueCode.custom,
              path: ["searchInput"],
              message: t(`errors.invalidDocument_${rule.messageKey}`),
            });
          }
        } else {
          if (!/^\d+$/.test(searchInput)) {
            ctx.addIssue({
              code: ZodIssueCode.custom,
              path: ["searchInput"],
              message: t("errors.invalidDocumentGeneric"),
            });
          }
        }
      }

      if (searchType === SearchType.NAME) {
        const words = searchInput.trim().split(/\s+/);
        if (words.length < 2) {
          ctx.addIssue({
            code: ZodIssueCode.custom,
            path: ["searchInput"],
            message: t("errors.nameTwoWords"),
          });
        }
      }
    });
