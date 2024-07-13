import React from "react";
import loadingIcon from "../images/gif/loading-arrow.gif";

const Loading = () => {
  return (
    <div className="loading">
      <h4>rooms data loading...</h4>
      <img src={loadingIcon} alt="loading" />
    </div>
  );
};

export default Loading;
