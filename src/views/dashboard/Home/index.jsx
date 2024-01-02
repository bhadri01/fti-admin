import React, { useEffect, useState } from "react";
import useAxiosFetcher, { APIROOT } from "../../../api/Fetcher";
import Loader from "../../../components/Loader";
import { Link, useParams } from "react-router-dom";
import { Toast } from "../../../components/alerts";

function Home() {
  const { get, data, error, loading } = useAxiosFetcher();
  const { userid } = useParams();
  const [FormData, setFormData] = useState(null);
  useEffect(() => {
    get(`/api/home/${userid}`);
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
          <HomeDataHas data={FormData?.message} />
        ) : (
          <HomeDataDont />
        )
      ) : (
        "there is no home data"
      )}
    </div>
  );
}

export default Home;

const HomeDataHas = ({ data }) => {
  console.log(data);
  return (
    <div
      style={{ maxWidth: "800px", margin: "0 auto" }}
      className="d-flex flex-column gap-3"
    >
      <div className="alert alert-primary" role="alert">
        <strong>
          This is the home page content it's reflect on your actual web site
        </strong>
      </div>

      <h3>{data?.title1}</h3>
      <h3>{data?.title2}</h3>
      <h3>{data?.title3}</h3>
      <hr />
      <p>{data?.description}</p>
      <div className="w-100 d-flex flex-wrap justify-content-center gap-3">
        {data?.HomeImage?.map(({ url }) => (
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

const HomeDataDont = () => {
  return (
    <div
      style={{ maxWidth: "800px", margin: "0 auto" }}
      className="d-flex flex-column gap-3"
    >
      <div className="alert alert-danger" role="alert">
        <strong>
          Still you don't have any home page data to show in the website
        </strong>
      </div>
      <div
        className="border border-primary p-3 rounded text-capitalize"
        style={{ width: "fit-content" }}
      >
        <p>Start creating your home page by click create</p>
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
