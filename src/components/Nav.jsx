import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../components/ui/button";
import { useLogOutMutation } from "../store/service/endPoints/auth.endpoint";
import { LoadingLottie } from ".";
import { useGetProfileQuery } from "../store/service/endPoints/contact.point";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
const Nav = ({ setChacker }) => {
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
        <div className=" sm:flex-row flex flex-col justify-center items-center text-xl font-bold ">
          <span className=" p-1">MMSIT</span>{" "}
          <span className=" text-black bg-orangeColor p-1 rounded-sm">
            Contact App
          </span>
        </div>
        <div className=" flex justify-center items-center gap-5">
          <Button className=" bg-black" onClick={handleLogout}>
            <span className="text-orangeColor">Log</span>
            <span>out</span>
          </Button>
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
                <div className=" absolute top-[55px] right-0 bg-[#151515] p-2 border-2 border-orangeColor ">
                  <h1 className=" flex justify-center gap-3 items-center  text-center text-xl font-semibold  ">
                    <FaUser />
                    {ProfileData?.user?.name}
                    {/* {ProfileData?.user?.created_at} */}
                  </h1>

                  <h1 className=" flex  items-center gap-3">
                    <MdEmail />
                    {ProfileData?.user?.email}
                  </h1>
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
