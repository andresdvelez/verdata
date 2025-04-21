import { RestrictiveList } from "@/modules/app/home/kyc-report/InternationalSanctionsSection";
import {
  InternationalEndpoint,
  NationalEndpoint,
  Report,
  SearchedIdentities,
} from "@prisma/client";

export type VerificationResult = boolean;

export interface ReportData {
  identity: SearchedIdentities;
  nationals: NationalEndpoint;
  internationals: InternationalEndpoint;
}

export type KYCReport = Report & {
  sanctions_lists: {
    international: {
      overall: VerificationResult;
      lists: RestrictiveList[];
    };
    national: {
      overall: VerificationResult;
      lists: RestrictiveList[];
    };
  };
  related_identity: SearchedIdentities;
};
