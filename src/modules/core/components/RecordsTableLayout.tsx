"use client";

import { RecordsTable } from "@/modules/app/common/components/RecordsTable";
import { useTranslations } from "next-intl";

export const RecordsTableLayout = () => {
  const t = useTranslations("records-table");

  return (
    <aside className="flex flex-col gap-8">
      <div className="">
        <h2 className="text-5xl font-semibold">{t("record")}</h2>
        <p className="text-lg font-medium">{t("latest-searches")}</p>
      </div>
      <RecordsTable />
    </aside>
  );
};
