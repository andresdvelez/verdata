import { useState, useEffect } from "react";
import { KYCReport } from "@/types/app/reports";
import { sampleKYCReport } from "../common/data/kycReportData";
import { useEntitlementsValidation } from "../common/hooks/useEntitlementsValidation";

interface UseKYCReportProps {
  initialReport: KYCReport;
}

interface UseKYCReportReturn {
  report: KYCReport;
  showFullReport: boolean;
  setShowFullReport: (value: boolean) => void;
  isLoading: boolean;
  isFullReportAvailable: boolean;
}

export const useKYCReport = ({
  initialReport,
}: UseKYCReportProps): UseKYCReportReturn => {
  const [report, setReport] = useState<KYCReport>(sampleKYCReport);
  const [showFullReport, setShowFullReport] = useState(false);

  const { isFullReportAvailable, isLoading } = useEntitlementsValidation();

  useEffect(() => {
    if (isFullReportAvailable) {
      setReport(initialReport);
    }
  }, [isFullReportAvailable, initialReport]);

  return {
    report,
    showFullReport,
    setShowFullReport,
    isLoading,
    isFullReportAvailable,
  };
};
