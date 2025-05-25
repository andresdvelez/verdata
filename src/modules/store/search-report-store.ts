/* eslint-disable @typescript-eslint/no-explicit-any */
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

            const token = get().token;
            if (!token) {
              throw new Error("No authentication token available");
            }

            const res = await axios.post(
              "/api/search-name",
              { userId, countryCode, searchName },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
                timeout: 30000, // 30 second timeout
              }
            );

            set({
              nameSearched: searchName,
              usersByName: res.data,
              isEmpty: false,
              isLoading: false,
              isPreSearch: true,
            });
          } catch (error: any) {
            console.error("❌ Error in searchByName:", error);
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

            const token = get().token;
            if (!token) {
              throw new Error("No authentication token available");
            }

            // Validate required arguments
            if (!args.userId) {
              throw new Error("userId is required");
            }
            if (!args.searchType) {
              throw new Error("searchType is required");
            }
            if (!args.nationality) {
              throw new Error("nationality is required");
            }
            if (!args.searchInput?.trim()) {
              throw new Error("searchInput is required");
            }

            console.log("🔍 Starting search report request:", {
              userId: args.userId,
              searchType: args.searchType,
              nationality: args.nationality,
              searchInputLength: args.searchInput.length,
            });

            const res = await axios.post(
              "/api/search-report",
              {
                userId: args.userId,
                searchType: args.searchType,
                nationality: args.nationality,
                searchInput: args.searchInput.trim(),
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
                timeout: 60000, // 60 second timeout to match your API route
                validateStatus: (status) => status < 500, // Don't throw for 4xx errors
              }
            );

            // Handle different response statuses
            if (res.status >= 400) {
              const errorMessage =
                res.data?.error || `Request failed with status ${res.status}`;
              throw new Error(errorMessage);
            }

            set({ isEmpty: false, isLoading: false });
            return res.data as Report;
          } catch (error: any) {
            console.error("❌ Error in handleSearchReport:", {
              message: error.message,
              response: error.response?.data,
              status: error.response?.status,
            });

            set({ isEmpty: true, isLoading: false });

            // Provide more specific error messages
            if (error.code === "ECONNABORTED") {
              throw new Error("Request timeout - please try again");
            }
            if (error.response?.status === 401) {
              throw new Error("Authentication failed - please log in again");
            }
            if (error.response?.status === 400) {
              const errorMsg =
                error.response?.data?.error || "Invalid request parameters";
              throw new Error(errorMsg);
            }

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
