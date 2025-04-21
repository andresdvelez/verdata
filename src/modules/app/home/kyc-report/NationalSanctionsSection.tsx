import React from "react";
import { VerificationSection } from "./VerifictionSection";
import { StatusBadge } from "./StatusBadge";
import { RestrictiveList } from "./InternationalSanctionsSection";

interface NationalSanctionsSectionProps {
  title: string;
  nationalData: RestrictiveList[];
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
            <div className="w-full flex items-center justify-between">
              <h3 className="font-medium">{group.listName}</h3>
              <StatusBadge isMatch={group.isMatch} size="sm" />
            </div>
            <div className="space-y-1">
              {group.items.length > 0 &&
                group.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center border-b border-gray-100 pb-1"
                  >
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-xs text-gray-500">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </VerificationSection>
  );
};
