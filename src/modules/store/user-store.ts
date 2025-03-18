import { create } from "zustand";
import { UserType } from "@/types/app/users";

interface UserState {
  user: UserType | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: UserType | null) => void;
  fetchUser: (clerkId: string) => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoading: false,
  error: null,

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
