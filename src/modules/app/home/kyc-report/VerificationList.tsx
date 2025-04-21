import { KYCReport } from "@/types/app/reports";
import { StatusBadge } from "./StatusBadge";
import { useTranslations } from "next-intl";

export const VerificationList = ({
  virtualizedReport,
}: {
  virtualizedReport: KYCReport;
}) => {
  const t = useTranslations("report.content");

  const verificationItems = [
    {
      label: t("verification-against-350-lists"),
      result: virtualizedReport.sanctions_lists.international?.overall,
    },
    {
      label: t("verification-on-413-latam-lists"),
      result: virtualizedReport.sanctions_lists.national?.overall,
    },
  ];

  return (
    <div className="space-y-2">
      {verificationItems.map((item, index) => (
        <div key={index} className="flex items-center justify-between">
          <span className="text-sm">{item.label}:</span>
          <StatusBadge isMatch={item.result} size="sm" />
        </div>
      ))}
    </div>
  );
};
