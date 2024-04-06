import React from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { ErrorMessage } from "formik";

const LableInputComponent = ({
  name,
  handleBlur,
  handleChange,
  value,
  type,
  disabled,
}) => {
  return (
    <div>
      <Label htmlFor="email" className=" ">
        Your {name[0].toUpperCase() + name.substring(1)}
      </Label>

      <Input
        disabled={disabled}
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
        id={`${name}`}
        name={name}
        type={type}
        placeholder={`Enter your ${name}`}
        className="bg-[#2F2F2F] border-[#343434]"
      />
      <ErrorMessage component={"span"} className=" text-red-800" name={name} />
    </div>
  );
};

export default LableInputComponent;
