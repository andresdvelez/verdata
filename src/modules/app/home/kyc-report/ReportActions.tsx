import { addToast, Button, Card } from "@heroui/react";
import { useEntitlementsValidation } from "../../common/hooks/useEntitlementsValidation";
import { useTranslations } from "next-intl";
import { useSearchReportStore } from "@/modules/store/search-report-store";

interface ReportActionsProps {
  showFullReport: boolean;
  setShowFullReport: (value: boolean) => void;
  reportId: string;
}

export const ReportActions: React.FC<ReportActionsProps> = ({
  showFullReport,
  setShowFullReport,
  reportId,
}) => {
  const { isFullReportAvailable } = useEntitlementsValidation();
  const t = useTranslations("report.content");
  const downloadReport = useSearchReportStore((s) => s.downloadReport);
  const isLoading = useSearchReportStore((s) => s.isLoading);

  const handleDownload = async () => {
    if (!isFullReportAvailable) {
      return addToast({
        title: t("you-dont-have-subscription"),
        description: t("get-subscription-to-get-full-report"),
      });
    }

    try {
      await downloadReport(reportId);
      addToast({
        title: t("saved-report"),
        description: t("report-saved-successfully"),
        color: "success",
      });
    } catch {
      addToast({
        title: t("download-error"),
        description: t("could-not-download-report"),
        color: "danger",
      });
    }
  };

  const toggleFullReport = () => setShowFullReport(!showFullReport);

  return (
    <Card className="overflow-hidden" shadow="sm">
      <div className="flex justify-between items-center p-4 border-b">
        <Button
          isDisabled={!isFullReportAvailable}
          variant="ghost"
          size="sm"
          className="flex items-center gap-2"
          onPress={toggleFullReport}
        >
          {t("see-full-report")}
        </Button>
        <Button
          isDisabled={isLoading || !isFullReportAvailable}
          variant="solid"
          size="sm"
          className="flex items-center gap-2 bg-black text-white hover:bg-gray-800"
          onPress={handleDownload}
        >
          <i
            className="icon-[material-symbols--download] size-4"
            role="img"
            aria-hidden="true"
          />
          {t("save")}
        </Button>
      </div>
    </Card>
  );
};
