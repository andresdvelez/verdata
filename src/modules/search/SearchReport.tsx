"use client";

import React from "react";
import { useSearchReportStore } from "../store/search-report-store";
import { EmptySearchState } from "./EmptySearchState";
import { KYCReportComponent } from "../app/home/KYCReportComponent";
import { SearchLoader } from "./SearchLoader";
import { KYCReport } from "@/types/app/reports";
import { sampleKYCReport } from "../app/common/data/kycReportData";

export const SearchReport = ({ report }: { report: KYCReport }) => {
  const isSearchEmpty = useSearchReportStore((state) => state.isEmpty);
  const isSearchLoading = useSearchReportStore((state) => state.isLoading);

  if (isSearchEmpty) return <EmptySearchState />;

  if (isSearchLoading) return <SearchLoader />;

  return (
    <KYCReportComponent report={(report as KYCReport) || sampleKYCReport} />
  );
};
