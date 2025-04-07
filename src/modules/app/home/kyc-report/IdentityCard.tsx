import { cn } from "@heroui/react";
import { SearchedIdentities } from "@prisma/client";
import { useTranslations } from "next-intl";

interface IdentityCardProps {
  personInfo: SearchedIdentities;
  className?: string;
}

export const IdentityCard: React.FC<IdentityCardProps> = ({
  personInfo,
  className,
}) => {
  const t = useTranslations("report.content");

  const identityFields = [
    { label: t("name"), value: personInfo.name },
    { label: t("document-number"), value: personInfo.document },
    { label: t("nationality"), value: personInfo.nationality },
    { label: t("document-type"), value: personInfo.document_type },
  ];

  return (
    <div
      className={cn(
        "glass-card py-6 rounded-lg space-y-4 animate-fade-in",
        className
      )}
    >
      <div className="space-y-1">
        <h2 className="text-2xl font-bold">{t("identity-verification")}</h2>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-3">
        {identityFields.map((field, index) => (
          <div key={index} className="space-y-1">
            <p className="text-sm text-gray-500">{field.label}:</p>
            <p className="font-medium">{field.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
