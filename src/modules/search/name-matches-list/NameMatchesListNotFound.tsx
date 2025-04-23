import { SearchType } from "@/types/app/search";
import { Button } from "@heroui/react";
import { useTranslations } from "next-intl";

interface NameMatchesListNotFoundProps {
  nameSearched: string;
  handleSearchReport: (identityData: string, searchType: SearchType) => void;
}

export const NameMatchesListNotFound = ({
  nameSearched,
  handleSearchReport,
}: NameMatchesListNotFoundProps) => {
  const t = useTranslations("name-matches-list.not-found");

  return (
    <div className="animate-fade-up text-center py-8 space-y-6 bg-background rounded-lg shadow-sm border border-border">
      <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
        <i
          className="icon-[solar--magnifer-line-duotone] size-8 text-primary"
          aria-hidden="true"
        />
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">{t("no-exact-matches-found")}</h3>
        <p className="text-muted-foreground max-w-sm mx-auto">
          {t("search-anyway")}
        </p>
      </div>
      <Button
        onPress={() => handleSearchReport(nameSearched, SearchType.NAME)}
        className="px-8"
        color="primary"
      >
        {t("search-by")} &quot;{nameSearched}&quot; {t("anyway")}
      </Button>
    </div>
  );
};
