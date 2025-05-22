"use client";

import { Button, cn } from "@heroui/react";
import { useRouter } from "@/modules/translations/i18n/routing";
import { useTranslations } from "next-intl";
import { KYCReport } from "@/types/app/reports";

// Custom hook
import { useKYCReport } from "../hooks/useKYCReport";

// Components
import { IdentityCard } from "./kyc-report/IdentityCard";
import { DetailedRightSection } from "./kyc-report/DetailedRightSection";
import { FullReport } from "./kyc-report/FullReport";
import { ReportActions } from "./kyc-report/ReportActions";
import { KYCReportSkeleton } from "./kyc-report/KYCReportSkeleton";
import { SubscriptionOverlay } from "./kyc-report/SubscriptionOverlay";

interface KYCReportComponentProps {
  report: KYCReport;
  className?: string;
}

export const KYCReportComponent: React.FC<KYCReportComponentProps> = ({
  report,
  className,
}) => {
  const {
    showFullReport,
    setShowFullReport,
    isLoading,
    isFullReportAvailable,
  } = useKYCReport({ initialReport: report });

  const t = useTranslations("report.content");
  const router = useRouter();

  // Early return for loading state
  if (isLoading) {
    return <KYCReportSkeleton />;
  }

  return (
    <div className={cn("animate-fade-in", className)}>
      {/* Header */}
      <div className="mb-8 space-y-1">
        <BackButton onBack={() => router.back()} label={t("go-back")} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
        {/* Left Column – Identity */}
        <div className="lg:col-span-1 space-y-6 sticky left-0 top-0 h-max">
          <h1 className="text-3xl font-bold">{report.related_identity.name}</h1>
          <p className="text-gray-500">
            {t("report-date")}:{" "}
            {new Date(report.created_at).toLocaleDateString()}
          </p>

          <IdentityCard personInfo={report.related_identity} />

          <ReportActions
            showFullReport={showFullReport}
            setShowFullReport={setShowFullReport}
            reportId={report.id}
          />
        </div>

        {/* Right Column – Detailed Verification */}
        <div className="lg:col-span-2 space-y-6 relative">
          {!isFullReportAvailable && (
            <SubscriptionOverlay
              onBuyCredits={() => router.push("/app/credits")}
            />
          )}

          <DetailedRightSection
            showFullReport={showFullReport}
            setShowFullReport={setShowFullReport}
            virtualizedReport={report}
            isBlurred={!isFullReportAvailable}
          />

          {/* Detailed Sections */}
          {showFullReport && <FullReport virtualizedReport={report} />}
        </div>
      </div>
    </div>
  );
};

// Extracted BackButton component
const BackButton = ({
  onBack,
  label,
}: {
  onBack: () => void;
  label: string;
}) => (
  <Button
    onPress={onBack}
    className="flex items-center gap-2 text-sm text-gray-500 mb-12 hover:text-black transition-colors group w-fit"
    variant="light"
    startContent={
      <i
        className="icon-[bx--left-arrow-alt] size-4 group-hover:-translate-x-1 transition-transform"
        role="img"
        aria-hidden="true"
      />
    }
  >
    {label}
  </Button>
);
