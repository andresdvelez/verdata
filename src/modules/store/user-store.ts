import { create } from "zustand";
import { UserType } from "@/types/app/users";
import { Report } from "@prisma/client";

interface UserState {
  user: UserType | null;
  searchedReports: Report[] | [];
  isLoading: boolean;
  setSearchedReports: (reports: Report[]) => void;
  addSearchedReport: (report: Report) => void;
  removeSearchedReport: (reportId: string) => void;
  setIsLoading: (value: boolean) => void;
  error: string | null;
  setUser: (user: UserType | null) => void;
  fetchUser: (clerkId: string) => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  searchedReports: [],
  isLoading: true,
  setIsLoading: (value) => {
    set({ isLoading: value });
  },
  error: null,
  setSearchedReports: (reports) => {
    set({ searchedReports: reports });
  },
  addSearchedReport: (report) => {
    set((prevState) => ({
      searchedReports: [...prevState.searchedReports, report],
    }));
  },
  removeSearchedReport: (reportId) => {
    const filteredReports = get().searchedReports.filter(
      (report) => report.id !== reportId
    );

    set({
      searchedReports: filteredReports,
    });
  },
  setUser: (user) => set({ user }),
  fetchUser: async (clerkId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`/en/api/users/${clerkId}`);
      if (!response.ok) throw new Error("Failed to fetch user");

      const userData = await response.json();
      set({ user: userData, isLoading: false });
    } catch (error) {
      set({ error: (error as { message: string }).message, isLoading: false });
    }
  },
}));
