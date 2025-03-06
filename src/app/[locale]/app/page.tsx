"use client";

import { useUserStore } from "@/modules/store/user-store";
import { Spinner } from "@heroui/react";
import React from "react";

const AppPage = () => {
  const { user, isLoading } = useUserStore();

  console.log(user);

  if (isLoading) return <Spinner />;

  return <div>{user?.firstName}</div>;
};

export default AppPage;
