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
    {
      label: t("criminal-records"),
      result: virtualizedReport.criminal_records,
    },
    {
      label: t("identification-of-peps"),
      result: virtualizedReport.peps_verification,
    },
    {
      label: t("news-published-in-media"),
      result: virtualizedReport.news_media,
    },
  ];

  return (
    <div className="space-y-2">
      {verificationItems.map((item, index) => (
        <div key={index} className="flex items-center justify-between">
          <span className="text-sm">{item.label}:</span>
          <StatusBadge result={item.result} size="sm" />
        </div>
      ))}
    </div>
  );
};
