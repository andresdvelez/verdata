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
import { UserIdentity, UserNotFound } from "@/types/app/user-identity";
import { useUserStore } from "./user-store";

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
  getNationalEndpoints: (countryCode: string) => Promise<// {
  //   url: string;
  //   source: string;
  //   source_en?: string;
  //   source_pt?: string;
  // }[]
  void>;
  handleSearch: (
    user: UserIdentity,
    nationalEndpoints: {
      url: string;
      source: string;
      source_en?: string;
      source_pt?: string;
    }[]
  ) => Promise<void>;
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
        searchByName: async (countryCode: string /* searchName: string */) => {
          set({
            isLoading: true,
            isPresearch: true,
            countryCode: parseCountry(countryCode),
            nationalData: [],
            internationalData: [],
          });

          // Simulate API call with a promise that resolves after 10 seconds
          await new Promise((resolve) => setTimeout(resolve, 10000));

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
        getNationalEndpoints: async (/*countryCode: string */) => {
          try {
            // TODO
            // const nationalEndpoints = await getEndpoints({
            //   scope: "national",
            //   country: countryCode,
            // });
            // return nationalEndpoints;
          } catch {
            console.log("error getting national data.");
          }
        },
        handleSearch: async () =>
          // userIdentity: UserIdentity,
          // nationalEndpoints: {
          //   url: string;
          //   source: string;
          //   source_en?: string;
          //   source_pt?: string;
          // }[]
          {
            set({
              isEmpty: false,
              warningLabel: null,
            });
            const user = useUserStore.getState().user;
            if (!user) return;
            // TODO: Make the search functionality
            // const internationalEndpoints = get().internationalEndpoints;
            // const localSearchType = get().localSearchType;

            // await updateDoc(doc(db, "users", `${user.id}`), {
            //   checks: user.checks - 1,
            // });
            useUserStore.setState({
              user: {
                ...user,
              },
            });

            // const internationalData = await getBackgroundData({
            //   endpoints: internationalEndpoints,
            //   searchType: SEARCH_TYPE_NAME,
            //   userData: userIdentity,
            // });
            // const nationalData = await getBackgroundData({
            //   endpoints: nationalEndpoints,
            //   searchType: localSearchType,
            //   userData: userIdentity,
            // });

            // set({
            //   isSearchVideoActive: false,
            //   loading: false,
            //   nationalData: nationalData as FetchData[],
            //   internationalData: internationalData as FetchData[],
            //   matchedNationals:
            //     (
            //       nationalData as {
            //         data: any;
            //         name: string;
            //       }[]
            //     ).filter(
            //       ({ data }) =>
            //         (data?.DATA && data?.DATA !== "no matches") ||
            //         Array.isArray(data)
            //     ).length > 0,
            //   matchedInternationals:
            //     (
            //       internationalData as {
            //         data: any;
            //         name: string;
            //       }[]
            //     ).filter(
            //       ({ data }) =>
            //         (data?.DATA && data.DATA !== "no matches") ||
            //         Array.isArray(data)
            //     ).length > 0,
            // });

            // await createUpdateReport({
            //   user,
            //   countryCode: userIdentity?.Nacionalidad,
            //   internationalData: internationalData as FetchData[],
            //   nationalData: nationalData as FetchData[],
            //   isSearchName: localSearchType === SEARCH_TYPE_NAME,
            //   searchType: localSearchType,
            //   userIdentity,
            // });
          },
        searchById: async (countryCode: string /* searchId: string */) => {
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
          //     isSearchVideoActive: false,
          //     matchedNationals: false,
          //     matchedInternationals: false,
          //   });
          // }
          // const nationalEndpoints = await get().getNationalEndpoints(
          //   countryCode
          // );
          // await get().handleSearch(userIdentity, nationalEndpoints as any);
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
// function get() {
//   return useSearchReportStore.getState();
// }
