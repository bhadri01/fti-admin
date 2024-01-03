import React, { useEffect, useState } from "react";
import useAxiosFetcher from "../../../api/Fetcher";
import { Link, useParams } from "react-router-dom";
import Loader from "../../../components/Loader";
import { Toast } from "../../../components/alerts";
import { getTokenCookie } from "../../../api/TokenManager";

function Activity() {
  const { get, del, data, error, loading } = useAxiosFetcher();
  const { userid } = useParams();
  const [FormData, setFormData] = useState(null);

  useEffect(() => {
    get(`/api/activity/${userid}`);
  }, []);

  useEffect(() => {
    if (error && FormData) {
      Toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      if (typeof data.message === "string" && data.status) {
        Toast.success(data.message);
        get(`/api/contact/${userid}`);
      } else {
        setFormData(data);
      }
    }
  }, [data]);

  console.log(FormData);

  return (
    <div className="position-relative w-100 h-100 p-2">
      {loading ? (
        <Loader />
      ) : FormData ? (
        FormData?.status ? (
          <ActivityDataHas data={FormData?.message} del={del} userid={userid} />
        ) : (
          <ActivityDataDont />
        )
      ) : (
        "there is no home data"
      )}
    </div>
  );
}

export default Activity;

const ActivityDataHas = ({ data, del, userid }) => {
  const ContactDelete = (id) => {
    del(`/api/activity/${userid}/${id}`, [
      {
        headers: {
          Authorization: `Bearer ${getTokenCookie()}`,
        },
      },
    ]);
  };
  return (
    <div
      style={{ maxWidth: "800px", margin: "0 auto" }}
      className="d-flex flex-column gap-3"
    >
      <div className="alert alert-primary" role="alert">
        <strong>
          This is the artical page content; it's reflected on your actual
          website
        </strong>
      </div>

      <div
        className="border border-primary p-3 rounded text-capitalize"
        style={{ width: "fit-content" }}
      >
        <p>Start creating your artical list by click create</p>
        <button type="button" className="btn btn-success">
          <Link style={{ all: "unset" }} to={"new"}>
            create
          </Link>
        </button>
      </div>

      {/* Table to display the data */}
      <div
        style={{ overflow: "auto", width: "100%", backgroundColor: "#1f2937" }}
        className="d-flex gap-3 flex-wrap p-3 rounded"
      >
        {data?.map((e, i) => (
          <div
            className="card text-white border"
            style={{ width: "18rem", backgroundColor: "transparent" }}
            key={e.id}
          >
            <div className="card-body">
              <h5 className="card-title" style={{ fontSize: "30px" }}>
                {i + 1}
              </h5>
              <h6 className="card-subtitle mb-2 text-body-white">
                <strong>{e.title}</strong>
              </h6>
              <p className="card-text">{new Date(e.date).toDateString()}</p>
              <div className="d-flex gap-2 flex-wrap">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => ContactDelete(e.id)}
                >
                  <i className="bi bi-trash-fill"></i>
                </button>
                <Link to={`edit/${e.id}`} style={{ all: "unset" }}>
                  <button type="button" className="btn btn-warning">
                    update
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ActivityDataDont = () => {
  return (
    <div
      style={{ maxWidth: "800px", margin: "0 auto" }}
      className="d-flex flex-column gap-3"
    >
      <div className="alert alert-danger" role="alert">
        <strong>
          Still you don't have any activity list data to show in the website
        </strong>
      </div>
      <div
        className="border border-primary p-3 rounded text-capitalize"
        style={{ width: "fit-content" }}
      >
        <p>Start creating your activity page by click create</p>
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
  title: "Activity",
  type: "object",
  required: ["title", "description", "date", "tags"],
  properties: {
    title: {
      type: "string",
      title: "Title",
    },
    description: {
      type: "string",
      title: "Description",
    },
    date: {
      type: "string",
      format: "date-time",
      title: "Date",
    },
    tags: {
      type: "string",
      title: "Tags",
    },
    images: {
      type: "array",
      title: "Artical Carousel images",
      items: {
        type: "string",
        format: "data-url",
      },
      minItems: 2,
    },
  },
};

export const uiSchema = {
  companyName: {
    "ui:placeholder": "Enter the Company Name",
  },
  title: {
    "ui:placeholder": "Enter the Title",
  },
  description: {
    "ui:widget": "textarea",
    "ui:placeholder": "Enter the Description",
  },
  date: {
    "ui:widget": "datetime",
    "ui:placeholder": "Select the Date and Time",
  },
  tags: {
    "ui:placeholder": "Enter the Tags (comma-separated)",
  },
  images: {
    "ui:widget": "imagesWidget",
    "ui:description":
      "upload the images for artical carousel that display the images in the artical page",
    "ui:options": {
      accept: ".png",
    },
  },
};
