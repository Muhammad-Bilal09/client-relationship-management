import React from "react";
import { UserProfileProps } from "@/types/type";


const UserProfile: React.FC<UserProfileProps> = ({ imageSrc, userName }) => {
  return (
    <div className="flex space-x-2 items-center">
      <img src={imageSrc || ""} alt="user image" className="rounded-full w-10 h-10" />
      <p className="text-sm">{userName}</p>
    </div>
  );
};

export default UserProfile;
