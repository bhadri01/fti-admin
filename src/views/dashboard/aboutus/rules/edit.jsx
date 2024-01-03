import React, { useEffect, useState } from "react";
import RJSFFormHandler from "../../../utils/RJSFFormHandler";
import { SubmitButton } from "../../../utils/SubmitButtonHandler";
import { schema, uiSchema } from ".";
import useAxiosFetcher from "../../../../api/Fetcher";
import { useNavigate, useParams } from "react-router-dom";
import { getTokenCookie } from "../../../../api/TokenManager";
import { Toast } from "../../../../components/alerts";
import Loader from "../../../../components/Loader";

function Rules() {
  const { get, post, data, error, loading } = useAxiosFetcher();
  const [FormData, setFormData] = useState(null);
  const router = useNavigate();
  const { userid } = useParams();
  const onSubmit = ({ formData }) => {
    if (loading) return;
    post(`/api/aboutus/rules/${userid}`, [
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${getTokenCookie()}`,
        },
      },
    ]);
  };
  useEffect(() => {
    if (error && FormData) {
      Toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      if (typeof data.message === "string") {
        Toast.success(data.message);
        router(`/${userid}/about/rules`);
      } else {
        setFormData(data.message);
      }
    }
  }, [data]);

  useEffect(() => {
    get(`/api/aboutus/rules/${userid}`);
  }, []);

  const props = {
    uiSchema,
    schema,
    SubmitButton: () => <SubmitButton name="update" color="warning" />,
    onSubmit,
    formData: FormData,
  };

  return (
    <div
      style={{ maxWidth: "800px", margin: "0 auto" }}
      className="d-flex flex-column gap-3 position-relative"
    >
      <div className="alert alert-primary" role="alert">
        <strong>
          Update your rules data and choose the images properly
        </strong>
      </div>
      {loading ? <Loader /> : FormData && <RJSFFormHandler {...props} />}
    </div>
  );
}

export default Rules;
