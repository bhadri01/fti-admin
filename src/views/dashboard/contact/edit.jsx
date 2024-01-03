import React, { useEffect, useState } from "react";
import { schema } from ".";
import { useNavigate, useParams } from "react-router-dom";
import { SubmitButton } from "../../utils/SubmitButtonHandler";
import RJSFFormHandler from "../../utils/RJSFFormHandler";
import useAxiosFetcher from "../../../api/Fetcher";
import { Toast } from "../../../components/alerts";
import { getTokenCookie } from "../../../api/TokenManager";
import Loader from "../../../components/Loader";

function ContactEdit() {
  const { get, put, data, error, loading } = useAxiosFetcher();
  const [FormData, setFormData] = useState(null);
  const router = useNavigate();
  const { userid, id } = useParams();

  console.log(`id:${id + userid}`);

  const onSubmit = ({ formData }) => {
    if (loading) return;
    put(`/api/contact/${userid}/${id}`, [
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
        router(`/${userid}/contact`);
      } else {
        let d = data.message;
        d.phoneNo = parseInt(d.phoneNo, 10);
        setFormData(d);
      }
    }
  }, [data]);

  useEffect(() => {
    get(`/api/contact/${userid}/${id}`);
  }, []);

  const props = {
    uiSchema: {},
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
          Update your contact details in the below forms
        </strong>
      </div>
      {loading ? <Loader /> : FormData && <RJSFFormHandler {...props} />}
    </div>
  );
}

export default ContactEdit;
