import { Link } from "react-router-dom";

export const schema = {
  title: "Group List",
  type: "object",
  required: ["groupName", "title", "link", "createdAt", "updatedAt"],
  properties: {
    id: {
      type: "integer",
      title: "ID",
    },
    groupName: {
      type: "string",
      title: "Group Name",
    },
    title: {
      type: "string",
      title: "Title",
    },
    link: {
      type: "string",
      title: "Link",
    },
    aboutUsGroupId: {
      type: "integer",
      title: "About Us Group ID",
    },
  },
};
function Director() {
  return (
    <div
      className="container"
      style={{ maxWidth: "500px", padding: "10px 0 50px 0" }}
    >
      Contact dashboard
      <Link to={"new"}>edit members</Link>
    </div>
  );
}

export default Director;
