"use server";

import { RecordsTable } from "@/modules/app/common/components/RecordsTable";
import { currentUser } from "@clerk/nextjs/server";
import { Spinner } from "@heroui/react";
import React from "react";

const AppPage = async () => {
  const user = await currentUser();

  if (!user)
    return (
      <main className="h-full w-full flex items-center justify-center">
        <Spinner />
      </main>
    );

  return (
    <div className="flex flex-col gap-10 ">
      <aside className="flex gap-4 w-full">
        <div className="border border-primary w-1/3 h-60"></div>
        <div className="border border-primary w-1/3 h-60"></div>
        <div className="border border-primary w-1/3 h-60"></div>
      </aside>
      <aside className="flex flex-col gap-8">
        <div className="">
          <h2 className="text-5xl font-semibold">Historial</h2>
          <p className="text-lg font-medium">Últimas búsquedas</p>
        </div>
        <RecordsTable />
      </aside>
    </div>
  );
};

export default AppPage;
