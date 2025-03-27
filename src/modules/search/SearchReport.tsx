"use client";

import React from "react";
import { useSearchReportStore } from "../store/search-report-store";
import { EmptySearchState } from "./EmptySearchState";
import { KYCReportComponent } from "../app/home/KYCReportComponent";
import { sampleKYCReport } from "../app/common/data/kycReportData";
import { SearchLoader } from "./SearchLoader";

export const SearchReport = () => {
  const isSearchEmpty = useSearchReportStore((state) => state.isEmpty);
  const isSearchLoading = useSearchReportStore((state) => state.isLoading);

  if (isSearchEmpty) return <EmptySearchState />;

  if (isSearchLoading) return <SearchLoader />;

  return <KYCReportComponent report={sampleKYCReport} />;
};
