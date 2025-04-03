import { sampleKYCReport } from "@/modules/app/common/data/kycReportData";
import { getReportByReportIdAndUserId } from "@/modules/prisma/lib/reports";
import { SearchReport } from "@/modules/search/SearchReport";
import { KYCReport } from "@/types/app/reports";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

const SearchPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const reportId = (await params).id;
  const user = await currentUser();

  if (reportId) {
    const report = await getReportByReportIdAndUserId(
      reportId,
      user?.id as string
    );

    return <SearchReport report={report as KYCReport} />;
  }

  return <SearchReport report={sampleKYCReport} />;
};

export default SearchPage;
