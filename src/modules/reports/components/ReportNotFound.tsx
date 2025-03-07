import { Link } from "@/modules/translations/i18n/routing";
import React from "react";

export const ReportNotFound = () => {
  return (
    <section className="pb-24 pt-32 sm:pt-40">
      <div className="container">
        <h1 className="text-3xl font-bold">Report not found</h1>
        <p className="text-foreground">
          The report you are looking for does not exist.
        </p>
        <div className="mt-8">
          <Link
            href="/records"
            className="inline-flex items-center gap-2 transition-colors hover:bg-blue-400"
          >
            Back to reports
          </Link>
        </div>
      </div>
    </section>
  );
};
