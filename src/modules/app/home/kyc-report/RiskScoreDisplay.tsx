import { Image } from "@heroui/react";
import { CircularProgress } from "../../common/components/CircularProgress";
import { useTranslations } from "next-intl";

export const RiskScoreDisplay = ({ riskScore }: { riskScore: number }) => {
  const t = useTranslations("report.content");

  const getColor = () => {
    if (riskScore >= 80) return "#10b981"; // green
    if (riskScore >= 50) return "#f59e0b"; // yellow
    return "#ef4444"; // red
  };

  return (
    <div className="flex flex-col items-center">
      <div className="text-center">
        <div className="flex items-center justify-center gap-1">
          <Image
            src="/brand/logotype.png"
            alt="Verdata logotipo"
            classNames={{
              wrapper: "size-8 2xl:size-[38px]",
            }}
          />
          <span className="text-sm font-medium">{t("score")}</span>
          <i
            className="icon-[majesticons--alert-circle] text-gray-400"
            role="img"
            aria-hidden="true"
          />
        </div>
        <p className="text-sm text-gray-600">{t("risk-by-verdata")}</p>
      </div>

      <CircularProgress
        value={riskScore}
        size={140}
        strokeWidth={8}
        color={getColor()}
        trailColor="#e5e7eb"
        valueSuffix="%"
        className="my-2"
        valueClassName="text-2xl font-bold"
        animationDelay={300}
      />
      <p className="text-xs text-gray-500 mt-2">
        {t("profile-matches")} {riskScore}%
      </p>
    </div>
  );
};
