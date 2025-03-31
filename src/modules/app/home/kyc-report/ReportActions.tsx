import { addToast, Button, Card } from "@heroui/react";
import React, { Dispatch, SetStateAction } from "react";
import { useEntitlementsValidation } from "../../common/hooks/useEntitlementsValidation";
import { useTranslations } from "next-intl";

export const ReportActions = ({
  showFullReport,
  setShowFullReport,
}: {
  showFullReport: boolean;
  setShowFullReport: Dispatch<SetStateAction<boolean>>;
}) => {
  const { isFullReportAvailable } = useEntitlementsValidation();
  const t = useTranslations("report.content");

  const handleSaveReport = () => {
    if (!isFullReportAvailable)
      return addToast({
        title: t("you-dont-have-subscription"),
        description: t("get-subscription-to-get-full-report"),
      });
    addToast({
      title: t("saved-report"),
      description: t("report-saved-successfully"),
    });
  };

  return (
    <Card className="overflow-hidden" shadow="sm">
      <div className="flex justify-between items-center p-4 border-b">
        <Button
          isDisabled={!isFullReportAvailable}
          variant="ghost"
          size="sm"
          className="flex items-center gap-2"
          onPress={() => setShowFullReport(!showFullReport)}
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
