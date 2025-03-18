import { UserProfile } from "@clerk/nextjs";
import React from "react";

const ProfilePage = () => {
  return (
    <div className="flex gap-8">
      <UserProfile />
    </div>
  );
};

export default ProfilePage;
