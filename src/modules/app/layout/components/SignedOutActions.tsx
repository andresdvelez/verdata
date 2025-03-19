"use client";

import { useRouter } from "@/modules/translations/i18n/routing";
import { Button } from "@heroui/react";
import { useTranslations } from "next-intl";

export const SignedOutActions = () => {
  const t = useTranslations("header.signed-out-actions");
  const router = useRouter();

  return (
    <div className="flex items-center gap-6">
      <Button
        onPress={() => router.push("/auth/waitlist")}
        variant="light"
        radius="none"
        className="font-medium text-lg"
        startContent={
          <i className="icon-[bx--user] size-4" role="img" aria-hidden="true" />
        }
      >
        {t("sign-up")}
      </Button>
      <Button
        onPress={() => router.push("/auth/sign-in")}
        variant="bordered"
        radius="none"
        className="border-1 border-primary font-medium text-lg"
      >
        {t("sign-in")}
      </Button>
    </div>
  );
};
