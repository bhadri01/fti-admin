import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { APIROOT } from "../../api/Fetcher";
import Loader from "../../components/Loader";

const Dashboard = () => {
  const { userid } = useParams();
  const { get } = useFetcher();
  const [statuses, setStatuses] = useState({
    home: null,
    director: null,
    members: null,
    rules: null,
    vision: null,
    activity: null,
    contact: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatuses = async () => {
      const apis = [
        `/api/home/${userid}`,
        `/api/aboutus/director/${userid}`,
        `/api/aboutus/members/${userid}`,
        `/api/aboutus/rules/${userid}`,
        `/api/aboutus/vision/${userid}`,
        `/api/activity/${userid}`,
        `/api/contact/${userid}`,
      ];

      const promises = apis.map((api) => get(api));
      const results = await Promise.all(promises);
      console.log(results);

      setStatuses({
        home: results[0]?.status,
        director: results[1]?.status,
        members: results[2]?.status,
        rules: results[3]?.status,
        vision: results[4]?.status,
        activity: results[5]?.status,
        contact: results[6]?.status,
      });
      setLoading(false);
    };

    fetchStatuses();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="mt-5" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2>Dashboard</h2>
          {Object.entries(statuses).map(([key, value]) => (
            <div
              key={key}
              className={`alert alert-${value ? "success" : "danger"} d-flex gap-2`}
            >
              {value ? (
                <i class="bi bi-check2-circle"></i>
              ) : (
                <i class="bi bi-exclamation-triangle-fill"></i>
              )}
              {key.toUpperCase()}:{" "}
              {value
                ? "Data exists. You can update."
                : "Data does not exist. Need to create."}
              <Link
                to={`/${userid}/${
                  key == "home" || key == "activity" || key == "contact"
                    ? key
                    : "about/" + key
                }`}
              >
                click here
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Dashboard;

const useFetcher = () => {
  const [data, setData] = useState(null);

  const get = async (url) => {
    try {
      const response = await axios.get(`${APIROOT + url}`);
      setData(response.data);
      return response.data; // Return the data for use in the dashboard
    } catch (error) {
      console.error("Error fetching data:", error);
      return null; // Return null in case of an error
    }
  };

  return { get, data };
};
