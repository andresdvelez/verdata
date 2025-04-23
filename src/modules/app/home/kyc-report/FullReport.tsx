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
      <InternationalSanctionsSection
        title={t("verification-against-worldwide-lists")}
        data={virtualizedReport.sanctions_lists.international.lists}
        overall={virtualizedReport.sanctions_lists.international.overall}
      />

      <NationalSanctionsSection
        title={t("verification-on-national-lists")}
        data={virtualizedReport.sanctions_lists.national.lists}
        overall={virtualizedReport.sanctions_lists.national.overall}
      />

      <VerificationSection
        title={t("identification-of-peps")}
        result={virtualizedReport.peps_verification}
      >
        <p className="text-sm text-gray-600">{t("peps-description")}</p>
      </VerificationSection>

      <VerificationSection
        title={t("news-published-in-media")}
        result={virtualizedReport.news_media}
      >
        <p className="text-sm text-gray-600">{t("news-media-description")}</p>
      </VerificationSection>
    </div>
  );
};
