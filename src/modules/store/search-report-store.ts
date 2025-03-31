import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { devtools } from "zustand/middleware";
import {
  SEARCH_TYPE_DOCUMENT,
  SEARCH_TYPE_NAME,
} from "../app/constants/search";
import { parseCountry } from "../app/utils/parseCountry";
import { UserSearchByName } from "@/types/app/users";
import { UserIdentity, UserNotFound } from "@/types/app/user-identity";
import { Report } from "@prisma/client";
import { trackEntitlement } from "@/actions/trackSchematicEntitlements";
import { FeatureFlag } from "../app/common/features/flags";
import { sampleKYCReport } from "../app/common/data/kycReportData";
import { searchReportService } from "../app/services/searchReportService";

export type handleSearchReportType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
  searchType: "name" | "identification";
  nationality: string;
  searchInput: string;
  isFullReportAvailable: boolean;
};

interface SearchReportState {
  isLoading: boolean;
  isPreSearch: boolean;
  isEmpty: boolean;
  countryCode: string | null;
  usersByName: UserSearchByName[] | null;
  searchDocumentLabel: string;
  localSearchType: string;
  userIdentity: UserIdentity | UserNotFound | null;
  warningLabel: string | null;
  setSearchDocumentLabel: (value: string) => void;
  setLocalSearchType: (value: string) => void;
  searchByName: (countryCode: string, searchName: string) => Promise<void>;
  handleSearchReport: ({
    user,
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
        localSearchType: SEARCH_TYPE_NAME,
        warningLabel: null,
        setLocalSearchType: (value) => {
          set({ localSearchType: value });
        },
        setSearchDocumentLabel: (value) => {
          set({ searchDocumentLabel: value });
        },
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
          user,
          searchType,
          nationality,
          searchInput,
          isFullReportAvailable,
        }) => {
          try {
            set({
              isLoading: true,
              isEmpty: false,
              warningLabel: null,
            });

            if (!user) throw new Error("Something went wrong, try it later");
            if (isFullReportAvailable) {
              // TODO: Make the search functionality
              await searchReportService({
                searchType,
                nationality,
                searchInput,
              });
              // Simulate API call with a promise that resolves after 60 seconds
              await new Promise((resolve) => setTimeout(resolve, 60000));
            } else {
              // Simulate API call with a promise that resolves after 60 seconds
              await new Promise((resolve) => setTimeout(resolve, 60000));
            }

            // Subtract monthly requests credit
            await trackEntitlement(FeatureFlag.MONTHLY_REQUESTS, user);
            set({
              isEmpty: false,
              isLoading: false,
            });
            return sampleKYCReport;
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
