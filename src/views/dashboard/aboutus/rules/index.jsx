import React, { useEffect, useState } from "react";
import useAxiosFetcher from "../../../../api/Fetcher";
import { Link, useParams } from "react-router-dom";
import { Toast } from "../../../../components/alerts";
import Loader from "../../../../components/Loader";

function Rules() {
  const { get, data, error, loading } = useAxiosFetcher();
  const { userid } = useParams();
  const [FormData, setFormData] = useState(null);
  useEffect(() => {
    get(`/api/aboutus/rules/${userid}`);
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
          <RulesDataHas data={FormData?.message} />
        ) : (
          <RulesDataDont />
        )
      ) : (
        "there is no home data"
      )}
    </div>
  );
}

export default Rules;

const RulesDataHas = ({ data }) => {
  return (
    <div
      style={{ maxWidth: "800px", margin: "0 auto" }}
      className="d-flex flex-column gap-3"
    >
      <div className="alert alert-primary" role="alert">
        <strong>
          This is the Rules page content it's reflect on your actual web site
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
      <h5 style={{ textDecoration: "underline" }}>Rules:</h5>
      <div className="w-100 d-flex flex-column gap-3">
        {data?.rulesList?.map((e) => (
          <div className="card" key={e.id}>
            <div className="card-body d-flex justify-content-between">
              <strong>{e.cardTiTle}</strong>
              <a href={e.cardpdfLink} target="_blank">
              <i className="bi bi-file-earmark-pdf-fill"></i>PDF
              </a>
            </div>
          </div>
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
const RulesDataDont = () => {
  return (
    <div
      style={{ maxWidth: "800px", margin: "0 auto" }}
      className="d-flex flex-column gap-3"
    >
      <div className="alert alert-danger" role="alert">
        <strong>
          Still you don't have any{" "}
          <u>
            <i>Rules page</i>
          </u>{" "}
          data to show in the website
        </strong>
      </div>
      <div
        className="border border-primary p-3 rounded text-capitalize"
        style={{ width: "fit-content" }}
      >
        <p>Start creating your rules page by click create</p>
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
  title: "About Us Rules",
  type: "object",
  required: ["title1", "title2", "title3", "description", "rulesList"],
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
    rulesList: {
      // This is the new addition
      type: "array",
      title: "Rules",
      items: {
        // Define the structure of each 'Rule' based on RulesSchema
        type: "object",
        required: ["cardTiTle", "cardpdfLink"],
        properties: {
          cardTiTle: {
            type: "string",
            title: "Card Title",
          },
          cardpdfLink: {
            type: "string",
            title: "Card PDF Link",
            format: "uri"
          },
        },
      },
    },
  },
};

export const uiSchema = {
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
    "ui:widget": "textarea", // Makes the description field a text area
    "ui:placeholder": "Enter a detailed description",
  },
  rulesList: {
    items: {
      // uiSchema for each item in the rules array
      cardTile: {
        "ui:placeholder": "Enter the card title",
      },
      cardpdfLink: {
        "ui:placeholder": "Enter the PDF link",
      },
    },
  },
};
