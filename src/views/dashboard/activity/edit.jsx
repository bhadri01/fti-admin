import React, { useEffect, useState } from "react";
import RJSFFormHandler from "../../utils/RJSFFormHandler";
import { SubmitButton } from "../../utils/SubmitButtonHandler";
import { MultiImagesWidget } from "../../utils/MultiImagePreview";
import { schema, uiSchema } from ".";
import useAxiosFetcher from "../../../api/Fetcher";
import { useNavigate, useParams } from "react-router-dom";
import { Toast } from "../../../components/alerts";
import Loader from "../../../components/Loader";
import { getTokenCookie } from "../../../api/TokenManager";

function News() {
  const { get, put, data, error, loading } = useAxiosFetcher();
  const [FormData, setFormData] = useState(null);
  const router = useNavigate();

  var widgets = {
    imagesWidget: (props) => (
      <MultiImagesWidget ImageData={"images"} FormData={FormData} {...props} />
    ),
  };
  const { userid, id } = useParams();
  const onSubmit = ({ formData }) => {
    if (loading) return;
    console.log(FormData);
    put(`/api/activity/${userid}/${id}`, [
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
        console.log(data)
      if (typeof data.message === "string") {
        Toast.success(data.message);
        router(`/${userid}/activity`);
      } else {
        console.log("this happens");
        if (Array.isArray(data.message)) {
          setFormData(data.message[0]);
        } else {
          setFormData(data.message);
        }
      }
    }
  }, [data]);

  useEffect(() => {
    get(`/api/activity/${userid}`);
  }, []);
  const props = {
    uiSchema,
    schema,
    SubmitButton: () => <SubmitButton name="update" color="warning" />,
    onSubmit,
    widgets,
    formData: FormData,
  };

  return (
    <div
      style={{ maxWidth: "800px", margin: "0 auto" }}
      className="d-flex flex-column gap-3 position-relative"
    >
      <div className="alert alert-primary" role="alert">
        <strong>
          Update your home banner data and choose the images properly
        </strong>
      </div>
      {loading ? <Loader /> : FormData && <RJSFFormHandler {...props} />}
    </div>
  );
}

export default News;
