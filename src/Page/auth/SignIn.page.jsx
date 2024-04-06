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
import { ErrorMessage, Form, Formik } from "formik";
import * as yup from "yup";
import { AuthGuardComponents, LableInput } from "../../components";
import { Link } from "react-router-dom";
// import { useToast} from "../components/ui/use-toast"
import { useNavigate } from "react-router-dom";
import { useSignInMutation } from "../../store/service/endPoints/auth.endpoint";

const SignInPage = () => {
  const [signIn, data] = useSignInMutation();
  const nav = useNavigate();

  // const { toast } = useToast();
  // const { isError } = data;
  console.log(data);
  useEffect(() => {
    if (data.isError) {
      console.log(data.error.data.message);
    } else if (data.isSuccess) {
      nav("/home");
    }
  }, [data]);

  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = yup.object({
    email: yup
      .string()
      .required("Enter Your email!")
      .email("Invalite your email"),
    password: yup
      .string()
      .required("Enter Your password!")
      .min(4, "Mininun 4")
      .max(8, "Must be 8 "),
  });
  const HandleSubmit = async (value) => {
    const res = await signIn(value);
    console.log(JSON.stringify(res.data.token));
    localStorage.setItem("token", JSON.stringify(res.data.token));
    // nav("/home");
  };

  return (
    <AuthGuardComponents check={localStorage.getItem("token")} goPage={"/home"}>
      <div className=" w-3/4 mx-auto h-full flex justify-center items-center ">
        <Card className="basis-1/2 bg-bgc text-white ">
          <CardHeader className="flex justify-between flex-row items-center">
            <CardTitle className="text-white bg-black p-4 relative rounded-xl">
              <div className=" absolute top-[-40%] right-0 bg-black h-9 p-1 w-full"></div>
              <span className="text-2xl">SignIn</span>
            </CardTitle>
            <CardDescription className=" text-orangeColor">
              <Link to={"/sign-up"}> I don't have an account!</Link>
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
                      disabled={isSubmitting}
                      type={"text"}
                      name="email"
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      value={values.email}
                    />
                    <LableInput
                      disabled={isSubmitting}
                      type={"password"}
                      name="password"
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      value={values.password}
                    />

                    <Button
                      disabled={isSubmitting}
                      type="submit"
                      className="bg-black text-white w-full "
                    >
                      SignIn
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
    </AuthGuardComponents>
  );
};

export default SignInPage;
