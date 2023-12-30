import React from "react";
import { Link } from "react-router-dom/dist";

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
  return (
    <div
      className="container"
      style={{ maxWidth: "500px", padding: "10px 0 50px 0" }}
    >
      Contact dashboard
      <Link to={"new"}>add contact</Link>
    </div>
  );
}

export default Contact;
