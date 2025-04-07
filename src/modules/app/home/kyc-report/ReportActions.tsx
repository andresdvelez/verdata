import { addToast, Button, Card } from "@heroui/react";
import { useEntitlementsValidation } from "../../common/hooks/useEntitlementsValidation";
import { useTranslations } from "next-intl";

interface ReportActionsProps {
  showFullReport: boolean;
  setShowFullReport: (value: boolean) => void;
}

export const ReportActions: React.FC<ReportActionsProps> = ({
  showFullReport,
  setShowFullReport,
}) => {
  const { isFullReportAvailable } = useEntitlementsValidation();
  const t = useTranslations("report.content");

  const handleSaveReport = () => {
    if (!isFullReportAvailable) {
      return addToast({
        title: t("you-dont-have-subscription"),
        description: t("get-subscription-to-get-full-report"),
      });
    }

    addToast({
      title: t("saved-report"),
      description: t("report-saved-successfully"),
    });
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
          variant="solid"
          size="sm"
          className="flex items-center gap-2 bg-black text-white hover:bg-gray-800"
          onPress={handleSaveReport}
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
