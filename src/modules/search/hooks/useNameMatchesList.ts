import { SearchNameResults } from "@/types/app/users";
import { useState } from "react";

const ITEMS_PER_PAGE = 9;

export const useNameMatchesList = (
  namesList: SearchNameResults,
  filterText: string
) => {
  const [currentPage, setCurrentPage] = useState(1);

  const allResults = namesList?.results || [];

  const filteredResults = allResults.filter((user) =>
    user.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const totalPages = Math.ceil(filteredResults.length / ITEMS_PER_PAGE) || 1;

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentResults = filteredResults.slice(startIndex, endIndex);

  const handlePreviousPage = () => setCurrentPage((p) => Math.max(p - 1, 1));

  const handleNextPage = () =>
    setCurrentPage((p) => Math.min(p + 1, totalPages));

  return {
    currentPage,
    setCurrentPage,
    filteredResults,
    totalPages,
    currentResults,
    handlePreviousPage,
    handleNextPage,
  };
};
