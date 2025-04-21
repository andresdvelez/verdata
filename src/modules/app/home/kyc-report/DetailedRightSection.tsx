import { Card, Divider, cn } from "@heroui/react";
import { KYCReport } from "@/types/app/reports";
import { useTranslations } from "next-intl";
import { StatusBadge } from "./StatusBadge";
import { RiskScoreDisplay } from "./RiskScoreDisplay";
import { VerificationList } from "./VerificationList";

type DetailedRightSectionProps = {
  virtualizedReport: KYCReport;
  isBlurred?: boolean;
};

export const DetailedRightSection = ({
  virtualizedReport,
  isBlurred = false,
}: DetailedRightSectionProps) => {
  const t = useTranslations("report.content");

  return (
    <Card shadow="sm" className={cn("p-5", isBlurred && "blur-sm")}>
      <div className="flex flex-col md:flex-row justify-between items-start">
        <div className="space-y-3">
          <h2 className="text-lg font-medium">{t("detailed")}</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">
              {t("identity-verification")}:
            </span>
            <StatusBadge isMatch={virtualizedReport.is_identity_matched} />
          </div>
        </div>
        <RiskScoreDisplay riskScore={virtualizedReport.risk_score} />
      </div>

      <Divider className="my-4" />

      <VerificationList virtualizedReport={virtualizedReport} />
    </Card>
  );
};
