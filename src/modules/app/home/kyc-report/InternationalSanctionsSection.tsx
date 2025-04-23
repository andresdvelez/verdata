import React from "react";
import { VerificationSection } from "./VerifictionSection";
import { RestrictiveList } from "./RestrictiveList";
import { RestrictiveListResult } from "@/types/app/reports";

export type RestrictiveListItem = {
  url: string;
  title: string;
  imageUrl: string;
  description: string;
  detailScreenshot: string;
};

interface InternationalSanctionsSectionProps {
  title: string;
  data: RestrictiveListResult[];
  overall: boolean;
}

export const InternationalSanctionsSection: React.FC<
  InternationalSanctionsSectionProps
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
