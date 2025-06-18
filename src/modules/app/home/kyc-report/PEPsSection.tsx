import React from "react";
import { ListContainer } from "./ListContainer";
import { useTranslations } from "next-intl";
import { RestrictiveListResult } from "@/types/app/reports";

interface PEPsSectionProps {
  title: string;
  data: RestrictiveListResult[];
  overall: boolean;
}

export const PEPsSection: React.FC<PEPsSectionProps> = ({
  title,
  data,
  overall,
}) => {
  const t = useTranslations("report.content");
  const [isOpen, setIsOpen] = React.useState(overall);

  const matchCount = data.filter((item) => item.isMatch).length;
  const hasMatches = overall || matchCount > 0;

  return (
    <div
      className={`verify-section border rounded-lg overflow-hidden shadow-sm ${
        hasMatches ? "border-orange-200" : "border-gray-200"
      }`}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 flex items-center justify-between text-left transition-colors ${
          hasMatches
            ? "bg-orange-50 hover:bg-orange-100"
            : "bg-gray-50 hover:bg-gray-100"
        }`}
      >
        <div className="flex items-center">
          {hasMatches ? (
            <svg
              className="mr-2 text-orange-600 w-4 h-4"
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
                d="M12 2C12 2 16 6 16 12C16 18 12 22 12 22"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M12 2C12 2 8 6 8 12C8 18 12 22 12 22"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M2 12H22"
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
          <div className="text-sm">
            {matchCount > 0 && (
              <span className="text-orange-600 font-medium">
                {matchCount}{" "}
                {matchCount === 1 ? t("pep-match") : t("pep-matches")}
              </span>
            )}
          </div>
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

      {isOpen && (
        <div className="px-4 py-3 bg-white space-y-3">
          <p className="text-sm text-gray-600 mb-4">{t("peps-description")}</p>
          {data.map((list, index) => (
            <ListContainer
              key={`${list.listCode}-${index}`}
              list={list}
              type="pep"
            />
          ))}
        </div>
      )}
    </div>
  );
};
