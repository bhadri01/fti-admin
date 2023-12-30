import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

function Root() {
  const router = useNavigate();
  const { userid } = useParams();
  const { pathname } = useLocation();
  console.log(userid,pathname,localStorage.getItem("userId"))
  useEffect(() => {
    //need to write the user verification login here 
    if (localStorage.getItem("userId") == userid) {
      console.log("it's happens right")
      router(pathname);
    } else {
      router("/login");
    }
  }, []);
  return <Outlet />;
}

export default Root;
