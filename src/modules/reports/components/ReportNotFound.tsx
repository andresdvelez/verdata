"use client";

import { Link } from "@/modules/translations/i18n/routing";
import { Button, Card } from "@heroui/react";
import { useTranslations } from "next-intl";
import React from "react";

export const ReportNotFound = () => {
  const t = useTranslations("report.errors");

  return (
    <div className="h-[calc(100vh-102px)] relative w-full flex items-center justify-center">
      <Card className="max-w-lg w-full p-8 animate-fade-in" shadow="none">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="rounded-full bg-gray-100 p-6">
            <i
              className="icon-[bx--error-circle] size-16 text-gray-400"
              role="img"
              aria-hidden="true"
            />
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-bold">{t("report-not-found")}</h1>
            <p className="text-gray-500 max-w-md">
              {t("report-not-found-description")}
            </p>
          </div>

          <Button
            as={Link}
            href="/app/records"
            className="bg-primary text-background flex items-center gap-2"
            variant="solid"
            radius="sm"
            startContent={
              <i
                className="icon-[bx--left-arrow-alt] size-4"
                role="img"
                aria-hidden="true"
              />
            }
          >
            {t("back-to-reports")}
          </Button>
        </div>
      </Card>
    </div>
  );
};
