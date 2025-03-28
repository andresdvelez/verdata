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
import { Report } from "@prisma/client";
import { RenderCell } from "./RecordsTableCell";
import { useTranslations } from "next-intl";
import { RecordsTableEmpty } from "./RecordsTableEmpty";

export const RecordsTable = () => {
  const t = useTranslations("records-table");

  const user = useUserStore((state) => state.user);
  const isLoading = useUserStore((state) => state.isLoading);

  const { cell } = RenderCell();

  const columns = recordsTableColumns(t);

  const reports = user?.searched_reports;

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
        items={(reports as Report[]) || []}
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
