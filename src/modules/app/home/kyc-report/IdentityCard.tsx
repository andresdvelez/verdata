import { cn, Spinner } from "@heroui/react";
import { SearchedIdentities } from "@prisma/client";
import { useTranslations } from "next-intl";
import { useEntitlementsValidation } from "../../common/hooks/useEntitlementsValidation";

interface IdentityCardProps {
  personInfo: SearchedIdentities;
  className?: string;
}

export const IdentityCard: React.FC<IdentityCardProps> = ({
  personInfo,
  className,
}) => {
  const t = useTranslations("report.content");

  const { isLoading } = useEntitlementsValidation();

  return (
    <div
      className={cn(
        "glass-card py-6 rounded-lg space-y-4 animate-fade-in",
        className
      )}
    >
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <Spinner className="self-center" />
        </div>
      ) : (
        <>
          {" "}
          <div className="space-y-1">
            <h2 className="text-2xl font-bold">{t("identity-verification")}</h2>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3">
            <div className="space-y-1">
              <p className="text-sm text-gray-500">{t("name")}:</p>
              <p className="font-medium">{personInfo.name}</p>
            </div>

            <div className="space-y-1">
              <p className="text-sm text-gray-500">{t("document-number")}:</p>
              <p className="font-medium">{personInfo.document}</p>
            </div>

            <div className="space-y-1">
              <p className="text-sm text-gray-500">{t("nationality")}:</p>
              <p className="font-medium">{personInfo.nationality}</p>
            </div>

            <div className="space-y-1">
              <p className="text-sm text-gray-500">{t("document-type")}:</p>
              <p className="font-medium">{personInfo.document_type}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
