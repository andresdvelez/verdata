import { Card, Divider, Image } from "@heroui/react";
import React from "react";
import { StatusBadge } from "./StatusBadge";
import { KYCReport } from "@/types/app/reports";
import { CircularProgress } from "../../common/components/CircularProgress";
import { useTranslations } from "next-intl";
import { useEntitlementsValidation } from "../../common/hooks/useEntitlementsValidation";

type DetailedRightSectionType = {
  virtualizedReport: KYCReport;
};

export const DetailedRightSection = ({
  virtualizedReport,
}: DetailedRightSectionType) => {
  const t = useTranslations("report.content");

  const { isFullReportAvailable } = useEntitlementsValidation();

  const getColor = () => {
    if (virtualizedReport.risk_score >= 80) return "#10b981"; // green
    if (virtualizedReport.risk_score >= 50) return "#f59e0b"; // yellow
    return "#ef4444"; // red
  };

  return (
    <Card
      shadow="sm"
      className={`p-5 ${isFullReportAvailable ? "" : "blur-sm"}`}
    >
      <div className="flex justify-between items-start">
        <div className="space-y-3">
          <h2 className="text-lg font-medium">{t("detailed")}</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">
              {t("identity-verification")}:
            </span>
            <StatusBadge result={virtualizedReport.is_identity_matched} />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-center mb-2">
            <div className="flex items-center justify-center gap-1">
              <Image
                src="/brand/logotype.png"
                alt="Verdata logotipo"
                classNames={{
                  wrapper: "size-8 2xl:size-[38px]",
                }}
              />
              <span className="text-sm font-medium">{t("score")}</span>
              <i
                className="icon-[majesticons--alert-circle] text-gray-400"
                role="img"
                aria-hidden="true"
              />
            </div>
            <p className="text-sm text-gray-600">{t("risk-by-verdata")}</p>
          </div>
          <CircularProgress
            value={virtualizedReport.risk_score}
            size={140}
            strokeWidth={8}
            color={getColor()}
            trailColor="#e5e7eb"
            valueSuffix="%"
            className="my-2"
            valueClassName="text-2xl font-bold"
            animationDelay={300}
          />
          <p className="text-xs text-gray-500 mt-2">
            {t("profile-matches")} {virtualizedReport.risk_score}%
          </p>
        </div>
      </div>

      <Divider className="my-4" />

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm">
            {t("verification-against-international-lists")}:
          </span>
          <StatusBadge
            result={virtualizedReport.sanctions_lists.international.overall}
            size="sm"
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">
            {t("verification-against-national-lists")}:
          </span>
          <StatusBadge
            result={virtualizedReport.sanctions_lists.national.overall}
            size="sm"
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">{t("criminal-records")}:</span>
          <StatusBadge result={virtualizedReport.criminal_records} size="sm" />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">{t("peps-verification")}:</span>
          <StatusBadge result={virtualizedReport.peps_verification} size="sm" />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">{t("news-media")}:</span>
          <StatusBadge result={virtualizedReport.news_media} size="sm" />
        </div>
      </div>
    </Card>
  );
};
