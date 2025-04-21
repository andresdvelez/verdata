import { SearchType } from "@/types/app/search";
import { Button } from "@heroui/react";

interface NameMatchesListNotFoundProps {
  nameSearched: string;
  handleSearchReport: (identityData: string, searchType: SearchType) => void;
}

export const NameMatchesListNotFound = ({
  nameSearched,
  handleSearchReport,
}: NameMatchesListNotFoundProps) => {
  return (
    <div className="animate-fade-up text-center py-8 space-y-6 bg-background rounded-lg shadow-sm border border-border">
      <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
        <i
          className="icon-[solar--magnifer-line-duotone] size-8 text-primary"
          aria-hidden="true"
        />
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">No exact matches found</h3>
        <p className="text-muted-foreground max-w-sm mx-auto">
          Would you like to search anyway?
        </p>
      </div>
      <Button
        onPress={() => handleSearchReport(nameSearched, SearchType.NAME)}
        className="px-8"
        color="primary"
      >
        Search By &quot;{nameSearched}&quot; Anyway
      </Button>
    </div>
  );
};
