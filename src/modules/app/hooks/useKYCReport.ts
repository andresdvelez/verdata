import { useState } from "react";
import { KYCReport } from "@/types/app/reports";
import { useEntitlementsValidation } from "../common/hooks/useEntitlementsValidation";

interface UseKYCReportProps {
  initialReport: KYCReport;
}

interface UseKYCReportReturn {
  showFullReport: boolean;
  setShowFullReport: (value: boolean) => void;
  isLoading: boolean;
  isFullReportAvailable: boolean;
}

export const useKYCReport = ({}: UseKYCReportProps): UseKYCReportReturn => {
  const [showFullReport, setShowFullReport] = useState(false);

  const { isFullReportAvailable, isLoading } = useEntitlementsValidation();

  return {
    showFullReport,
    setShowFullReport,
    isLoading,
    isFullReportAvailable,
  };
};
