import { Report, SearchedIdentities } from "@prisma/client";

export type VerificationResult = boolean;

export interface ReportData {
  identity: SearchedIdentities;
  nationals: {
    overall: VerificationResult;
    lists: RestrictiveListResult[];
  };
  internationals: {
    overall: VerificationResult;
    lists: RestrictiveListResult[];
  };
}

export type KYCReport = Report & {
  sanctions_lists: {
    international: {
      overall: VerificationResult;
      lists: RestrictiveListResult[];
    };
    national: {
      overall: VerificationResult;
      lists: RestrictiveListResult[];
    };
  };
  peps_lists?: {
    overall: VerificationResult;
    lists: RestrictiveListResult[];
  };
  related_identity: SearchedIdentities;
  isRealData: boolean;
};

export interface RestrictiveListItem {
  title: string;
  url: string;
  description?: string;
  imageUrl?: string;
  screenshots: string[];
}

export interface RestrictiveListResult {
  listName: string;
  listCode: string;
  isMatch: boolean;
  file?: string;
  items: RestrictiveListItem[];
  error?: string;
  screenshots: string[];
}

export interface RestrictiveListsData {
  national: {
    lists: RestrictiveListResult[];
    overall: boolean;
  };
  international: {
    lists: RestrictiveListResult[];
    overall: boolean;
  };
  peps?: {
    lists: RestrictiveListResult[];
    overall: boolean;
  };
}
