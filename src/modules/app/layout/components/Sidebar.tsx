"use client";

import { Link, usePathname } from "@/modules/translations/i18n/routing";
import { SignOutButton } from "@clerk/nextjs";
import { Button, Image } from "@heroui/react";
import { SidebarItem } from "./SidebarLink";
import { useTranslations } from "next-intl";

export const Sidebar: React.FC = () => {
  const t = useTranslations("sidebar");
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/app") {
      return pathname === "/app";
    }
    return pathname.startsWith(path);
  };

  return (
    <aside className="h-screen w-[260px] 2xl:w-[283px] border-r border-primary flex flex-col items-center bg-background">
      <div className="h-[89px] flex items-center justify-center mb-4">
        <Link href="/app" className="flex items-center gap-2">
          <Image
            src="/brand/logotype.png"
            alt="Verdata logotipo"
            classNames={{
              wrapper: "size-[38px]",
            }}
          />
          <span className="text-3xl text-sidebar-primary">Verdata</span>
        </Link>
      </div>

      <nav className="flex-1">
        <SidebarItem
          icon={
            <i
              className="icon-[topcoat--home] size-5"
              role="img"
              aria-hidden="true"
              id="tooltip-select-1"
            />
          }
          text={t("general")}
          to="/app"
          isActive={isActive("/app") || isActive("/")}
        />
        <SidebarItem
          icon={
            <i
              className="icon-[tdesign--search] size-5"
              role="img"
              aria-hidden="true"
            />
          }
          text={t("search")}
          to="/app/search"
          isActive={isActive("/app/search")}
        />
        <SidebarItem
          icon={
            <i
              className="icon-[gg--file-document] size-5"
              role="img"
              aria-hidden="true"
            />
          }
          text={t("record")}
          to="/app/records"
          isActive={isActive("/app/records")}
        />
        <SidebarItem
          icon={
            <i
              className="icon-[uil--wallet] size-5"
              role="img"
              aria-hidden="true"
            />
          }
          text={t("credits")}
          to="/app/credits"
          isActive={isActive("/app/credits")}
        />
        <SidebarItem
          icon={
            <i
              className="icon-[heroicons-solid--user] size-5"
              role="img"
              aria-hidden="true"
            />
          }
          text={t("profile")}
          to="/app/profile"
          isActive={isActive("/app/profile")}
        />
      </nav>

      <div className="mt-auto py-3">
        <SignOutButton redirectUrl={`/auth/sign-in`}>
          <Button
            variant="light"
            startContent={
              <i
                className="icon-[mynaui--logout-solid] size-5"
                role="img"
                aria-hidden="true"
              />
            }
          >
            {t("sign-out")}
          </Button>
        </SignOutButton>
      </div>
    </aside>
  );
};
