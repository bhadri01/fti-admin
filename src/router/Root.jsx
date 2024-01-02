import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

function Root() {
  const router = useNavigate();
  const { userid } = useParams();
  const { pathname } = useLocation();
  useEffect(() => {
    //need to write the user verification login here 
    if (localStorage.getItem("companyName") == userid) {
      router(pathname);
    } else {
      router("/login");
    }
  }, []);
  return <Outlet />;
}

export default Root;
