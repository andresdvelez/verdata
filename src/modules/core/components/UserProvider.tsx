"use client";

import { useUserStore } from "@/modules/store/user-store";
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import { generateToken } from "../utils/generateJwtToken";
import { useSchematic } from "@schematichq/schematic-react";
import { FeatureFlag } from "@/modules/app/common/features/flags";
import { useSearchReportStore } from "@/modules/store/search-report-store";

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { userId: clerkId, isLoaded: isClerkLoaded } = useAuth();
  const fetchUser = useUserStore((state) => state.fetchUser);
  const user = useUserStore((state) => state.user);
  const { client } = useSchematic();
  const setToken = useSearchReportStore((state) => state.setToken);
  const setSearchedReports = useUserStore((state) => state.setSearchedReports);

  useEffect(() => {
    if (isClerkLoaded && clerkId) {
      fetchUser(clerkId);
    }
  }, [isClerkLoaded, clerkId, fetchUser]);

  useEffect(() => {
    if (user) {
      setSearchedReports(user.searched_reports);

      const token = generateToken({
        monthly_requests: client.getFlagCheck(FeatureFlag.MONTHLY_REQUESTS),
        national_lists_search: client.getFlagCheck(
          FeatureFlag.NATIONAL_LISTS_SEARCH
        ),
        international_lists_search: client.getFlagCheck(
          FeatureFlag.INTERNATIONAL_LISTS_SEARCH
        ),
        id: user?.id,
      });

      token.then((token) => {
        setToken(token);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return <>{children}</>;
};
