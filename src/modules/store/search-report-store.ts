import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { devtools } from "zustand/middleware";
import {
  SEARCH_TYPE_DOCUMENT,
  SEARCH_TYPE_ID,
  SEARCH_TYPE_NAME,
} from "../app/constants/search";
import { Report } from "@prisma/client";
import { SearchType } from "@/types/app/search";
import { SearchNameResults } from "@/types/app/users";
import axios from "axios";

export type handleSearchReportType = {
  userId: string;
  searchType: SearchType;
  nationality: string;
  searchInput: string;
  isFullReportAvailable: boolean;
};

export type handleSearchNameType = {
  userId: string;
  countryCode: string;
  searchName: string;
};

interface SearchReportState {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  isPreSearch: boolean;
  isEmpty: boolean;
  token: string;
  nameSearched: string | null;
  countryCode: string | null;
  usersByName: SearchNameResults | null;
  searchDocumentLabel: string;
  localSearchType: string;
  warningLabel: string | null;
  setToken: (value: string) => void;
  setSearchDocumentLabel: (value: string) => void;
  setLocalSearchType: (value: SearchType) => void;
  resetSearchDocumentLabel: () => void;
  resetLocalSearchType: () => void;
  resetSearchState: () => void;
  searchByName: ({
    userId,
    countryCode,
    searchName,
  }: handleSearchNameType) => Promise<void>;
  handleSearchReport: (args: handleSearchReportType) => Promise<Report>;
}

export const useSearchReportStore = create<SearchReportState>()(
  devtools(
    persist(
      (set, get) => ({
        isLoading: false,
        setIsLoading: (value) => set({ isLoading: value }),
        isPreSearch: false,
        isEmpty: true,
        nameSearched: null,
        countryCode: null,
        usersByName: null,
        searchDocumentLabel: SEARCH_TYPE_DOCUMENT,
        localSearchType: SEARCH_TYPE_ID,
        warningLabel: null,
        token: "",

        // Setters
        setToken: (value) => set({ token: value }),
        setLocalSearchType: (value) => set({ localSearchType: value }),
        setSearchDocumentLabel: (value) => set({ searchDocumentLabel: value }),

        // Resetters
        resetSearchDocumentLabel: () =>
          set({ searchDocumentLabel: SEARCH_TYPE_DOCUMENT }),
        resetLocalSearchType: () => set({ localSearchType: SEARCH_TYPE_NAME }),
        resetSearchState: () =>
          set({
            searchDocumentLabel: SEARCH_TYPE_DOCUMENT,
            localSearchType: SEARCH_TYPE_NAME,
            warningLabel: null,
          }),

        // Name search
        searchByName: async ({ userId, countryCode, searchName }) => {
          try {
            set({ isLoading: true, isEmpty: false });
            const res = await axios.post(
              "/api/search-name",
              { userId, countryCode, searchName },
              {
                headers: { Authorization: `Bearer ${get().token}` },
              }
            );
            set({
              nameSearched: searchName,
              usersByName: res.data,
              isEmpty: false,
              isLoading: false,
              isPreSearch: true,
            });
          } catch (error) {
            set({
              usersByName: null,
              isEmpty: true,
              isLoading: false,
              isPreSearch: false,
            });
            throw error;
          }
        },

        // Report search
        handleSearchReport: async (args) => {
          try {
            set({ isLoading: true, isEmpty: false, warningLabel: null });
            const res = await axios.post(
              "/api/search-report",
              {
                userId: args.userId,
                searchType: args.searchType,
                nationality: args.nationality,
                searchInput: args.searchInput,
              },
              {
                headers: { Authorization: `Bearer ${get().token}` },
              }
            );
            set({ isEmpty: false, isLoading: false });
            return res.data as Report;
          } catch (error) {
            set({ isEmpty: true, isLoading: false });
            throw error;
          }
        },
      }),
      {
        name: "search-report-store",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          searchDocumentLabel: state.searchDocumentLabel,
        }),
      }
    )
  )
);
