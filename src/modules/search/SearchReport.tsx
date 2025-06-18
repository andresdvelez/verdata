"use client";

import React from "react";
import { useSearchReportStore } from "../store/search-report-store";
import { EmptySearchState } from "./EmptySearchState";
import { KYCReportComponent } from "../app/home/KYCReportComponent";
import { SearchLoader } from "./SearchLoader";
import { KYCReport } from "@/types/app/reports";
import { sampleKYCReport } from "../app/common/data/kycReportData";
import { NameMatchesList } from "./NameMatchesList";

export const SearchReport = ({ report }: { report: KYCReport }) => {
  const isSearchEmpty = useSearchReportStore((state) => state.isEmpty);
  const isSearchLoading = useSearchReportStore((state) => state.isLoading);
  const isPresearchByName = useSearchReportStore((state) => state.isPreSearch);

  if (isSearchEmpty) return <EmptySearchState />;

  if (isSearchLoading) return <SearchLoader />;

  if (isPresearchByName) return <NameMatchesList />;

  return (
    <KYCReportComponent report={(report as KYCReport) || sampleKYCReport} />
  );
};
