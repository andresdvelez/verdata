import React from "react";
import { VerificationSection } from "./VerifictionSection";
import { InternationalSanctionsSection } from "./InternationalSanctionsSection";
import { NationalSanctionsSection } from "./NationalSanctionsSection";
import { KYCReport } from "@/types/app/reports";
import { useTranslations } from "next-intl";

type FullReportType = {
  virtualizedReport: KYCReport;
};

export const FullReport = ({ virtualizedReport }: FullReportType) => {
  const t = useTranslations("report.content");

  return (
    <div className="space-y-4 animate-fade-up">
      <VerificationSection
        title={t("identity-verification")}
        result={virtualizedReport.is_identity_matched}
        defaultOpen
      >
        <p className="text-sm text-gray-600">
          {t("identity-verified-against-official-records")}
        </p>
      </VerificationSection>

      <InternationalSanctionsSection
        title={t("international-sanctions")}
        internationalData={
          virtualizedReport.sanctions_lists.international.lists
        }
        overallResult={virtualizedReport.sanctions_lists.international.overall}
      />

      <NationalSanctionsSection
        title={t("national-sanctions")}
        nationalData={virtualizedReport.sanctions_lists.national.lists}
        overallResult={virtualizedReport.sanctions_lists.national.overall}
      />

      <VerificationSection
        title={t("criminal-records")}
        result={virtualizedReport.criminal_records}
      >
        <p className="text-sm text-gray-600">
          {t("criminal-records-description")}
        </p>
      </VerificationSection>

      <VerificationSection
        title={t("peps-verification")}
        result={virtualizedReport.peps_verification}
      >
        <p className="text-sm text-gray-600">{t("peps-description")}</p>
      </VerificationSection>

      <VerificationSection
        title={t("news-media")}
        result={virtualizedReport.news_media}
      >
        <p className="text-sm text-gray-600">{t("news-media-description")}</p>
      </VerificationSection>
    </div>
  );
};
