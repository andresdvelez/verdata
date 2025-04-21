import { Report, SearchedIdentities, User } from "@prisma/client";

export type UserType = User & { searched_reports: Report[] };

export interface SearchNameResults {
  results: SearchedIdentities[];
  total: number;
}
