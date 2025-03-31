"use client";

import { useUserStore } from "@/modules/store/user-store";
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { userId: clerkId, isLoaded: isClerkLoaded } = useAuth();
  const fetchUser = useUserStore((state) => state.fetchUser);
  const user = useUserStore((state) => state.user);
  const setSearchedReports = useUserStore((state) => state.setSearchedReports);

  useEffect(() => {
    if (isClerkLoaded && clerkId) {
      fetchUser(clerkId);
    }
  }, [isClerkLoaded, clerkId, fetchUser]);

  useEffect(() => {
    if (user) {
      setSearchedReports(user.searched_reports);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return <>{children}</>;
};
