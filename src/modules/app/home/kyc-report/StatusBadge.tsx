import React from "react";
import { cn } from "@heroui/react";
import { useTranslations } from "next-intl";

interface StatusBadgeProps {
  result: boolean;
  className?: string;
  showIcon?: boolean;
  size?: "sm" | "md" | "lg";
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  result,
  className,
  showIcon = true,
  size = "md",
}) => {
  const t = useTranslations("report.content");
  const isMatch = result === true;
  const sizeClasses = {
    sm: "text-xs py-0.5 px-2",
    md: "text-sm py-1 px-2.5",
    lg: "text-base py-1.5 px-3",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium transition-colors",
        isMatch
          ? "bg-red-50 text-red-600 border border-red-200"
          : "bg-green-50 text-green-600 border border-green-200",
        sizeClasses[size],
        className
      )}
    >
      {showIcon && (
        <>
          {isMatch ? (
            <i
              className="icon-[jam--alert] mr-1.5 size-4"
              role="img"
              aria-hidden="true"
            />
          ) : (
            <i
              className="icon-[material-symbols--check-circle-outline-rounded] mr-1.5 size-4"
              role="img"
              aria-hidden="true"
            />
          )}
        </>
      )}
      <span className="capitalize">
        {isMatch ? t("matches") : t("no-matches")}
      </span>
    </span>
  );
};
