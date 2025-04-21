import { Button } from "@heroui/react";

interface NameMatchesListHeaderProps {
  resultCount: number;
  showNotFound: boolean;
  toggleNotFoundSection: () => void;
}

export const NameMatchesListHeader = ({
  resultCount,
  showNotFound,
  toggleNotFoundSection,
}: NameMatchesListHeaderProps) => {
  return (
    <div className="text-center space-y-2 relative">
      <h2 className="text-3xl font-bold tracking-tight">Search Results</h2>
      <div className="flex justify-center items-center gap-4">
        <p className="text-muted-foreground">
          Found {resultCount} potential matches
        </p>
        <Button
          variant="solid"
          color="primary"
          size="sm"
          onPress={toggleNotFoundSection}
        >
          {showNotFound ? (
            <div className="flex items-center gap-2">
              <i
                className="icon-[solar--close-circle-line-duotone] size-5"
                aria-hidden="true"
              />
              <span>Close</span>
            </div>
          ) : (
            <span>Can&apos;t find the exact match?</span>
          )}
        </Button>
      </div>
    </div>
  );
};
