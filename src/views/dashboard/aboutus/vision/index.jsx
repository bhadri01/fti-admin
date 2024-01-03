import React, { useEffect, useState } from "react";
import useAxiosFetcher, { APIROOT } from "../../../../api/Fetcher";
import { Link, useParams } from "react-router-dom";
import { Toast } from "../../../../components/alerts";
import Loader from "../../../../components/Loader";

function Vision() {
  const { get, data, error, loading } = useAxiosFetcher();
  const { userid } = useParams();
  const [FormData, setFormData] = useState(null);
  useEffect(() => {
    get(`/api/aboutus/vision/${userid}`);
  }, []);
  useEffect(() => {
    if (error && FormData) {
      Toast.error(error);
    }
  }, [error]);
  useEffect(() => {
    setFormData(data);
  }, [data]);
  return (
    <div className="position-relative w-100 h-100 p-2">
      {loading ? (
        <Loader />
      ) : FormData ? (
        FormData?.status ? (
          <VisionDataHas data={FormData?.message} />
        ) : (
          <VisionDataDont />
        )
      ) : (
        "there is no home data"
      )}
    </div>
  );
}

export default Vision;

const VisionDataHas = ({ data }) => {
  return (
    <div
      style={{ maxWidth: "800px", margin: "0 auto" }}
      className="d-flex flex-column gap-3"
    >
      <div className="alert alert-primary" role="alert">
        <strong>
          This is the vision page content it's reflect on your actual web site
        </strong>
      </div>

      <h3>
        <h5 style={{ textDecoration: "underline" }}>Title: </h5>
        {data?.aboutTitle}
      </h3>
      <p>
        <h5 style={{ textDecoration: "underline" }}>Description: </h5>
        {data?.about}
      </p>
      <hr />
      <h3>
        <h5 style={{ textDecoration: "underline" }}>Title: </h5>
        {data?.visionTitle}
      </h3>
      <p>
        <h5 style={{ textDecoration: "underline" }}>Description: </h5>
        {data?.vision}
      </p>
      <hr />
      <h5 style={{ textDecoration: "underline" }}>About Image:</h5>
      <div className="w-100 d-flex flex-wrap justify-content-center gap-3">
        {data?.aboutImage?.map(({ url }) => (
          <img
            style={{ width: "250px", height: "200px", objectFit: "cover" }}
            key={url}
            src={`${APIROOT + url}`}
            alt="home Carousel"
          />
        ))}
      </div>
      <div
        className="border border-primary p-3 rounded text-capitalize"
        style={{ width: "fit-content" }}
      >
        <p>need to update your home page content click update</p>
        <button type="button" className="btn btn-warning">
          <Link style={{ all: "unset" }} to={"edit"}>
            update
          </Link>
        </button>
      </div>
    </div>
  );
};
const VisionDataDont = () => {
  return (
    <div
      style={{ maxWidth: "800px", margin: "0 auto" }}
      className="d-flex flex-column gap-3"
    >
      <div className="alert alert-danger" role="alert">
        <strong>
          Still you don't have any vision page data to show in the website
        </strong>
      </div>
      <div
        className="border border-primary p-3 rounded text-capitalize"
        style={{ width: "fit-content" }}
      >
        <p>Start creating your vision page by click create</p>
        <button type="button" className="btn btn-success">
          <Link style={{ all: "unset" }} to={"new"}>
            create
          </Link>
        </button>
      </div>
    </div>
  );
};

export const schema = {
  title: "About vision",
  type: "object",
  required: ["aboutTitle", "about", "visionTitle", "vision", "aboutImage"],
  properties: {
    aboutTitle: {
      type: "string",
      title: "About Title",
    },
    about: {
      type: "string",
      title: "About Description",
    },
    visionTitle: {
      type: "string",
      title: "Vision Title",
    },
    vision: {
      type: "string",
      title: "Vision Description",
    },
    aboutImage: {
      type: "array",
      title: "About Image",
      items: {
        type: "string",
        format: "data-url",
      },
      maxItems: 1,
    },
  },
};

export const uiSchema = {
  aboutTitle: {
    "ui:widget": "text",
    "ui:placeholder": "About Title",
  },
  about: {
    "ui:widget": "textarea",
    "ui:placeholder": "Detailed description about...",
  },
  visionTitle: {
    "ui:widget": "text",
    "ui:placeholder": "Vision Title",
  },
  vision: {
    "ui:widget": "textarea",
    "ui:placeholder": "Detailed vision description...",
  },
  aboutImage: {
    "ui:widget": "imagesWidget",
    "ui:description": "upload the image for the aboutus page",
    "ui:options": {
      accept: "image/*",
    },
  },
};
