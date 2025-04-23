import React, { useState } from "react";
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
  result,
  children,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen || result === true);
  const hasIssue = result === true;

  return (
    <div
      className={`verify-section border rounded-lg overflow-hidden shadow-sm ${
        hasIssue ? "border-red-200" : "border-gray-200"
      }`}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 flex items-center justify-between text-left transition-colors ${
          hasIssue
            ? "bg-red-50 hover:bg-red-100"
            : "bg-gray-50 hover:bg-gray-100"
        }`}
      >
        <div className="flex items-center">
          {hasIssue ? (
            <svg
              className="mr-2 text-red-600 w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M12 8V12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M12 16V16.01"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg
              className="mr-2 text-green-600 w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M8 12L11 15L16 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
          <span className="font-medium">{title}</span>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge isMatch={result} showIcon={false} />
          {isOpen ? (
            <svg
              className="w-5 h-5 text-gray-500"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 15L12 9L6 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5 text-gray-500"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </button>

      {isOpen && children && (
        <div className="px-4 py-3 bg-white">{children}</div>
      )}
    </div>
  );
};
