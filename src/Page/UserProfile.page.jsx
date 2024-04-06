import React from "react";
import { useGetProfileQuery } from "../store/service/endPoints/contact.point";
import {
  FaAddressCard,
  FaPhoneSquareAlt,
  FaUber,
  FaUser,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const UserProfilePage = () => {
  const { data, isError, isLoading } = useGetProfileQuery();

  console.log(data, isError, isLoading);
  return (
    <div className=" h-full flex justify-center items-center">
      <div className=" bg-[#151515] w-3/4 text-white relative p-5 flex flex-col  justify-between h-3/4">
        {/* <FormButtomComponent
              onClick={HandleEditContant}
              style={
                "!w-[20%] absolute top-[-8px] right-[-8px]  shadow-md rounded-br-md  rounded-tl-md "
              }
            >
              <div className=" flex  items-center gap-2  ">
                <p>Edit</p>
                <FaEdit />
              </div>
            </FormButtomComponent> */}
        <div className=" flex justify-center items-center w-[250px] h-[250px] mx-auto  border-4 border-slate-700 rounded-full bg-slate-900">
          <p className=" font-bold text-7xl ">
            {data?.user?.name[0].toUpperCase()}
          </p>
        </div>
        <h1 className=" flex justify-center gap-3 items-center  text-center text-xl font-semibold  ">
          <FaUser />
          {data?.user?.name}
          {/* {data?.user?.created_at} */}
        </h1>

        <h1 className=" flex  items-center gap-3">
          <MdEmail />
          {data?.user?.email}
        </h1>
      </div>
    </div>
  );
};

export default UserProfilePage;
