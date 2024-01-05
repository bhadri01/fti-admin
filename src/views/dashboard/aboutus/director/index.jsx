import React, { useEffect, useState } from "react";
import useAxiosFetcher from "../../../../api/Fetcher";
import { Link, useParams } from "react-router-dom";
import { Toast } from "../../../../components/alerts";
import Loader from "../../../../components/Loader";

function Director() {
  const { get, data, error, loading } = useAxiosFetcher();
  const { userid } = useParams();
  const [FormData, setFormData] = useState(null);
  useEffect(() => {
    get(`/api/aboutus/director/${userid}`);
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
          <DirectorDataHas data={FormData?.message} />
        ) : (
          <DirectorDataDont />
        )
      ) : (
        "there is no home data"
      )}
    </div>
  );
}

export default Director;

const DirectorDataHas = ({ data }) => {
  return (
    <div
      style={{ maxWidth: "800px", margin: "0 auto" }}
      className="d-flex flex-column gap-3"
    >
      <div className="alert alert-primary" role="alert">
        <strong>
          This is the director title card content it's reflect on your actual
          web site
        </strong>
      </div>

      <h3>
        <h5 style={{ textDecoration: "underline" }}>Title1: </h5>
        {data?.title1}
      </h3>
      <h3>
        <h5 style={{ textDecoration: "underline" }}>Title2: </h5>
        {data?.title2}
      </h3>
      <h3>
        <h5 style={{ textDecoration: "underline" }}>Title3: </h5>
        {data?.title3}
      </h3>
      <hr />
      <p>
        <h5 style={{ textDecoration: "underline" }}>Description: </h5>
        {data?.description}
      </p>
      <hr />
      <h5 style={{ textDecoration: "underline" }}>Director members: </h5>
      <div
        className="alert alert-success d-flex flex-wrap gap-2 align-items-center"
        style={{ width: "fit-content" }}
        role="alert"
      >
        Start creating your Directors Members{" "}
        <Link to={"member"}>
          <button type="button" className="btn btn-success">
            Add Member
          </button>
        </Link>
      </div>
      <hr />
      <div
        className="border border-primary p-3 rounded text-capitalize"
        style={{ width: "fit-content" }}
      >
        <p>need to update your director title card content click update</p>
        <button type="button" className="btn btn-warning">
          <Link style={{ all: "unset" }} to={"edit"}>
            update
          </Link>
        </button>
      </div>
    </div>
  );
};
const DirectorDataDont = () => {
  return (
    <div
      style={{ maxWidth: "800px", margin: "0 auto" }}
      className="d-flex flex-column gap-3"
    >
      <div className="alert alert-danger" role="alert">
        <strong>
          Still you don't have any director page data to show in the website
        </strong>
      </div>
      <div
        className="border border-primary p-3 rounded text-capitalize"
        style={{ width: "fit-content" }}
      >
        <p>Start creating your director page by click create</p>
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
  title: "Director Information",
  type: "object",
  required: ["title1", "title2", "title3", "description", "fileLink"],
  properties: {
    title1: {
      type: "string",
      title: "Title 1",
      minLength: 1,
    },
    title2: {
      type: "string",
      title: "Title 2",
      minLength: 1,
    },
    title3: {
      type: "string",
      title: "Title 3",
      minLength: 1,
    },
    description: {
      type: "string",
      title: "Description",
      minLength: 10,
    },
    fileLink: {
      type: "string",
      title: "File Link",
      format: "uri",
    },
  },
};

export const uiSchema = {
  title1: {
    "ui:placeholder": "Enter the first title",
  },
  title2: {
    "ui:placeholder": "Enter the second title",
  },
  title3: {
    "ui:placeholder": "Enter the third title",
  },
  description: {
    "ui:widget": "textarea",
    "ui:placeholder": "Provide a detailed description",
  },
  fileLink: {
    "ui:placeholder": "http://example.com/your-file",
  },
};
