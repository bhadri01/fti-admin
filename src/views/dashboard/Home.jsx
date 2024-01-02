import React, { useEffect, useState } from "react";
import RJSFFormHandler from "../utils/RJSFFormHandler";
import { SubmitButton } from "../utils/SubmitButtonHandler";
import { MultiImagesWidget } from "../utils/MultiImagePreview";
import useAxiosFetcher from "../../api/Fetcher";
import { useParams } from "react-router-dom";
import { getTokenCookie } from "../../api/TokenManager";
import { Toast } from "../../components/alerts";
import Loader from "../../components/Loader";

const schema = {
  title: "Home Page",
  type: "object",
  required: ["title1", "title2", "title3", "description"],
  properties: {
    title1: {
      type: "string",
      title: "Title 1",
    },
    title2: {
      type: "string",
      title: "Title 2",
    },
    title3: {
      type: "string",
      title: "Title 3",
    },
    description: {
      type: "string",
      title: "Description",
    },

    homeCarousel: {
      type: "array",
      title: "Home Carousel images",
      items: {
        type: "string",
        format: "data-url",
      },
      minItems: 2,
    },
  },
};

const uiSchema = {
  title1: {
    "ui:placeholder": "Enter Title 1",
  },
  title2: {
    "ui:placeholder": "Enter Title 2",
  },
  title3: {
    "ui:placeholder": "Enter Title 3",
  },
  description: {
    "ui:widget": "textarea",
    "ui:placeholder": "Enter a description",
  },
  homeCarousel: {
    "ui:widget": "imagesWidget",
    "ui:description":
      "upload the images for home carousel that display the images in the home page",
    "ui:options": {
      accept: ".png",
    },
  },
};

const Home = () => {
  const { get, post, data, error, loading } = useAxiosFetcher();
  const [FormData, setFormData] = useState(null);
  var widgets = {
    imagesWidget: (props) => (
      <MultiImagesWidget FormData={FormData} {...props} />
    ),
  };
  const { userid } = useParams();
  const onSubmit = ({ formData }) => {
    if (loading) return;
    console.log(FormData);
    post(`/api/home/${userid}`, [
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
      } else {
        console.log(data);
        setFormData(data.message);
        widgets = {
          imagesWidget: (props) => (
            <MultiImagesWidget FormData={FormData} {...props} />
          ),
        };
      }
    }
  }, [data]);

  useEffect(() => {
    get(`/api/home/${userid}`);
  }, []);

  var props = {
    uiSchema,
    schema,
    SubmitButton: () => <SubmitButton name="create" color="primary" />,
    onSubmit,
    widgets,
    formData: FormData,
  };

  return (
    <div className="position-relative">
      {loading ? <Loader /> : FormData && <RJSFFormHandler {...props} />}
    </div>
  );
};

export default Home;
