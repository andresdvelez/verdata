import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { devtools } from "zustand/middleware";
import {
  SEARCH_TYPE_DOCUMENT,
  SEARCH_TYPE_NAME,
} from "../app/constants/search";
import { parseCountry } from "../app/utils/parseCountry";
import { FetchData } from "@/types/app/endpoints";
import { UserSearchByName } from "@/types/app/users";
import { listNames } from "../app/services/listNames";
import { UserIdentity, UserNotFound } from "@/types/app/user-identity";
import { getIdentityByDocument } from "../app/services/identityValidation";

interface SearchReportState {
  isLoading: boolean;
  isPresearch: boolean;
  isEmpty: boolean;
  matchedNationals: boolean;
  matchedInternationals: boolean;
  countryCode: string | null;
  isSearchVideoActive: boolean;
  nationalData: FetchData[] | [];
  internationalData: FetchData[] | [];
  usersByName: UserSearchByName[] | null;
  searchDocumentLabel: string;
  localSearchType: string;
  userIdentity: UserIdentity | UserNotFound | null;
  warningLabel: string | null;
  setSearchDocumentLabel: (value: string) => void;
  setLocalSearchType: (value: string) => void;
  setSearchWarning: (value: string | null) => void;
  searchByName: (countryCode: string, searchName: string) => Promise<void>;
  getNationalEndpoints: (countryCode: string) => Promise<
    {
      url: string;
      source: string;
      source_en?: string;
      source_pt?: string;
    }[]
  >;
  searchById: (countryCode: string, searchId: string) => Promise<void>;
}

export const useSearchReportStore = create<SearchReportState>()(
  devtools(
    persist(
      (set) => ({
        isLoading: false,
        isPresearch: false,
        isEmpty: true,
        matchedNationals: false,
        matchedInternationals: false,
        countryCode: null,
        isSearchVideoActive: false,
        nationalData: [],
        internationalData: [],
        usersByName: [],
        userIdentity: null,
        searchDocumentLabel: SEARCH_TYPE_DOCUMENT,
        localSearchType: SEARCH_TYPE_NAME,
        warningLabel: null,
        setLocalSearchType: (value) => {
          set({ localSearchType: value });
        },
        setSearchDocumentLabel: (value) => {
          set({ searchDocumentLabel: value });
        },
        searchByName: async (countryCo¶de: string, searchName: string) => {
          set({
            isLoading: true,
            isPresearch: true,
            countryCode: parseCountry(countryCode),
            nationalData: [],
            internationalData: [],
          });
          const usersByName = await listNames({
            countryCode: parseCountry(countryCode),
            searchName,
          });
          set({
            usersByName,
            isEmpty: false,
            isLoading: false,
          });
        },
        getNationalEndpoints: async (countryCode: string) => {
          try {
            const nationalEndpoints = await getEndpoints({
              scope: "national",
              country: countryCode,
            });
            return nationalEndpoints;
          } catch (error) {
            console.log("error getting national data.");
          }
        },
        searchById: async (countryCode: string, searchId: string) => {
          set({
            isEmpty: false,
            isLoading: true,
            isPresearch: false,
            countryCode: parseCountry(countryCode),
            usersByName: [],
            isSearchVideoActive: true,
            nationalData: [],
            internationalData: [],
          });
          const userIdentity = await getIdentityByDocument({
            country: parseCountry(countryCode),
            identification: searchId,
          });
          set({ userIdentity });
          if ("error" in userIdentity) {
            return set({
              isLoading: false,
              userIdentity: null,
              isSearchVideoActive: false,
              matchedNationals: false,
              matchedInternationals: false,
            });
          }
          const nationalEndpoints = await get().getNationalEndpoints(
            countryCode
          );
          await get().handleSearch(userIdentity, nationalEndpoints);
        },
        setSearchWarning: (value) => {
          set({ warningLabel: value });
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
function get() {
  return useSearchReportStore.getState();
}
