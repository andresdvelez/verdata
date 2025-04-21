import { Button, Input } from "@heroui/react";

interface SearchFilterProps {
  filterText: string;
  setFilterText: (value: string) => void;
  setCurrentPage: (value: number) => void;
}

export const NameMatchesListFilter = ({
  filterText,
  setFilterText,
  setCurrentPage,
}: SearchFilterProps) => {
  return (
    <div className="flex justify-center">
      <div className="relative w-full max-w-sm">
        <Input
          variant="bordered"
          type="text"
          value={filterText}
          onChange={(e) => {
            setFilterText(e.target.value);
            setCurrentPage(1);
          }}
          placeholder="Filter by name"
          className="w-full rounded-md px-4 py-2 pr-12"
        />
        <Button
          variant="solid"
          size="sm"
          onPress={() => {
            setFilterText("");
            setCurrentPage(1);
          }}
          color="primary"
          className={
            `absolute -right-6 top-3 transition-opacity ` +
            (filterText
              ? "opacity-100 animate-fade-up"
              : "opacity-0 pointer-events-none")
          }
        >
          Clear
        </Button>
      </div>
    </div>
  );
};
