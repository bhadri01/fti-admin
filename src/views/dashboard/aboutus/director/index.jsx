import { Link } from "react-router-dom";

export const schema = {
  title: "About Us Director",
  type: "object",
  required: [
    "title1",
    "title2",
    "title3",
    "description",
    "fileLink",
    "committeeMembers",
  ],
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
    fileLink: {
      type: "string",
      title: "File Link",
    },
    committeeMembers: {
      type: "array",
      title: "Committee Members",
      items: {
        type: "object",
        required: ["name", "personTitle", "image", "isPresident"],
        properties: {
          name: {
            type: "string",
            title: "Name",
          },
          personTitle: {
            type: "string",
            title: "Person Title",
          },
          image: {
            type: "string",
            title: "Image",
          },
          isPresident: {
            type: "boolean",
            title: "Is President",
          },
        },
      },
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
      <Link to={"new"}>edit director</Link>
    </div>
  );
}

export default Director;
