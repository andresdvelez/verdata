import React, { useState } from "react";
import { StatusBadge } from "./StatusBadge";
import { ListItem } from "./ListItem";
import { useTranslations } from "next-intl";
import { RestrictiveListResult } from "@/types/app/reports";
import { Image } from "@heroui/react";

interface ListContainerProps {
  list: RestrictiveListResult;
  type?: "sanction" | "pep";
}

export const ListContainer: React.FC<ListContainerProps> = ({
  list,
  type = "sanction",
}) => {
  const [isExpanded, setIsExpanded] = useState(list.isMatch);
  const t = useTranslations("report.content");

  const getStatusColor = () => {
    if (!list.isMatch) return "bg-gray-50 border-gray-200";
    if (type === "pep") return "bg-orange-50 border-orange-200";
    return "bg-red-50 border-red-200";
  };

  const getIconColor = () => {
    if (!list.isMatch) return "text-green-600";
    if (type === "pep") return "text-orange-600";
    return "text-red-600";
  };

  return (
    <div className={`border rounded-lg overflow-hidden ${getStatusColor()}`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-opacity-75 transition-colors"
      >
        <div className="flex items-center gap-3">
          {list.isMatch ? (
            <svg
              className={`w-5 h-5 ${getIconColor()}`}
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
              className={`w-5 h-5 ${getIconColor()}`}
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
          <div>
            <h4 className="font-medium text-sm">{list.listName}</h4>
            <p className="text-xs text-gray-500">
              {t("code")}: {list.listCode}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <StatusBadge isMatch={list.isMatch} showIcon={false} />
          {isExpanded ? (
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

      {isExpanded && (
        <div className="px-4 py-3 border-t border-gray-200 bg-white">
          {list.error && (
            <div className="text-sm text-red-600 mb-3">
              {t("error")}: {list.error}
            </div>
          )}

          {list.isMatch && list.items.length > 0 && (
            <div className="space-y-3">
              <h5 className="text-sm font-medium text-gray-700">
                {t("match-details")} ({list.items.length})
              </h5>
              {list.items.map((item, idx) => (
                <div
                  key={idx}
                  className={type === "pep" ? "pep-match-wrapper" : ""}
                >
                  <ListItem item={item} />
                </div>
              ))}
            </div>
          )}

          {!list.isMatch && (
            <p className="text-sm text-gray-600">{t("no-matches-found")}</p>
          )}

          {list.screenshots && list.screenshots.length > 0 && (
            <div className="mt-3">
              <h5 className="text-sm font-medium text-gray-700 mb-2">
                {t("verification-screenshots")}
              </h5>
              {list.screenshots.map((screenshot, idx) => (
                <Image
                  key={idx}
                  src={screenshot}
                  alt={`Verification screenshot ${idx + 1}`}
                  className="w-full max-w-md rounded border border-gray-300 mt-2"
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
