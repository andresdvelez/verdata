import { useState, useEffect } from "react";
import { KYCReport } from "@/types/app/reports";

interface UseKYCReportProps {
  initialReport: KYCReport;
}

interface UseKYCReportReturn {
  isLoading: boolean;
  isFullReportAvailable: boolean;
  expandedSections: {
    international: boolean;
    national: boolean;
    peps: boolean;
  };
  toggleSection: (section: "international" | "national" | "peps") => void;
  setAllSections: (value: boolean) => void;
}

export const useKYCReport = ({
  initialReport,
}: UseKYCReportProps): UseKYCReportReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFullReportAvailable, setIsFullReportAvailable] = useState(true);

  const [expandedSections, setExpandedSections] = useState({
    international: false,
    national: false,
    peps: false,
  });

  useEffect(() => {
    // Check if user has access to full report
    // This could be based on subscription status, credits, etc.
    const checkReportAccess = async () => {
      setIsLoading(true);
      try {
        // Add your logic here to check if the user has access
        // For now, we'll assume they have access if the report has real data
        setIsFullReportAvailable(initialReport.isRealData !== false);
      } catch (error) {
        console.error("Error checking report access:", error);
        setIsFullReportAvailable(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkReportAccess();
  }, [initialReport]);

  const toggleSection = (section: "international" | "national" | "peps") => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const setAllSections = (value: boolean) => {
    setExpandedSections({
      international: value,
      national: value,
      peps: value,
    });
  };

  return {
    isLoading,
    isFullReportAvailable,
    expandedSections,
    toggleSection,
    setAllSections,
  };
};
