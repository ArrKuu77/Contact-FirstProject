import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import {
  ContactCreatePage,
  ContactsPage,
  ContactTablePage,
  HomePage,
  SignInPage,
  SignUpPage,
  UserProfilePage,
} from "./Page";

const App = () => {
  return (
    <div className=" bg-black  sm:w-screen sm:h-full h-screen   text-white">
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        {/* <Route path="/user-profile" element={<UserProfilePage />} /> */}
        <Route path="/home" element={<HomePage />}>
          {/* <Route index element={<ContactsPage />} /> */}
          <Route path="contactCreate" element={<ContactCreatePage />} />
        </Route>
        <Route path="*" element={<HomePage />} />
      </Routes>
    </div>
  );
};

export default App;
