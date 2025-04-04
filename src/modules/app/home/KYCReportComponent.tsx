"use client";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  cn,
  Spinner,
} from "@heroui/react";
import { useEffect, useState } from "react";
import { sampleKYCReport } from "../common/data/kycReportData";
import { IdentityCard } from "./kyc-report/IdentityCard";
import { useRouter } from "@/modules/translations/i18n/routing";
import { useTranslations } from "next-intl";
import { useEntitlementsValidation } from "../common/hooks/useEntitlementsValidation";
import { KYCReport } from "@/types/app/reports";
import { DetailedRightSection } from "./kyc-report/DetailedRightSection";
import { FullReport } from "./kyc-report/FullReport";
import { ReportActions } from "./kyc-report/ReportActions";

interface KYCReportComponentProps {
  report: KYCReport;
  className?: string;
}

export const KYCReportComponent: React.FC<KYCReportComponentProps> = ({
  report,
  className,
}) => {
  const [virtualizedReport, setVirtualizedReport] = useState<KYCReport>(report);
  const [showFullReport, setShowFullReport] = useState(false);
  const t = useTranslations("report.content");
  const router = useRouter();
  const { isFullReportAvailable, isLoading } = useEntitlementsValidation();

  useEffect(() => {
    if (!isFullReportAvailable) {
      setVirtualizedReport(sampleKYCReport);
    }
  }, [isFullReportAvailable, report]);

  return (
    <div className={cn("animate-fade-in", className)}>
      {/* Header */}
      <div className="mb-8 space-y-1">
        <Button
          onPress={() => router.back()}
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
          {t("go-back")}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column – Identity */}
        <div className="lg:col-span-1 space-y-6">
          <h1 className="text-3xl font-bold">
            {virtualizedReport.related_identity.name}
          </h1>
          <p className="text-gray-500">
            {t("report-date")}:{" "}
            {new Date(virtualizedReport.created_at).toLocaleDateString()}
          </p>

          <IdentityCard personInfo={virtualizedReport.related_identity} />

          <ReportActions
            showFullReport={showFullReport}
            setShowFullReport={setShowFullReport}
          />
        </div>

        {/* Right Column – Detailed Verification */}
        <div className="lg:col-span-2 space-y-6 relative">
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center">
              <Spinner className="self-center" />
            </div>
          ) : (
            <>
              {!isFullReportAvailable && (
                <Card className="flex flex-col items-center text-center absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm z-10">
                  <CardHeader className="text-4xl font-semibold justify-center">
                    {t("found-your-report")}
                  </CardHeader>
                  <CardBody className="text-xl font-semibold">
                    {t("not-subscribed-to-see-full-report")}
                  </CardBody>
                  <CardFooter className="flex justify-center">
                    <Button
                      onPress={() => router.push("/app/credits")}
                      className="bg-primary text-background"
                      variant="solid"
                      radius="sm"
                    >
                      {t("buy-more-credits")}
                    </Button>
                  </CardFooter>
                </Card>
              )}
              <DetailedRightSection virtualizedReport={virtualizedReport} />
            </>
          )}

          {/* Detailed Sections */}
          {showFullReport && (
            <FullReport virtualizedReport={virtualizedReport} />
          )}
        </div>
      </div>
    </div>
  );
};
