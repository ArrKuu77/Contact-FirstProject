import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { ImSpinner9 } from "react-icons/im";

import { Button } from "../../components/ui/button";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { LableInput } from "../../components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSignUpMutation } from "../../store/service/endPoints/auth.endpoint";
const SignInPage = () => {
  const [register, data] = useSignUpMutation();
  const nav = useNavigate();
  console.log(data);
  useEffect(() => {
    if (data.isError) {
      console.log(data.error.data.message);
    } else if (data.isSuccess) {
      nav("/");
    }
  }, [data]);
  const initialValues = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };
  const validationSchema = yup.object({
    email: yup
      .string()
      .required("Enter Your email!")
      .email("Invalite your email"),
    name: yup
      .string()
      .required("Enter Your name!")
      .min(3, "Name should be longer than 3 letter"),
    password: yup
      .string()
      .required("Enter Your password!")
      .min(4, "Mininun 4")
      .max(8, "Must be 8 "),
    password_confirmation: yup
      .string()
      .required("Enter Your passwordconfirm!")
      .min(4, "Mininun 4")
      .max(8, "Must be 8 ")
      .oneOf(
        [yup.ref("password"), null],
        "Passwords and confirm Password must match"
      ),
  });
  const HandleSubmit = async (value) => {
    console.log(value);
    await register(value);
  };
  return (
    <div className=" w-3/4 mx-auto h-full flex justify-center items-center ">
      <Card className="basis-1/2 bg-[#151515] text-white">
        <CardHeader className="flex justify-between flex-row items-center">
          <CardTitle className="text-white bg-black p-4 relative rounded-xl">
            <div className=" absolute top-[-40%] right-0 bg-black h-9 p-1 w-full"></div>
            <span className="text-2xl">SignUp</span>
          </CardTitle>
          <CardDescription className=" text-[#D47904]">
            <Link to={"/"}>Have an account!</Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Formik
            validationSchema={validationSchema}
            onSubmit={HandleSubmit}
            initialValues={initialValues}
          >
            {({ handleChange, handleBlur, values, isSubmitting }) => (
              <>
                <Form className=" flex flex-col gap-5">
                  {isSubmitting && (
                    <div className=" text-orangeColor animate-bounce text-center font-bold text-xl">
                      {" "}
                      Please wait Loading...
                    </div>
                  )}
                  <LableInput
                    type="text"
                    name="name"
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    value={values.name}
                  />

                  <LableInput
                    type="email"
                    name="email"
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    value={values.email}
                  />

                  <LableInput
                    type="password"
                    name="password"
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    value={values.password}
                  />
                  <LableInput
                    type="password"
                    name="password_confirmation"
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    value={values.password_confirmation}
                  />

                  <Button type="submit" className="bg-black text-white w-full ">
                    SignUp
                    {isSubmitting && (
                      <ImSpinner9 className=" ml-5 animate-spin" />
                    )}
                  </Button>
                </Form>
              </>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInPage;
