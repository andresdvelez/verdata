import {
  InternationalEndpoint,
  NationalEndpoint,
  SearchedIdentities,
} from "@prisma/client";

export interface ReportData {
  identity: SearchedIdentities;
  nationals: NationalEndpoint;
  internationals: InternationalEndpoint;
}
