import { useUser } from "@clerk/nextjs";
import { useEntitlementsValidation } from "../app/common/hooks/useEntitlementsValidation";
import { useSearchReportStore } from "../store/search-report-store";
import { useUserStore } from "../store/user-store";
import { useRouter } from "../translations/i18n/routing";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useNameMatchesList } from "./hooks/useNameMatchesList";
import { addToast } from "@heroui/react";
import { NameMatchesListHeader } from "./name-matches-list/NameMatchesListHeader";
import { NameMatchesListFilter } from "./name-matches-list/NameMatchesListFilter";
import { NameMatchesListNotFound } from "./name-matches-list/NameMatchesListNotFound";
import { NameMatchesListUserCard } from "./name-matches-list/NameMatchesListUserCard";
import { NameMatchesListPagination } from "./name-matches-list/NameMatchesListPagination";
import { SearchType } from "@/types/app/search";

export const NameMatchesList = () => {
  // Store data and state
  const namesList = useSearchReportStore((state) => state.usersByName);
  const nameSearched = useSearchReportStore((state) => state.nameSearched);
  const addSearchedReport = useUserStore((state) => state.addSearchedReport);
  const searchReport = useSearchReportStore(
    (state) => state.handleSearchReport
  );

  // Hooks
  const { isFullReportAvailable } = useEntitlementsValidation();
  const router = useRouter();
  const { user } = useUser();
  const t = useTranslations();

  // Local state
  const [filterText, setFilterText] = useState("");
  const [showNotFound, setShowNotFound] = useState(false);

  // Custom hooks for search results and pagination
  const {
    currentPage,
    setCurrentPage,
    filteredResults,
    totalPages,
    currentResults,
    handlePreviousPage,
    handleNextPage,
  } = useNameMatchesList(namesList!, filterText);

  // Event handlers
  const toggleNotFoundSection = () => setShowNotFound((prev) => !prev);

  const handleSearchReport = async (
    identityData: string,
    searchType: SearchType
  ) => {
    try {
      const searchedReport = await searchReport({
        userId: user?.id as string,
        searchType,
        nationality: "COL",
        searchInput: identityData,
        isFullReportAvailable,
      });
      addSearchedReport(searchedReport);
      router.push(`/app/records/${searchedReport.id}`);
    } catch (error) {
      addToast({
        title: t(error),
        description: t("alerts.try-it-later"),
      });
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 space-y-8">
      {/* Search Header */}
      <NameMatchesListHeader
        resultCount={filteredResults.length}
        showNotFound={showNotFound}
        toggleNotFoundSection={toggleNotFoundSection}
      />

      {/* Search Filter */}
      <NameMatchesListFilter
        filterText={filterText}
        setFilterText={setFilterText}
        setCurrentPage={setCurrentPage}
      />

      {/* Not Found Section */}
      {showNotFound && (
        <NameMatchesListNotFound
          nameSearched={nameSearched!}
          handleSearchReport={handleSearchReport}
        />
      )}

      {/* Results Grid */}
      <div className="animate-fade-up">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentResults.map((user) => (
            <NameMatchesListUserCard
              key={user.id}
              user={user}
              handleSearchReport={handleSearchReport}
            />
          ))}
        </div>

        {/* Pagination Controls */}
        <NameMatchesListPagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
        />
      </div>
    </div>
  );
};
