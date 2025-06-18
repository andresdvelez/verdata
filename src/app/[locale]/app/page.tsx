"use server";

import { StatCardGrid } from "@/modules/app/home/StatCardGrid";
import { RecordsTableLayout } from "@/modules/core/components/RecordsTableLayout";
import { currentUser } from "@clerk/nextjs/server";
import { Spinner } from "@heroui/react";

const AppPage = async () => {
  const user = await currentUser();

  if (!user)
    return (
      <main className="h-full w-full flex items-center justify-center">
        <Spinner />
      </main>
    );

  return (
    <div className="flex flex-col gap-10">
      <StatCardGrid />
      <RecordsTableLayout />
    </div>
  );
};

export default AppPage;
