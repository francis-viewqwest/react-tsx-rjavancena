import { useAppDispatch } from "@/app/hooks";
import { userInfo } from "@/app/slice/userSlice";
import React from "react";

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();


  return <div className="py-20 text-3xl">Profile</div>;
};

export default Profile;
