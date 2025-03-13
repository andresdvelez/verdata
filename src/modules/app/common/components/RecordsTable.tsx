"use client";

import { useUserStore } from "@/modules/store/user-store";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { RECORDS_TABLE_COLUMNS } from "../data/reports-table-columns";
import { Report } from "@prisma/client";

export const RecordsTable = () => {
  const user = useUserStore((state) => state.user);
  const isLoading = useUserStore((state) => state.isLoading);

  const reports = user?.searched_reports;

  console.log(reports);

  return (
    <Table
      classNames={{
        wrapper: "border-none shadow-none p-0",
      }}
      aria-label="Records from user's search"
      bottomContent={
        <div className="flex w-full justify-center">
          {/* <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          /> */}
        </div>
      }
    >
      <TableHeader columns={RECORDS_TABLE_COLUMNS}>
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
        isLoading={isLoading}
        items={reports as Report[]}
        emptyContent={"No hay datos para mostrar."}
      >
        {(item) => (
          <TableRow key={`${item.id}`}>
            <TableCell>{item.id}</TableCell>
            {/* {(columnKey) => <TableCell>{cell(item, columnKey)}</TableCell>} */}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
