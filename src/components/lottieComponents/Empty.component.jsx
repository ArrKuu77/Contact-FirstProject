import React from "react";
import Lottie from "lottie-react";
import EmptyJson from "../../lottie/empty.json";
const EmptyComponent = () => {
  return (
    <div className="  w-1/4 flex  flex-col ">
      <Lottie animationData={EmptyJson} loop />
      <p className=" font-bold text-2xl">This is no list...</p>
    </div>
  );
};

export default EmptyComponent;
