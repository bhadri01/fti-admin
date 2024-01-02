import { Link } from "react-router-dom";


export const schema = {
  "title": "About Us Director",
  "type": "object",
  "required": ["companyName", "title1", "description", "fileLink", "createdAt", "updatedAt"],
  "properties": {
    "id": {
      "type": "integer",
      "title": "ID"
    },
    "companyName": {
      "type": "string",
      "title": "Company Name"
    },
    "title1": {
      "type": "string",
      "title": "Title 1"
    },
    "title2": {
      "type": "string",
      "title": "Title 2"
    },
    "title3": {
      "type": "string",
      "title": "Title 3"
    },
    "description": {
      "type": "string",
      "title": "Description"
    },
    "fileLink": {
      "type": "string",
      "title": "File Link"
    },

  }
}

function Director() {
  return (
    <div
      className="container"
      style={{ maxWidth: "500px", padding: "10px 0 50px 0" }}
    >
      Contact dashboard
      <Link to={"new"}>edit director</Link>
    </div>
  );
}

export default Director;
