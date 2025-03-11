import { UserProfile } from "@clerk/nextjs";
import React from "react";

const ProfilePage = () => {
  return (
    <main className="py-12 px-8 w-full h-[calc(100vh-89px)] flex gap-8 bg-white overflow-auto">
      <UserProfile />
    </main>
  );
};

export default ProfilePage;
