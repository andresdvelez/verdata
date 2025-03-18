import { z, ZodType } from "zod";

export const searchSchema: ZodType<{
  nationality: string;
  searchType: string;
  searchInput: string;
}> = z.object({
  nationality: z.string().min(1, "Se requiere nacionalidad"),
  searchType: z.string().min(1, "Se requiere tipo de búsqueda"),
  searchInput: z.string().min(1, "Se requieren los datos de búsqueda"),
});
