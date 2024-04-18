import React, { useState } from "react";
import { useGetProfileQuery } from "../store/service/endPoints/contact.point";
import {
  FaAddressCard,
  FaPhoneSquareAlt,
  FaUber,
  FaUser,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { AuthGuardComponents, LableInput, NavBar } from "../components";
import { Form, Formik } from "formik";
import { Button } from "../components/ui/button";
import { ImSpinner9 } from "react-icons/im";
import * as yup from "yup";
import { useChangePasswordMutation } from "../store/service/endPoints/auth.endpoint";
import { GrStatusGood } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

const UserProfilePage = () => {
  const nav = useNavigate();
  const [changeTracker, setChangeTracker] = useState(false);
  const initialValues = {
    current_password: "",
    password: "",
    password_confirmation: "",
  };
  const validationSchema = yup.object({
    current_password: yup
      .string()
      .required("Enter Your password!")
      .min(4, "Mininun 4")
      .max(8, "Must be 8 "),

    password: yup
      .string()
      .required("Enter Your password!")
      .min(4, "Mininun 4")
      .max(8, "Must be 8 "),

    password_confirmation: yup
      .string()
      .required("Enter Your password!")
      .min(4, "Mininun 4")
      .max(8, "Must be 8 "),
  });
  const [changePasswordFun, datar] = useChangePasswordMutation();
  console.log(datar);

  const HandleSubmit = async (value) => {
    console.log(value);
    const res = await changePasswordFun(value);
    console.log(res);
    if (res.data.success) {
      setChangeTracker(!changeTracker);
      setTimeout(() => {
        localStorage.removeItem("token");
        nav("/");
      }, 3000);
    }
  };
  const { data, isError, isLoading } = useGetProfileQuery();
  const [chacker, setChacker] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : null
  );
  console.log(chacker);

  return (
    <AuthGuardComponents check={chacker} goPage={"/user-profile"}>
      <NavBar setChacker={setChacker} />
      <div className=" py-5  h-full flex justify-center items-center">
        <div className="rounded border border-orangeColor bg-[#151515] w-3/4 text-white relative p-5 flex flex-col  justify-between h-3/4">
          <div className=" flex justify-center items-center w-[200px] h-[200px] mx-auto  border-4 border-slate-700 rounded-full bg-slate-900">
            <p className=" font-bold text-7xl ">
              {data?.user?.name[0].toUpperCase()}
            </p>
          </div>
          <h1 className=" flex justify-center gap-3 items-center  text-center text-xl font-semibold  ">
            <FaUser />
            {data?.user?.name}
            {/* {data?.user?.created_at} */}
          </h1>
          <h1 className="  flex justify-center text-center  items-center gap-3">
            <MdEmail />
            {data?.user?.email}
          </h1>

          <h1 className=" text-2xl font-bold text-orangeColor text-center bg-black rounded p-2  mt-5">
            Your can change your password
          </h1>
          <Formik
            validationSchema={validationSchema}
            onSubmit={HandleSubmit}
            initialValues={initialValues}
          >
            {({ handleChange, handleBlur, values, isSubmitting }) => (
              <>
                <Form className=" flex flex-col gap-5 w-3/4 mx-auto my-3">
                  {isSubmitting && (
                    <div className=" text-orangeColor animate-bounce text-center font-bold text-xl">
                      {" "}
                      Please wait Loading...
                    </div>
                  )}
                  <LableInput
                    disabled={isSubmitting || changeTracker}
                    type={"password"}
                    name="current_password"
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    value={values.current_password}
                  />

                  {datar?.error?.data?.errors?.current_password?.map(
                    (i, index) => (
                      <h1
                        className=" text-red-600 text-center text-md font-bold"
                        key={index}
                      >
                        Current_Password : {i}
                      </h1>
                    )
                  )}

                  <LableInput
                    disabled={isSubmitting || changeTracker}
                    type={"password"}
                    name="password"
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    value={values.password}
                  />
                  <LableInput
                    disabled={isSubmitting || changeTracker}
                    type={"password"}
                    name="password_confirmation"
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    value={values.password_confirmation}
                  />

                  {datar?.error?.data?.errors?.password?.map((i, index) => (
                    <h1
                      className=" text-red-600 text-center text-md font-bold "
                      key={index}
                    >
                      New_Password : {i}
                    </h1>
                  ))}

                  {datar?.data?.message && (
                    <div className="animate-bounce text-lg text-green-500 text-center  ">
                      <h1>! Please wait ...</h1>
                      <div className=" flex gap-3 justify-center items-center ">
                        <GrStatusGood />
                        <h1>{datar?.data?.message}</h1>
                      </div>
                    </div>
                  )}

                  <Button
                    disabled={isSubmitting || changeTracker}
                    type="submit"
                    className="bg-black text-white w-full "
                  >
                    Change Password
                    {isSubmitting && (
                      <ImSpinner9 className=" ml-5 animate-spin" />
                    )}
                  </Button>
                </Form>
              </>
            )}
          </Formik>
        </div>
      </div>
    </AuthGuardComponents>
  );
};

export default UserProfilePage;
