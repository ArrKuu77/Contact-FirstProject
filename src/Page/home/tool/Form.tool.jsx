import { ErrorMessage, Form, Formik } from "formik";
import React, { useRef } from "react";
import { LableInput } from "../../../components";
import * as yup from "yup";
import { SheetClose } from "../../../components/ui/sheet";
import { Button } from "../../../components/ui/button";
import { Loader2 } from "lucide-react";
import {
  useCreateContactMutation,
  useUpdateContactMutation,
} from "../../../store/service/endPoints/contact.point";
// import { useNavigate } from "react-router-dom";

const FormTool = ({ editData, handleClose, setPage, totalPage }) => {
  console.log(editData);
  const [fun, data] = useCreateContactMutation();
  console.log(data);

  const [updateFun, updateData] = useUpdateContactMutation();
  // const nav = useNavigate();
  const CloseRef = useRef();
  const initialValues = {
    name: editData?.data?.name || "",
    email: editData?.data?.email || "",
    phone: editData?.data?.phone || "",
    address: editData?.data?.address || "",
  };
  const validationSchema = yup.object({
    name: yup.string().required("Enter your name"),
    email: yup
      .string()
      .required("Enter Your email!")
      .email("Invalite your email"),
    phone: yup
      .string()
      .min(9, "that should be valid phone number")
      .max(11, "that should be valid phone number")
      .required("phone field is required"),
    address: yup.string().required("Ender your address"),
  });

  const handleSubmit = async (values) => {
    if (editData.edit) {
      await updateFun({ id: editData?.data?.id, value: values });
    } else {
      await fun(values);
      setPage(totalPage);
      // nav("/home");
      // console.log(CloseRef.current.click());
    }
    CloseRef.current.click();
  };
  return (
    <div className=" p-3  my-3">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={handleSubmit}
      >
        {({ handleBlur, handleChange, values, isSubmitting }) => (
          <>
            <Form className=" m-3 flex flex-col justify-between items-center  h-[450px] w-full">
              <div className=" w-full space-y-4">
                <LableInput
                  type={"text"}
                  name="name"
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  value={values.name}
                />

                <LableInput
                  type={"email"}
                  name="email"
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  value={values.email}
                />

                <LableInput
                  type={"phone"}
                  name="phone"
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  value={values.phone}
                />

                <LableInput
                  type={"text"}
                  name="address"
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  value={values.address}
                />
              </div>
              <div className=" flex justify-between items-center w-full">
                <SheetClose
                  onClick={handleClose}
                  ref={CloseRef}
                  className=" w-2/5 bg-[#151515]  "
                >
                  <Button
                    variant="outline"
                    disabled={isSubmitting}
                    type="button"
                    className="bg-[#151515] w-full"
                  >
                    Cancel
                  </Button>
                </SheetClose>
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  className=" w-2/5 bg-orangeColor text-black "
                >
                  <span> {editData.edit ? "Edit" : "Create"}</span>
                  {isSubmitting && (
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  )}
                </Button>
              </div>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
};

export default FormTool;
