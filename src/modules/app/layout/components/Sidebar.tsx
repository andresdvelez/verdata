"use client";

import { Link } from "@/modules/translations/i18n/routing";
import { SignOutButton } from "@clerk/nextjs";
import { Button } from "@heroui/react";
import { useState } from "react";
import { SidebarItem } from "./SidebarLink";

export const Sidebar: React.FC = () => {
  const [activeItem, setActiveItem] = useState("general");

  return (
    <aside className="h-screen w-72 border-r border-primary flex flex-col bg-background">
      <div className="h-[89px] flex items-center justify-center mb-4">
        <Link href="/app" className="flex items-center gap-2 px-2">
          <i
            className="icon-[streamline--startup-solid] size-5 text-foreground"
            role="img"
            aria-hidden="true"
          />
          <span className="text-xl font-medium text-sidebar-primary">
            Verdata
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-8">
        <SidebarItem
          icon={
            <i
              className="icon-[el--home] size-5"
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
          to="/app/perfil"
          isActive={activeItem === "perfil"}
          onClick={() => setActiveItem("perfil")}
        />
      </nav>

      <div className="mt-auto px-8 py-3">
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
