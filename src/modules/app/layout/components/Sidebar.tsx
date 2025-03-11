"use client";

import { Link } from "@/modules/translations/i18n/routing";
import { SignOutButton } from "@clerk/nextjs";
import { Button, Image } from "@heroui/react";
import { useState } from "react";
import { SidebarItem } from "./SidebarLink";

export const Sidebar: React.FC = () => {
  const [activeItem, setActiveItem] = useState("general");

  return (
    <aside className="h-screen w-[283px] px-16 border-r border-primary flex flex-col bg-background">
      <div className="h-[89px] flex items-center justify-center mb-4">
        <Link href="/app" className="flex items-center gap-2 px-2">
          <Image
            src="/brand/logotype.png"
            alt="Verdata logotipo"
            classNames={{
              wrapper: "size-11",
            }}
          />
          <span className="text-3xl font-medium text-sidebar-primary">
            Verdata
          </span>
        </Link>
      </div>

      <nav className="flex-1">
        <SidebarItem
          icon={
            <i
              className="icon-[topcoat--home] size-5"
              role="img"
              aria-hidden="true"
            />
          }
          text="General"
          to="/app"
          isActive={activeItem === "general"}
          onClick={() => setActiveItem("general")}
        />
        <SidebarItem
          icon={
            <i
              className="icon-[tdesign--search] size-5"
              role="img"
              aria-hidden="true"
            />
          }
          text="Búsqueda"
          to="/app/busqueda"
          isActive={activeItem === "busqueda"}
          onClick={() => setActiveItem("busqueda")}
        />
        <SidebarItem
          icon={
            <i
              className="icon-[gg--file-document] size-5"
              role="img"
              aria-hidden="true"
            />
          }
          text="Historial"
          to="/app/records"
          isActive={activeItem === "historial"}
          onClick={() => setActiveItem("historial")}
        />
        <SidebarItem
          icon={
            <i
              className="icon-[uil--wallet] size-5"
              role="img"
              aria-hidden="true"
            />
          }
          text="Créditos"
          to="/app/credits"
          isActive={activeItem === "creditos"}
          onClick={() => setActiveItem("creditos")}
        />
        <SidebarItem
          icon={
            <i
              className="icon-[heroicons-solid--user] size-5"
              role="img"
              aria-hidden="true"
            />
          }
          text="Perfil"
          to="/app/profile"
          isActive={activeItem === "perfil"}
          onClick={() => setActiveItem("perfil")}
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
            Cerrar sesión
          </Button>
        </SignOutButton>
      </div>
    </aside>
  );
};
