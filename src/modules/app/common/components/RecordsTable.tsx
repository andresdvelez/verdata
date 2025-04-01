"use client";

import { useUserStore } from "@/modules/store/user-store";
import {
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { recordsTableColumns } from "../data/reports-table-columns";
import { RenderCell } from "./RecordsTableCell";
import { useTranslations } from "next-intl";
import { RecordsTableEmpty } from "./RecordsTableEmpty";
import { KYCReport } from "@/types/app/reports";

export const RecordsTable = () => {
  const t = useTranslations("records-table");

  const reports = useUserStore((state) => state.searchedReports) as KYCReport[];
  const isLoading = useUserStore((state) => state.isLoading);

  console.log(reports);

  const { cell } = RenderCell();

  const columns = recordsTableColumns(t);

  return (
    <Table
      classNames={{
        wrapper: "border-none shadow-none p-0",
      }}
      aria-label="Records from user's search"
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        loadingContent={<Spinner />}
        isLoading={isLoading}
        items={reports || []}
        emptyContent={<RecordsTableEmpty />}
      >
        {(item) => (
          <TableRow key={`${item?.id}`}>
            {(columnKey) => <TableCell>{cell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
