import React, { useEffect } from "react";
import RJSFFormHandler from "../../../utils/RJSFFormHandler";
import { SubmitButton } from "../../../utils/SubmitButtonHandler";
import { MultiImagesWidget } from "../../../utils/MultiImagePreview";
import { schema, uiSchema } from ".";
import useAxiosFetcher from "../../../../api/Fetcher";
import { useNavigate, useParams } from "react-router-dom";
import { getTokenCookie } from "../../../../api/TokenManager";
import { Toast } from "../../../../components/alerts";
import Loader from "../../../../components/Loader";

const widgets = { imagesWidget: MultiImagesWidget };
function NewDirector() {
  const { post, get, data, error, loading } = useAxiosFetcher();
  const { userid } = useParams();
  const router = useNavigate();
  const onSubmit = ({ formData }) => {
    if (loading) return;
    post(`/api/aboutus/director/${userid}`, [
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
    if (error) {
      Toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      if (typeof data.message === "string" && data.status) {
        Toast.success(data.message);
        router(`/${userid}/about/director`);
      } else if (typeof data.message === "object" && data.status == true) {
        router(`/${userid}/about/director/edit`);
      }
    }
  }, [data]);

  useEffect(() => {
    get(`/api/aboutus/director/${userid}`);
  }, []);

  const props = {
    uiSchema,
    schema,
    SubmitButton: () => <SubmitButton name="create" color="primary" />,
    onSubmit,
    widgets,
  };

  return (
    <div
      style={{ maxWidth: "800px", margin: "0 auto" }}
      className="d-flex flex-column gap-3 position-relative"
    >
      <div className="alert alert-primary" role="alert">
        <strong>Use this forms to create your director content</strong>
      </div>
      {loading ? <Loader /> : <RJSFFormHandler {...props} />}
    </div>
  );
}

export default NewDirector;
