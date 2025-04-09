import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { devtools } from "zustand/middleware";
import {
  SEARCH_TYPE_DOCUMENT,
  SEARCH_TYPE_ID,
  SEARCH_TYPE_NAME,
} from "../app/constants/search";
import { parseCountry } from "../app/utils/parseCountry";
import { UserSearchByName } from "@/types/app/users";
import { UserIdentity, UserNotFound } from "@/types/app/user-identity";
import { Report } from "@prisma/client";
import { trackEntitlement } from "@/actions/trackSchematicEntitlements";
import { FeatureFlag } from "../app/common/features/flags";
import { sampleKYCReport } from "../app/common/data/kycReportData";

export type handleSearchReportType = {
  userId: string;
  searchType: "name" | "identification";
  nationality: string;
  searchInput: string;
  isFullReportAvailable: boolean;
};

interface SearchReportState {
  isLoading: boolean;
  isPreSearch: boolean;
  isEmpty: boolean;
  token: string;
  countryCode: string | null;
  usersByName: UserSearchByName[] | null;
  searchDocumentLabel: string;
  localSearchType: string;
  userIdentity: UserIdentity | UserNotFound | null;
  warningLabel: string | null;
  setToken: (value: string) => void;
  setSearchDocumentLabel: (value: string) => void;
  setLocalSearchType: (value: string) => void;
  // New reset functions
  resetSearchDocumentLabel: () => void;
  resetLocalSearchType: () => void;
  resetSearchState: () => void;
  searchByName: (countryCode: string, searchName: string) => Promise<void>;
  handleSearchReport: ({
    userId,
    searchType,
    nationality,
    searchInput,
    isFullReportAvailable,
  }: handleSearchReportType) => Promise<Report>;
  searchById: (countryCode: string, searchId: string) => Promise<void>;
}

export const useSearchReportStore = create<SearchReportState>()(
  devtools(
    persist(
      (set) => ({
        isLoading: false,
        isPreSearch: false,
        isEmpty: true,
        countryCode: null,
        nationalData: [],
        internationalData: [],
        usersByName: [],
        userIdentity: null,
        searchDocumentLabel: SEARCH_TYPE_DOCUMENT,
        localSearchType: SEARCH_TYPE_ID,
        warningLabel: null,
        token: "",

        // Existing setters
        setToken: (value) => {
          set({ token: value });
        },
        setLocalSearchType: (value) => {
          set({ localSearchType: value });
        },
        setSearchDocumentLabel: (value) => {
          set({ searchDocumentLabel: value });
        },

        // New reset functions
        resetSearchDocumentLabel: () => {
          set({ searchDocumentLabel: SEARCH_TYPE_DOCUMENT });
        },
        resetLocalSearchType: () => {
          set({ localSearchType: SEARCH_TYPE_NAME });
        },
        resetSearchState: () => {
          set({
            searchDocumentLabel: SEARCH_TYPE_DOCUMENT,
            localSearchType: SEARCH_TYPE_NAME,
            warningLabel: null,
            usersByName: [],
            userIdentity: null,
            isPreSearch: false,
            isEmpty: true,
          });
        },

        // Existing methods
        searchByName: async (countryCode: string /* searchName: string */) => {
          set({
            isLoading: true,
            isEmpty: false,
            isPreSearch: true,
            countryCode: parseCountry(countryCode),
          });

          // Simulate API call with a promise that resolves after 5 seconds
          await new Promise((resolve) => setTimeout(resolve, 5000));
          // TODO: Replace with actual API call when endpoint is ready
          // const usersByName = await listNames({
          //   countryCode: parseCountry(countryCode),
          //   searchName,
          // });

          set({
            usersByName: [], // This would be the result from the API
            isEmpty: false,
            isLoading: false,
          });
        },
        handleSearchReport: async ({
          userId,
          searchType,
          nationality,
          searchInput,
          isFullReportAvailable,
        }) => {
          try {
            console.log(searchType, nationality, searchInput);
            set({
              isLoading: true,
              isEmpty: false,
              warningLabel: null,
            });

            if (!userId) throw new Error("Something went wrong, try it later");
            if (isFullReportAvailable) {
              await new Promise((resolve) => setTimeout(resolve, 10000));

              // const searchedReport = await searchReportService({
              //   searchType,
              //   nationality,
              //   searchInput,
              //   token: get().token,
              // });
              await trackEntitlement(FeatureFlag.MONTHLY_REQUESTS, userId);
              set({
                isEmpty: false,
                isLoading: false,
              });
              return sampleKYCReport;
            } else {
              await trackEntitlement(FeatureFlag.MONTHLY_REQUESTS, userId);
              await new Promise((resolve) => setTimeout(resolve, 60000));
              set({
                isEmpty: false,
                isLoading: false,
              });
              return sampleKYCReport;
            }
          } catch (error) {
            set({
              isEmpty: true,
              isLoading: false,
            });
            throw error;
          }
        },
        searchById: async (countryCode: string /* searchId: string */) => {
          set({
            isEmpty: false,
            isLoading: true,
            countryCode: parseCountry(countryCode),
          });
          // TODO: Search by document
          // const userIdentity = await getIdentityByDocument({
          //   country: parseCountry(countryCode),
          //   identification: searchId,
          // });
          // set({ userIdentity });
          // if ("error" in userIdentity) {
          //   return set({
          //     isLoading: false,
          //     userIdentity: null,
          //     matchedNationals: false,
          //     matchedInternationals: false,
          //   });
          // }
          // await get().handleSearch(userIdentity, nationalEndpoints as any);
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
// function get() {
//   return useSearchReportStore.getState();
// }
