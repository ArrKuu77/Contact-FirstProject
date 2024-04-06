import React from "react";
import { AuthGuardComponents } from "../components";

const ContactCreatePage = () => {
  return (
    <AuthGuardComponents
      check={localStorage.getItem("token")}
      goPage={"/home/contactCreate"}
    >
      <div>ContactCreatePage</div>
    </AuthGuardComponents>
  );
};

export default ContactCreatePage;
