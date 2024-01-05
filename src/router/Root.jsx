import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { APIROOT } from "../api/Fetcher";
import { getTokenCookie } from "../api/TokenManager";
import axios from "axios";
import Loader from "../components/Loader";

function Root() {
  const { userid } = useParams();
  const router = useNavigate();
  const [Loading, setLoading] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    if (getTokenCookie()) {
      (async () => {
        const data = await axios.get(`${APIROOT}/api/user/${userid}`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${getTokenCookie()}`,
          },
        }).catch(err =>{
          if(err.response.status == 401){
            router("/login");
            setLoading(false);
          }
        })
        if (data.data.status) {
          router(`/${userid}/dashboard`);
        } else {
          router("/login");
        }
        setLoading(false);
      })();
    } else {
      router("/login");
    }
  }, []);
  return <>{Loading ? <Loader /> : <Outlet />}</>;
}

export default Root;
