import React, { useState } from "react";
import { cn } from "@heroui/react";
import { StatusBadge } from "./StatusBadge";

interface VerificationSectionProps {
  title: string;
  description?: string;
  result: boolean;
  children?: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export const VerificationSection: React.FC<VerificationSectionProps> = ({
  title,
  description,
  result,
  children,
  defaultOpen = false,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const hasIssue = result === true;
  return (
    <div
      className={cn(
        "verify-section border rounded-lg overflow-hidden shadow-sm animate-fade-up",
        hasIssue ? "border-red-200" : "border-gray-200",
        className
      )}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full px-4 py-3 flex items-center justify-between text-left transition-colors",
          hasIssue
            ? "bg-red-50 hover:bg-red-100"
            : "bg-gray-50 hover:bg-gray-100"
        )}
      >
        <div className="flex items-center">
          {hasIssue ? (
            <i
              className="icon-[majesticons--alert-circle] mr-2 text-red-600 size-4"
              role="img"
              aria-hidden="true"
            />
          ) : (
            <i
              className="icon-[material-symbols--check-circle-outline-rounded] mr-2 text-green-600 size-4"
              role="img"
              aria-hidden="true"
            />
          )}
          <span className="font-medium">{title}</span>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge result={result} showIcon={false} />
          {isOpen ? (
            <i
              className="icon-[humbleicons--chevron-up] size-5 text-gray-500"
              role="img"
              aria-hidden="true"
            />
          ) : (
            <i
              className="icon-[humbleicons--chevron-down] size-5 text-gray-500"
              role="img"
              aria-hidden="true"
            />
          )}
        </div>
      </button>

      {isOpen && children && (
        <div className="px-4 py-3 bg-white">
          {description && (
            <p className="text-sm text-gray-600 mb-3">{description}</p>
          )}
          {children}
        </div>
      )}
    </div>
  );
};
