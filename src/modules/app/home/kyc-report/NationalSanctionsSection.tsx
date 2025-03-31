import React from "react";
import { VerificationSection } from "./VerifictionSection";
import { StatusBadge } from "./StatusBadge";

interface ListCheck {
  listName: string;
  description: string;
  result: boolean;
}

export interface NationalList {
  countryCode: string;
  countryName: string;
  lists: ListCheck[];
}

interface NationalSanctionsSectionProps {
  title: string;
  nationalData: NationalList[];
  overallResult: boolean;
}

export const NationalSanctionsSection: React.FC<
  NationalSanctionsSectionProps
> = ({ title, nationalData, overallResult }) => {
  return (
    <VerificationSection title={title} result={overallResult}>
      <div className="space-y-4">
        {nationalData.map((group, index) => (
          <div key={index} className="space-y-2">
            <h3 className="font-medium">
              {group.countryName} ({group.countryCode})
            </h3>
            <div className="space-y-1">
              {group.lists.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center border-b border-gray-100 pb-1"
                >
                  <div>
                    <p className="font-medium">{item.listName}</p>
                    <p className="text-xs text-gray-500">{item.description}</p>
                  </div>
                  <StatusBadge result={item.result} size="sm" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </VerificationSection>
  );
};
