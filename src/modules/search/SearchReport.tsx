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

  if (isSearchLoading)
    return (
      <div className="h-full w-full flex flex-col justify-center items-center">
        <SearchLoader />
        <h2 className="text-center text-4xl font-semibold lg:text-6xl mt-6">
          Cargando coincidencias para la búsqueda realizada...
        </h2>
      </div>
    );

  return <KYCReportComponent report={sampleKYCReport} />;
};
