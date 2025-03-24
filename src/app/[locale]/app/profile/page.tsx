import { UserProfile } from "@clerk/nextjs";
import React from "react";

const ProfilePage = () => {
  return (
    <div className="flex items-center justify-center lg:items-start lg:justify-start gap-8">
      <UserProfile />
    </div>
  );
};

export default ProfilePage;
