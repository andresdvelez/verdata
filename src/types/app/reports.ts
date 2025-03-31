import {
  InternationalEndpoint,
  NationalEndpoint,
  Report,
  SearchedIdentities,
} from "@prisma/client";

export type VerificationResult = boolean;

export interface ListCheck {
  listName: string;
  description: string;
  result: VerificationResult;
}

export interface NationalList {
  countryCode: string;
  countryName: string;
  lists: ListCheck[];
}

export interface InternationalList {
  organization: string;
  scope: string;
  lists: ListCheck[];
}

export interface ReportData {
  identity: SearchedIdentities;
  nationals: NationalEndpoint;
  internationals: InternationalEndpoint;
}

export type KYCReport = Report & {
  sanctions_lists: {
    international: {
      overall: VerificationResult;
      lists: InternationalList[];
    };
    national: {
      overall: VerificationResult;
      lists: NationalList[];
    };
  };
  related_identity: SearchedIdentities;
};
