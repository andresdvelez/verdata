import { ReactNode } from "react";
import { CircularProgress } from "../../common/components/CircularProgress";
import { NumberTicker } from "../../common/components/NumberTicker";
import { statsCardsColors } from "../../utils/statsCardsColors";

interface StatCardProps {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  value: number;
  maxValue?: number;
  showProgress?: boolean;
  action?: {
    text: string;
    onClick: () => void;
  };
  variant: "purple" | "lime" | "white";
  progressSuffix?: string;
  animationDelay?: number;
  rightIcon?: ReactNode;
}

export function StatCard({
  icon,
  title,
  subtitle,
  value,
  maxValue = 100,
  showProgress = true,
  action,
  variant = "purple",
  progressSuffix = "",
  animationDelay = 0,
  rightIcon,
}: StatCardProps) {
  // Format value display for special cases like fractions
  const formatProgressValue = () => {
    return (
      <span className="whitespace-nowrap">
        <NumberTicker
          value={value}
          delay={animationDelay}
          className={`text-2xl font-semibold ${statsCardsColors[variant].text}`}
        />
        {progressSuffix}
      </span>
    );
  };

  return (
    <div
      className={`stat-card p-8 overflow-hidden rounded-md ${statsCardsColors[variant].bg} ${statsCardsColors[variant].text} shadow-sm animate-fade-in-up`}
      style={{ animationDelay: `${animationDelay * 0.5}s` }}
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-between flex-col md:flex-row gap-4 items-center md:items-start">
          {/* Left side - Title and description */}
          <div className="flex flex-col items-start max-w-xs justify-between">
            <div>
              {/* Icon if provided */}
              {icon && <div className="mb-2">{icon}</div>}

              {/* Title */}
              <h3 className="text-2xl font-medium mb-1">{title}</h3>
            </div>
            {/* Action button */}
            {action && (
              <div className="">
                <button
                  onClick={action.onClick}
                  className={`${statsCardsColors[variant].actionClass} text-sm font-medium transition-colors duration-200`}
                >
                  {action.text}
                </button>
              </div>
            )}
          </div>

          {/* Right side - Progress circle */}
          {showProgress && (
            <div className="md:ml-auto flex flex-col items-center gap-4">
              <CircularProgress
                value={value}
                maxValue={maxValue}
                size={100}
                strokeWidth={14}
                color={statsCardsColors[variant].progress}
                trailColor={statsCardsColors[variant].trail}
                valueDisplay={formatProgressValue()}
                animationDelay={animationDelay}
              />
              {/* Subtitle */}
              {subtitle && (
                <p className="text-sm text-center opacity-85 max-w-[280px]">
                  {subtitle}
                </p>
              )}
            </div>
          )}

          {/* Icon only, no progress */}
          {rightIcon && <div className="md:ml-auto">{rightIcon}</div>}
        </div>
      </div>
    </div>
  );
}
