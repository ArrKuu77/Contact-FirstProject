import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../components/ui/button";
import { useLogOutMutation } from "../store/service/endPoints/auth.endpoint";
import { LoadingLottie } from ".";
import { useGetProfileQuery } from "../store/service/endPoints/contact.point";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { useNavigate } from "react-router-dom";

import { RiLogoutBoxRFill } from "react-icons/ri";
const Nav = ({ setChacker }) => {
  const nav = useNavigate();
  const [fun, { isLoading, isError, isSuccess }] = useLogOutMutation();
  const handleLogout = async () => {
    await fun();
    localStorage.removeItem("token");
    setChacker(
      localStorage.getItem("token") ? localStorage.getItem("token") : null
    );
  };
  const {
    data: ProfileData,
    isError: ProfileError,
    isLoading: ProfileLoading,
  } = useGetProfileQuery();
  const [tokenProfile, setTokenProfile] = useState(false);
  // console.log(ProfileData, ProfileError, ProfileLoading);
  return (
    <div className=" bg-[#151515] px-3    py-5  border-b shadow-lg">
      <div className="flex justify-between mx-auto w-11/12 items-center">
        <div
          onClick={() => nav("/home")}
          className=" sm:flex-row flex flex-col justify-center items-center text-xl font-bold hover:cursor-pointer select-none"
        >
          <span className=" p-1">MMSIT</span>{" "}
          <span className=" text-black bg-orangeColor p-1 rounded-sm">
            Contact App
          </span>
        </div>
        <div className=" flex justify-center items-center gap-5">
          {ProfileLoading ? (
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          ) : (
            <div
              onClick={() => setTokenProfile(!tokenProfile)}
              className=" hover:cursor-pointer select-none relative w-[50px] h-[50px] flex justify-center items-center   border-4 border-slate-700 rounded-full bg-slate-900"
            >
              <p className=" font-semibold text-xl ">
                {ProfileData?.user?.name[0].toUpperCase()}
              </p>
              {tokenProfile && (
                <div className=" z-10 absolute top-[55px] right-0 bg-[#151515] p-2 border-2 border-orangeColor ">
                  <Button
                    onClick={() => nav("/user-profile")}
                    className=" bg-black p-3 rounded-lg my-2  flex justify-center items-center gap-3   text-center text-xl font-semibold  "
                  >
                    <ImProfile className=" !w-6 !h-6" />
                    <div className=" flex justify-center items-center gap-1">
                      <span>Your</span>
                      <span>Profile</span>
                    </div>
                    {/* {ProfileData?.user?.created_at} */}
                  </Button>
                  <Button
                    onClick={handleLogout}
                    className=" bg-black p-3 rounded-lg my-2  flex justify-center items-center gap-3   text-center text-xl font-semibold    "
                  >
                    <RiLogoutBoxRFill />
                    <span className="text-orangeColor">Log</span>
                    <span>out</span>
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {isLoading && (
        <div className=" absolute z-30 top-24 opacity-95 w-full left-0 flex justify-center items-center bg-[#151515]">
          <LoadingLottie />
        </div>
      )}
    </div>
  );
};

export default Nav;
