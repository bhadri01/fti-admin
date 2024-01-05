import React, { useEffect, useState } from "react";
import useAxiosFetcher from "../../../../../api/Fetcher";
import { useNavigate, useParams } from "react-router-dom";
import { MultiImagesWidget } from "../../../../utils/MultiImagePreview";
import { getTokenCookie } from "../../../../../api/TokenManager";
import { Toast } from "../../../../../components/alerts";
import { SubmitButton } from "../../../../utils/SubmitButtonHandler";
import Loader from "../../../../../components/Loader";
import RJSFFormHandler from "../../../../utils/RJSFFormHandler";
import { schema, uiSchema } from ".";
function MemberEdit() {
  const { get, put, data, error, loading } = useAxiosFetcher();
  const [FormData, setFormData] = useState(null);
  const router = useNavigate();

  var widgets = {
    imagesWidget: (props) => (
      <MultiImagesWidget ImageData={"memberImage"} FormData={FormData} {...props} />
    ),
  };
  const { userid, id } = useParams();
  const onSubmit = ({ formData }) => {
    if (loading) return;
    console.log(FormData);
    put(`/api/aboutus/director/${userid}/director/${id}`, [
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
      console.log(data);
      if (typeof data.message === "string") {
        Toast.success(data.message);
        router(`/${userid}/about/director/member`);
      } else {
        if (Array.isArray(data.message)) {
          setFormData(data.message[0]);
        } else {
          setFormData(data.message);
        }
      }
    }
  }, [data]);

  useEffect(() => {
    get(`/api/aboutus/director/${userid}/director/${id}`);
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

export default MemberEdit;
