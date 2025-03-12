"use client";

import React, { useCallback, useState } from "react";
import { Chip, ChipProps, Button, useDisclosure } from "@heroui/react";
import { Report } from "@prisma/client";

const statusColorMap: Record<string, ChipProps["color"]> = {
  notasigned: "default",
  opened: "success",
  canceled: "danger",
  ongoing: "secondary",
};

const typeColorMap: Record<string, ChipProps["color"]> = {
  individual: "secondary",
  business: "danger",
};

export const RenderCell = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [currentReport, setCurrentReport] = useState<{
    preview: any;
    reportData: any;
  } | null>(null);

  const cell = useCallback((report: any, columnKey: React.Key) => {
    const cellValue = report?.preview[columnKey as keyof Report];

    switch (columnKey) {
      case "nationality":
        if ((cellValue as string).length === 3) {
          return getCountryByCode(cellValue || "")?.Country;
        } else {
          return cellValue;
        }
      case "searchType":
        return cellValue === "name" ? "Nombre" : "Identificación";
      case "date":
        const newDate = new Date(cellValue);
        return `${String(newDate.getDate()).padStart(2, "0")}/${String(
          newDate.getMonth() + 1
        ).padStart(2, "0")}/${newDate.getFullYear()}`;
      case "report":
        return (
          <Chip
            className="capitalize border-none gap-1 text-default-600"
            size="sm"
            variant="flat"
          >
            {cellValue ? "Con coincidencias" : "Sin coincidencias"}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative">
            <Button
              variant="bordered"
              className="underline text-mainGreen border-none"
              onPress={() => {
                onOpen();
                setCurrentReport(report);
              }}
            >
              Abrir
              <span className="icon-[material-symbols--arrow-circle-right-outline] -rotate-45 scale-105"></span>
            </Button>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return {
    cell,
    currentReport,
    modalState: {
      isOpen,
      onClose,
    },
  };
};
