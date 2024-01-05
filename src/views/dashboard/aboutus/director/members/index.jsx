import React, { useEffect, useState } from "react";
import useAxiosFetcher, { APIROOT } from "../../../../../api/Fetcher";
import { Link, useParams } from "react-router-dom";
import { Toast } from "../../../../../components/alerts";
import Loader from "../../../../../components/Loader";
import { getTokenCookie } from "../../../../../api/TokenManager";
import Model from "../../../../../components/modal";

function DirectMember() {
  const { get, del, data, error, loading } = useAxiosFetcher();
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
    if (data) {
      if (typeof data.message === "string" && data.status) {
        Toast.success(data.message);
        get(`/api/aboutus/director/${userid}`);
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

export default DirectMember;

const ActivityDataHas = ({ data, del, userid }) => {
  //delete
  const [modalShow, setModalShow] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const openModal = (article) => {
    setSelectedArticle(article);
    setModalShow(true);
  };

  const closeModal = () => setModalShow(false);

  const confirmDelete = (id) => {
    // Your delete logic here, using the article ID or other identifier
    console.log("Deleting article with ID:", id);
    // perform delete action here (like calling an API)
    del(`/api/aboutus/director/${userid}/director/${id}`, [
      {
        headers: {
          Authorization: `Bearer ${getTokenCookie()}`,
        },
      },
    ]);
    closeModal();
  };
  return (
    <div
      style={{ maxWidth: "800px", margin: "0 auto" }}
      className="d-flex flex-column gap-3"
    >
      <Model
        show={modalShow}
        handleClose={closeModal}
        handleConfirm={confirmDelete}
        title="Confirm Delete"
        body={`Are you sure you want to delete this member: ${selectedArticle}?`}
        itemToDelete={selectedArticle}
      />
      <div className="alert alert-primary" role="alert">
        <strong>
          This is the Director members page list it's reflected on your actual
          website
        </strong>
      </div>

      <div
        className="border border-primary p-3 rounded text-capitalize"
        style={{ width: "fit-content" }}
      >
        <p>Start creating your Direct members list by click create</p>
        <button type="button" className="btn btn-success">
          <Link style={{ all: "unset" }} to={"new"}>
            create
          </Link>
        </button>
      </div>

      {/* Table to display the data */}

      {data?.committeeMember.length > 0 && (
        <div
          style={{
            overflow: "auto",
            width: "100%",
            backgroundColor: "#1f2937",
          }}
          className="d-flex gap-3 flex-wrap p-3 rounded"
        >
          {data?.committeeMember?.map((e, i) => (
            <div
              className="card text-white border"
              style={{ width: "18rem", backgroundColor: "transparent" }}
              key={e.id}
            >
              <div className="d-flex flex-column justify-content-between p-3 gap-3" style={{height:"100%"}}>
                <div className="d-flex justify-content-start align-items-center gap-2">
                  <img
                    src={APIROOT + e.memberImage[0].url}
                    alt="member"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      objectPosition: "top",
                    }}
                  />
                  <strong>{e.name}</strong>
                </div>
                <div>{e.personTitle}</div>
                <div className="d-flex gap-2 flex-wrap">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => openModal(e.id)}
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
      )}
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
  title: "Member Information",
  type: "object",
  required: ["name", "personTitle", "isPresident", "memberImage"],
  properties: {
    name: {
      type: "string",
      title: "Name",
      minLength: 2,
    },
    personTitle: {
      type: "string",
      title: "Title",
      minLength: 2,
    },
    isPresident: {
      type: "boolean",
      title: "Is President?",
    },
    memberImage: {
      type: "array",
      title: "Member Images",
      items: {
        type: "string",
        format: "data-url",
      },
      minItems: 1,
      uniqueItems: true,
    },
  },
};

export const uiSchema = {
  name: {
    "ui:placeholder": "Enter the member's name",
  },
  personTitle: {
    "ui:placeholder": "Enter the member's title",
  },
  isPresident: {
    "ui:widget": "select",
    "ui:options": {
      enumTitles: ["Yes", "No"],
    },
  },
  memberImage: {
    "ui:widget": "imagesWidget",
    "ui:help": "Select image for the member",
    "ui:options": {
      accept: "image/*",
    },
  },
};
