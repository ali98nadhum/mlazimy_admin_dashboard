import React from "react";
import Lottie from "lottie-react";
import noDataAnimation from "../../animation/noData.json";

const LoadingPage = () => {
  return (
    <div className="loading-page">
      <Lottie style={{ height: "200px" , display:"block"}} animationData={noDataAnimation} />
    </div>
  );
};

export default LoadingPage;
