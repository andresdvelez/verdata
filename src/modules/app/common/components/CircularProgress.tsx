import { cn } from "@heroui/react";
import { ReactNode, useEffect, useState } from "react";

interface CircularProgressProps {
  value: number;
  maxValue?: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  trailColor?: string;
  valueDisplay?: ReactNode;
  className?: string;
  valueClassName?: string;
  valueSuffix?: string;
  animationDelay?: number;
}

export function CircularProgress({
  value,
  maxValue = 100,
  size = 100,
  strokeWidth = 8,
  color = "white",
  trailColor = "rgba(255, 255, 255, 0.2)",
  valueDisplay,
  className,
  valueClassName,
  valueSuffix = "",
  animationDelay = 0,
}: CircularProgressProps) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const normalizedValue = Math.min(Math.max(value, 0), maxValue);
  const percentage = (normalizedValue / maxValue) * 100;

  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  useEffect(() => {
    const initialOffset = circumference;
    const finalOffset = offset;

    document.documentElement.style.setProperty(
      "--offset-initial",
      `${initialOffset}px`
    );
    document.documentElement.style.setProperty(
      "--offset-final",
      `${finalOffset}px`
    );

    const timer = setTimeout(() => {
      setIsInView(true);

      const duration = 1500;
      const startTime = performance.now();

      const animateValue = (timestamp: number) => {
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentValue = Math.round(progress * normalizedValue);

        setAnimatedValue(currentValue);

        if (progress < 1) {
          requestAnimationFrame(animateValue);
        }
      };

      requestAnimationFrame(animateValue);
    }, animationDelay);

    return () => clearTimeout(timer);
  }, [normalizedValue, circumference, offset, animationDelay]);

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center",
        className
      )}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className={cn(
          "transform -rotate-90",
          isInView ? "animate-circle-progress" : ""
        )}
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={trailColor}
          strokeWidth={strokeWidth}
        />

        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={isInView ? offset : circumference}
          strokeLinecap="round"
          style={{
            transition: isInView ? "stroke-dashoffset 1.5s ease-out" : "none",
          }}
        />
      </svg>

      {/* Center text */}
      <div
        className={cn(
          "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-medium",
          valueClassName
        )}
      >
        {valueDisplay || `${animatedValue}${valueSuffix}`}
      </div>
    </div>
  );
}
