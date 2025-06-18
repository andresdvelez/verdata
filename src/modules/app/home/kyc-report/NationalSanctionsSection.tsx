import React from "react";
import { VerificationSection } from "./VerifictionSection";
import { RestrictiveList } from "./RestrictiveList";
import { RestrictiveListResult } from "@/types/app/reports";

interface NationalSanctionsSectionProps {
  title: string;
  data: RestrictiveListResult[];
  overall: boolean;
}

export const NationalSanctionsSection: React.FC<
  NationalSanctionsSectionProps
> = ({ title, data, overall }) => {
  return (
    <VerificationSection title={title} result={overall} defaultOpen={overall}>
      <div className="space-y-4">
        {data.map((listData, index) => (
          <RestrictiveList key={index} listData={listData} />
        ))}
      </div>
    </VerificationSection>
  );
};
