"use client";

import { redirect } from "@/modules/translations/i18n/routing";
import { useAuth } from "@clerk/nextjs";
import { useLocale } from "next-intl";
import { useEffect } from "react";

export default function Home() {
  const { isSignedIn } = useAuth();
  const locale = useLocale();

  useEffect(() => {
    if (isSignedIn) {
      redirect({ locale, href: "/app" });
    } else {
      redirect({ locale, href: "/auth/sign-in" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn]);

  return <div className=""></div>;
}
