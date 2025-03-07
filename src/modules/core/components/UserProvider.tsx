"use client";

import { useUserStore } from "@/modules/store/user-store";
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { userId: clerkId, isLoaded: isClerkLoaded } = useAuth();
  const { fetchUser } = useUserStore();

  useEffect(() => {
    if (isClerkLoaded && clerkId) {
      fetchUser(clerkId);
    }
  }, [isClerkLoaded, clerkId, fetchUser]);

  return <>{children}</>;
};
