import React from "react";

function Loader() {
  return (
    <div className="loding-spinner-fti">
      <div className="spinner-border text-primary" role="status"></div>
      <h5>your request is processing.....</h5>
      <h5>Thank you for your patience!! </h5>
    </div>
  );
}

export default Loader;
