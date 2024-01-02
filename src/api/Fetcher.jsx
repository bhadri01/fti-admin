import axios from "axios";
import { useState } from "react";

export const APIROOT = "http://localhost:3000";

// Custom hook for Axios
const useAxiosFetcher = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Function for making GET requests
  const get = async (url) => {
    try {
      setLoading(true);
      const response = await axios.get(`${APIROOT + url}`);
      setData(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.response.data.message);
      setLoading(false);
    }
  };

  // Function for making POST requests
  const post = async (url, payload) => {
    try {
      setLoading(true);
      const [bodyData, config] = payload;
      const response = await axios.post(`${APIROOT + url}`, bodyData, config);
      setData(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.response.data.message);
      setLoading(false);
    }
  };

  // Similarly, you can add PUT, DELETE, etc.

  return { get, post, data, error, loading };
};

export default useAxiosFetcher;
