import { z, ZodType } from "zod";

export const createSearchSchema = (
  t: (key: string) => string
): ZodType<{
  nationality: string;
  searchType: string;
  searchInput: string;
}> =>
  z.object({
    nationality: z.string().min(1, t("errors.nationalityRequired")),
    searchType: z.string().min(1, t("errors.searchTypeRequired")),
    searchInput: z.string().min(1, t("errors.searchInputRequired")),
  });
