import React from "react";
import { VerificationSection } from "./VerifictionSection";
import { StatusBadge } from "./StatusBadge";

interface ListCheck {
  listName: string;
  description: string;
  result: boolean;
}

export interface InternationalList {
  organization: string;
  scope: string;
  lists: ListCheck[];
}

interface InternationalSanctionsSectionProps {
  title: string;
  internationalData: InternationalList[];
  overallResult: boolean;
}

export const InternationalSanctionsSection: React.FC<
  InternationalSanctionsSectionProps
> = ({ title, internationalData, overallResult }) => {
  return (
    <VerificationSection title={title} result={overallResult}>
      <div className="space-y-4">
        {internationalData.map((group, index) => (
          <div key={index} className="space-y-2">
            <h3 className="font-medium">
              {group.organization} ({group.scope})
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
