import React from "react";
import Lottie from "lottie-react";
import LoadingLottie from "../../lottie/loading.json";
const LoadingComponent = () => {
  return (
    <div className="  bg-[#151515]  !opacity-100  flex justify-center items-center flex-col h-screen ">
      <Lottie className=" w-3/12 " animationData={LoadingLottie} loop />
      <p className=" text-white text-3xl font-bold">Loading...</p>
    </div>
  );
};

export default LoadingComponent;
