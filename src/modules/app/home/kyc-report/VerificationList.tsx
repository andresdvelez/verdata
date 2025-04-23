import { KYCReport } from "@/types/app/reports";
import { StatusBadge } from "./StatusBadge";
import { useTranslations } from "next-intl";
import { Button } from "@heroui/react";
import clsx from "clsx";

interface VerificationList {
  virtualizedReport: KYCReport;
  showFullReport: boolean;
  setShowFullReport: (value: boolean) => void;
}

export const VerificationList = ({
  virtualizedReport,
  showFullReport,
  setShowFullReport,
}: VerificationList) => {
  const t = useTranslations("report.content");

  const toggleFullReport = () => setShowFullReport(!showFullReport);

  const verificationItems = [
    {
      label: t("verification-against-worldwide-lists"),
      result: virtualizedReport.sanctions_lists.international?.overall,
    },
    {
      label: t("verification-on-national-lists"),
      result: virtualizedReport.sanctions_lists.national?.overall,
    },
  ];

  return (
    <div className="space-y-2">
      {verificationItems.map((item, index) => (
        <Button
          onPress={toggleFullReport}
          fullWidth
          variant="light"
          key={index}
          className="flex items-center justify-between hover:bg-gray-300 cursor-pointer"
        >
          <span className="text-sm">{item.label}:</span>
          <div className="flex items-center gap-3">
            <StatusBadge isMatch={item.result} size="sm" />
            <i
              className={clsx(
                "icon-[humbleicons--chevron-up] size-5 text-gray-500 transition-transform",
                {
                  "!rotate-180": showFullReport,
                }
              )}
              role="img"
              aria-hidden="true"
            />
          </div>
        </Button>
      ))}
    </div>
  );
};
