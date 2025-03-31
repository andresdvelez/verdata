"use client";

import React, { useCallback } from "react";
import { Chip, Button } from "@heroui/react";
import { Link } from "@/modules/translations/i18n/routing";
import { KYCReport } from "@/types/app/reports";

export const RenderCell = () => {
  const cell = useCallback((report: KYCReport, columnKey: React.Key) => {
    // Use the new field names directly
    const cellValue = report?.[columnKey as keyof KYCReport];

    switch (columnKey) {
      case "nationality":
        // In the new object, nationality is now a full string (e.g., "Colombia")
        return typeof cellValue === "string" ? cellValue : "";
      case "search_type":
        // Adjust mapping based on your expected search types (e.g. "name" or "CC")
        // return cellValue === "name" ? "Nombre" : "Identificación";
        return cellValue;
      case "created_at":
        if (
          cellValue instanceof Date ||
          typeof cellValue === "string" ||
          typeof cellValue === "number"
        ) {
          const newDate = new Date(cellValue);
          return `${String(newDate.getDate()).padStart(2, "0")}/${String(
            newDate.getMonth() + 1
          ).padStart(2, "0")}/${newDate.getFullYear()}`;
        }
        return "";
      case "is_identity_matched":
        return (
          <Chip
            className="capitalize border-none gap-1 text-default-600"
            size="sm"
            variant="flat"
            color={cellValue ? "warning" : "success"}
          >
            {cellValue ? "Con coincidencias" : "Sin coincidencias"}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative">
            <Link href={`/app/records/${report.id}`}>
              <Button
                variant="bordered"
                className="underline text-mainGreen border-none"
              >
                Abrir
                <span className="icon-[material-symbols--arrow-circle-right-outline] -rotate-45 scale-105"></span>
              </Button>
            </Link>
          </div>
        );
      default:
        return cellValue !== null && cellValue !== undefined
          ? String(cellValue)
          : "";
    }
  }, []);

  return { cell };
};
