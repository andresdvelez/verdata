"use client";

import { Button, cn } from "@heroui/react";
import { useRouter } from "@/modules/translations/i18n/routing";
import { useTranslations } from "next-intl";
import { KYCReport } from "@/types/app/reports";
import { useState } from "react";

// Components
import { IdentityCard } from "./kyc-report/IdentityCard";
import { DetailedRightSection } from "./kyc-report/DetailedRightSection";
import { FullReport } from "./kyc-report/FullReport";
import { ReportActions } from "./kyc-report/ReportActions";
import { KYCReportSkeleton } from "./kyc-report/KYCReportSkeleton";
import { SubscriptionOverlay } from "./kyc-report/SubscriptionOverlay";
import { useSearchReportStore } from "@/modules/store/search-report-store";

interface KYCReportComponentProps {
  report: KYCReport;
  className?: string;
}

export const KYCReportComponent: React.FC<KYCReportComponentProps> = ({
  report,
  className,
}) => {
  const setIsEmpty = useSearchReportStore((state) => state.setIsEmpty);

  // State for expanded sections
  const [expandedSections, setExpandedSections] = useState({
    international: false,
    national: false,
    peps: false,
  });

  const [isLoading] = useState(false);
  const [isFullReportAvailable] = useState(report.isRealData !== false);

  const t = useTranslations("report.content");
  const router = useRouter();

  const toggleSection = (section: "international" | "national" | "peps") => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleAllSections = () => {
    const anyExpanded =
      expandedSections.international ||
      expandedSections.national ||
      expandedSections.peps;
    setExpandedSections({
      international: !anyExpanded,
      national: !anyExpanded,
      peps: !anyExpanded && !!report.peps_lists,
    });
  };

  // Check if any section is expanded
  const showFullReport =
    expandedSections.international ||
    expandedSections.national ||
    expandedSections.peps;

  // Early return for loading state
  if (isLoading) {
    return <KYCReportSkeleton />;
  }

  const handleGoBack = () => {
    setIsEmpty(true);
    router.back();
  };

  return (
    <div className={cn("animate-fade-in", className)}>
      {/* Header */}
      <div className="mb-8 space-y-1">
        <BackButton onBack={handleGoBack} label={t("go-back")} />
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
            setShowFullReport={toggleAllSections}
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
            expandedSections={expandedSections}
            toggleSection={toggleSection}
            virtualizedReport={report}
            isBlurred={!isFullReportAvailable}
          />

          {/* Detailed Sections */}
          {showFullReport && (
            <FullReport
              virtualizedReport={report}
              expandedSections={expandedSections}
            />
          )}
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
