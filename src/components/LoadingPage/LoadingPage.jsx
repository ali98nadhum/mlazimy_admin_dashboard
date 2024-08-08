import React from "react";
import Lottie from "lottie-react";
import loadingAnimation from "../../animation/loadingAnimation.json";

const LoadingPage = () => {
  return (
    <div className="loading-page">
      <Lottie style={{ height: "100px" }} animationData={loadingAnimation} />
    </div>
  );
};

export default LoadingPage;
