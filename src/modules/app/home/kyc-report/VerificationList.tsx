import { KYCReport } from "@/types/app/reports";
import { StatusBadge } from "./StatusBadge";
import { useTranslations } from "next-intl";
import { Button } from "@heroui/react";
import clsx from "clsx";

interface VerificationList {
  virtualizedReport: KYCReport;
  expandedSections: {
    international: boolean;
    national: boolean;
    peps: boolean;
  };
  toggleSection: (section: "international" | "national" | "peps") => void;
}

export const VerificationList = ({
  virtualizedReport,
  expandedSections,
  toggleSection,
}: VerificationList) => {
  const t = useTranslations("report.content");

  const verificationItems: {
    key: string;
    label: string;
    result: boolean;
    type: "sanction" | "pep";
  }[] = [
    {
      key: "international",
      label: t("verification-against-worldwide-lists"),
      result: virtualizedReport.sanctions_lists.international?.overall,
      type: "sanction" as const,
    },
    {
      key: "national",
      label: t("verification-on-national-lists"),
      result: virtualizedReport.sanctions_lists.national?.overall,
      type: "sanction" as const,
    },
  ];

  // Add PEPs if data exists
  if (virtualizedReport.peps_lists) {
    verificationItems.push({
      key: "peps",
      label: t("identification-of-peps"),
      result:
        virtualizedReport.peps_lists?.overall ||
        virtualizedReport.peps_verification,
      type: "pep" as const,
    });
  }

  return (
    <div className="space-y-2">
      {verificationItems.map((item) => (
        <Button
          onPress={() =>
            toggleSection(item.key as "international" | "national" | "peps")
          }
          fullWidth
          variant="light"
          key={item.key}
          className="flex items-center justify-between hover:bg-gray-300 cursor-pointer"
        >
          <span className="text-sm">{item.label}:</span>
          <div className="flex items-center gap-3">
            <StatusBadge isMatch={item.result} size="sm" />
            <i
              className={clsx(
                "icon-[humbleicons--chevron-up] size-5 text-gray-500 transition-transform",
                {
                  "!rotate-180":
                    expandedSections[item.key as keyof typeof expandedSections],
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
