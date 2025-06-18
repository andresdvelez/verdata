import React from "react";
import { InternationalSanctionsSection } from "./InternationalSanctionsSection";
import { NationalSanctionsSection } from "./NationalSanctionsSection";
import { KYCReport } from "@/types/app/reports";
import { useTranslations } from "next-intl";
import { PEPsSection } from "./PEPsSection";

type FullReportType = {
  virtualizedReport: KYCReport;
  expandedSections: {
    international: boolean;
    national: boolean;
    peps: boolean;
  };
};

export const FullReport = ({
  virtualizedReport,
  expandedSections,
}: FullReportType) => {
  const t = useTranslations("report.content");

  // Show sections only if ANY section is expanded
  const showAnySection =
    expandedSections.international ||
    expandedSections.national ||
    expandedSections.peps;

  if (!showAnySection) {
    return null;
  }

  return (
    <div className="space-y-4 animate-fade-up">
      {expandedSections.international && (
        <InternationalSanctionsSection
          title={t("verification-against-worldwide-lists")}
          data={virtualizedReport.sanctions_lists.international.lists}
          overall={virtualizedReport.sanctions_lists.international.overall}
        />
      )}

      {expandedSections.national && (
        <NationalSanctionsSection
          title={t("verification-on-national-lists")}
          data={virtualizedReport.sanctions_lists.national.lists}
          overall={virtualizedReport.sanctions_lists.national.overall}
        />
      )}

      {expandedSections.peps && virtualizedReport.peps_lists && (
        <PEPsSection
          title={t("identification-of-peps")}
          data={virtualizedReport.peps_lists.lists}
          overall={virtualizedReport.peps_lists.overall}
        />
      )}

      {/* Always show news media at the bottom if any section is expanded */}
      {/* <VerificationSection
        title={t("news-published-in-media")}
        result={virtualizedReport.news_media}
      >
        <p className="text-sm text-gray-600">{t("news-media-description")}</p>
      </VerificationSection> */}
    </div>
  );
};
