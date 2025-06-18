import { Button } from "@heroui/react";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("name-matches-list.header");

  return (
    <div className="text-center space-y-2 relative">
      <h2 className="text-3xl font-bold tracking-tight">
        {t("search-results")}
      </h2>
      <div className="flex justify-center items-center gap-4">
        <p className="text-muted-foreground">
          {t("found")} {resultCount} {t("potential-matches")}
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
              <span>{t("close")}</span>
            </div>
          ) : (
            <span> {t("cannot-find-match")} </span>
          )}
        </Button>
      </div>
    </div>
  );
};
