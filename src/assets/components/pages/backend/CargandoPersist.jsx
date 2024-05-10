import React from "react";
import Loader from "../../../images/assets/loading/loader.gif";

const CargandoPersist = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <img src={Loader} alt="loading" />
    </div>
  );
};

export default CargandoPersist;
