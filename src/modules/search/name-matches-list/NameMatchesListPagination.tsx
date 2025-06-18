import { Button } from "@heroui/react";
import { useTranslations } from "next-intl";

interface NameMatchesListPaginationProps {
  currentPage: number;
  totalPages: number;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
}

export const NameMatchesListPagination = ({
  currentPage,
  totalPages,
  handlePreviousPage,
  handleNextPage,
}: NameMatchesListPaginationProps) => {
  const t = useTranslations("name-matches-list.pagination");

  return (
    <div className="flex items-center justify-between mt-8">
      <p className="text-sm text-muted-foreground">
        {t("page")} {currentPage} {t("of")} {totalPages}
      </p>
      <div className="flex gap-2">
        <Button
          variant="bordered"
          size="sm"
          onPress={handlePreviousPage}
          disabled={currentPage === 1}
        >
          {t("previous")}
        </Button>
        <Button
          variant="bordered"
          size="sm"
          onPress={handleNextPage}
          disabled={currentPage === totalPages}
        >
          {t("next")}
        </Button>
      </div>
    </div>
  );
};
