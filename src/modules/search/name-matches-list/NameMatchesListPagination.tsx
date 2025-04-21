import { Button } from "@heroui/react";

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
  return (
    <div className="flex items-center justify-between mt-8">
      <p className="text-sm text-muted-foreground">
        Page {currentPage} of {totalPages}
      </p>
      <div className="flex gap-2">
        <Button
          variant="bordered"
          size="sm"
          onPress={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Button
          variant="bordered"
          size="sm"
          onPress={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
