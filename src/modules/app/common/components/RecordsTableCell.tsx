"use client";

import React, { useCallback } from "react";
import { Chip, Button } from "@heroui/react";
import { Report } from "@prisma/client";
import { getCountryByCode } from "../../utils/getCountryByCode";
import { Link } from "@/modules/translations/i18n/routing";

// const statusColorMap: Record<string, ChipProps["color"]> = {
//   notasigned: "default",
//   opened: "success",
//   canceled: "danger",
//   ongoing: "secondary",
// };

// const typeColorMap: Record<string, ChipProps["color"]> = {
//   individual: "secondary",
//   business: "danger",
// };

export const RenderCell = () => {
  const cell = useCallback((report: Report, columnKey: React.Key) => {
    const cellValue = report?.[columnKey as keyof Report];

    switch (columnKey) {
      case "nationality":
        if (typeof cellValue === "string" && cellValue.length === 3) {
          return getCountryByCode(cellValue || "")?.Country || "";
        } else {
          return String(cellValue);
        }
      case "searchType":
        return cellValue === "name" ? "Nombre" : "Identificación";
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
      case "data":
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
        // Ensure we always return a valid ReactNode
        return cellValue !== null && cellValue !== undefined
          ? String(cellValue)
          : "";
    }
  }, []);

  return {
    cell,
  };
};
