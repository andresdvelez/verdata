"use client";

import { useEffect } from "react";
import { useUserStore } from "@/modules/store/user-store";
import { useSearchReportStore } from "@/modules/store/search-report-store";
import { UserType } from "@/types/app/users";

interface Props {
  serverUser: UserType | null;
  serverToken: string;
  children: React.ReactNode;
}

export const UserProvider = ({ serverUser, serverToken, children }: Props) => {
  const setUser = useUserStore((s) => s.setUser);
  const setToken = useSearchReportStore((s) => s.setToken);

  useEffect(() => {
    if (serverUser) {
      setUser(serverUser);
      setToken(serverToken);
    }
  }, [serverUser, serverToken, setUser, setToken]);

  return <>{children}</>;
};
