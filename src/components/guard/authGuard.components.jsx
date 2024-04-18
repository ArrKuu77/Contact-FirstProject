import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingLottie } from "..";

const authGuardComponents = ({ goPage, check, children }) => {
  const nav = useNavigate();
  // const { data, isError, isLoading } = useGetProfileQuery();

  // console.log(data, isError, isLoading);

  useEffect(() => {
    if (check || !check == undefined) {
      nav(goPage);
    } else {
      nav("/");
    }
  }, [check]);

  return <>{children}</>;
};

export default authGuardComponents;
