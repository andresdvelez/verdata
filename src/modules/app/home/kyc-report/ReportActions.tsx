import { addToast, Button, Card } from "@heroui/react";
import { useEntitlementsValidation } from "../../common/hooks/useEntitlementsValidation";
import { useTranslations } from "next-intl";
import { useSearchReportStore } from "@/modules/store/search-report-store";
import { downloadReportServerAction } from "@/actions/downloadReport";
import { useState } from "react";

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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { isFullReportAvailable } = useEntitlementsValidation();
  const t = useTranslations("report.content");
  const isReportLoading = useSearchReportStore((s) => s.isLoading);
  const token = useSearchReportStore((s) => s.token);

  const handleDownload = async () => {
    if (!isFullReportAvailable) {
      return addToast({
        title: t("you-dont-have-subscription"),
        description: t("get-subscription-to-get-full-report"),
      });
    }

    try {
      setIsLoading(true);
      const response = await downloadReportServerAction(reportId, token);

      const identityName = response.report?.relatedIdentityName || reportId;
      const sanitizedName = identityName.replace(/\s+/g, "-");
      const filename = `verdata-report-${sanitizedName}.pdf`;

      const uint8Array = new Uint8Array(response.data);
      const blob = new Blob([uint8Array], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      setIsLoading(false);
      addToast({
        title: t("saved-report"),
        description: t("report-saved-successfully"),
        color: "success",
      });
    } catch {
      setIsLoading(false);
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
          isDisabled={isReportLoading || !isFullReportAvailable}
          variant="solid"
          size="sm"
          className="flex items-center gap-2 bg-black text-white hover:bg-gray-800"
          onPress={handleDownload}
          isLoading={isLoading}
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
