import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom/dist";
import useAxiosFetcher from "../../../api/Fetcher";
import Loader from "../../../components/Loader";
import { Toast } from "../../../components/alerts";
import { getTokenCookie } from "../../../api/TokenManager";
import Model from "../../../components/modal";

export const schema = {
  title: "Contact Information",
  type: "object",
  required: [
    "title",
    "buildingName",
    "road",
    "district",
    "subDistrict",
    "province",
    "postalCode",
    "taxId",
    "workingHours",
    "phoneNo",
    "email",
    "website",
    "map",
  ],
  properties: {
    title: { type: "string", title: "Title" },
    buildingName: { type: "string", title: "Building Name" },
    road: { type: "string", title: "Road" },
    district: { type: "string", title: "District" },
    subDistrict: { type: "string", title: "Sub District" },
    province: { type: "string", title: "Province" },
    postalCode: { type: "string", title: "Postal Code" },
    taxId: { type: "string", title: "Tax ID" },
    workingHours: { type: "string", title: "Working Hours" },
    phoneNo: { type: "integer", title: "Phone Number" },
    email: { type: "string", title: "Email", format: "email" },
    website: { type: "string", title: "Website link", format: "uri" },
    map: { type: "string", title: "Map URL", format: "uri" },
  },
};

function Contact() {
  const { get, del, data, error, loading } = useAxiosFetcher();
  const { userid } = useParams();
  const [FormData, setFormData] = useState(null);
  useEffect(() => {
    get(`/api/contact/${userid}`);
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
  return (
    <div className="position-relative w-100 h-100 p-2">
      {loading ? (
        <Loader />
      ) : FormData ? (
        FormData?.status ? (
          <ContactDataHas data={FormData?.message} del={del} userid={userid} />
        ) : (
          <ContactDataDont />
        )
      ) : (
        "There is no Contact data"
      )}
    </div>
  );
}

export default Contact;

const ContactDataHas = ({ data, del, userid }) => {
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
    del(`/api/contact/${userid}/${id}`, [
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
        body={`Are you sure you want to delete this contact: ${selectedArticle}?`}
        itemToDelete={selectedArticle}
      />
      <div className="alert alert-primary" role="alert">
        <strong>
          This is the contact page content; it's reflected on your actual
          website
        </strong>
      </div>

      <div
        className="border border-primary p-3 rounded text-capitalize"
        style={{ width: "fit-content" }}
      >
        <p>Start creating your contact list by click create</p>
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
              <p className="card-text">
                {e.buildingName + ", " + e.road + ", " + e.district}
              </p>
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
    </div>
  );
};

const ContactDataDont = () => (
  <div
    style={{ maxWidth: "800px", margin: "0 auto" }}
    className="d-flex flex-column gap-3"
  >
    <div className="alert alert-danger" role="alert">
      <strong>
        Still you don't have any contact list data to show in the website
      </strong>
    </div>
    <div
      className="border border-primary p-3 rounded text-capitalize"
      style={{ width: "fit-content" }}
    >
      <p>Start creating your contact page by click create</p>
      <button type="button" className="btn btn-success">
        <Link style={{ all: "unset" }} to={"new"}>
          create
        </Link>
      </button>
    </div>
  </div>
);
