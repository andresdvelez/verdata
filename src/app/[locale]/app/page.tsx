"use server";

import { RecordsTableLayout } from "@/modules/core/components/RecordsTable";
import { currentUser } from "@clerk/nextjs/server";
import { Card, Spinner } from "@heroui/react";
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
      <aside className="flex flex-col md:flex-row gap-4 w-full">
        <Card className="md:w-1/3 h-60 bg-yellow-50" shadow="sm"></Card>
        <Card className="md:w-1/3 h-60 bg-blue-50" shadow="sm"></Card>
        <Card className="md:w-1/3 h-60 bg-red-50" shadow="sm"></Card>
      </aside>
      <RecordsTableLayout />
    </div>
  );
};

export default AppPage;
