import { useAppDispatch } from "@/app/hooks";
import { userInfo } from "@/app/slice/userSlice";
import React from "react";
import UserInfo from "./components/UserInfo";

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="pt-10 text-3xl">
      <UserInfo />
    </div>
  );
};

export default Profile;
