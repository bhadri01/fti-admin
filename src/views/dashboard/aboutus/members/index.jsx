import { Link, useParams } from "react-router-dom";
import useAxiosFetcher from "../../../../api/Fetcher";
import { useEffect, useState } from "react";
import { Toast } from "../../../../components/alerts";
import Loader from "../../../../components/Loader";

function Members() {
  const { get, data, error, loading } = useAxiosFetcher();
  const { userid } = useParams();
  const [FormData, setFormData] = useState(null);
  useEffect(() => {
    get(`/api/aboutus/members/${userid}`);
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
          <MembersDataHas data={FormData?.message} />
        ) : (
          <MembersDataDont />
        )
      ) : (
        "there is no home data"
      )}
    </div>
  );
}

export default Members;

const MembersDataHas = ({ data }) => {
  return (
    <div
      style={{ maxWidth: "800px", margin: "0 auto" }}
      className="d-flex flex-column gap-3"
    >
      <div className="alert alert-primary" role="alert">
        <strong>
          This is the Group members page content it's reflect on your actual web
          site
        </strong>
      </div>
      <div>
        <h1>
          {" "}
          <h5 style={{ textDecoration: "underline" }}>Title: </h5>
          {data.title}
        </h1>
        <hr />
        <h5 style={{ textDecoration: "underline" }}>Group members: </h5>
        {data.groupList.map((group) => (
          <div key={group.id} className="card mb-3">
            <div className="card-header">
              <h3>{group.groupName}</h3>
            </div>
            <ul className="list-group list-group-flush">
              {group.GroupMember.map((member) => (
                <li key={member.id} className="list-group-item">
                  <strong className="text-dark">{member.title}</strong> -{" "}
                  <a
                    href={member.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Link
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div
        className="border border-primary p-3 rounded text-capitalize"
        style={{ width: "fit-content" }}
      >
        <p>need to update your Group members content click update</p>
        <button type="button" className="btn btn-warning">
          <Link style={{ all: "unset" }} to={"edit"}>
            update
          </Link>
        </button>
      </div>
    </div>
  );
};
const MembersDataDont = () => {
  return (
    <div
      style={{ maxWidth: "800px", margin: "0 auto" }}
      className="d-flex flex-column gap-3"
    >
      <div className="alert alert-danger" role="alert">
        <strong>
          Still you don't have any{" "}
          <u>
            <i>Members page</i>
          </u>{" "}
          data to show in the website
        </strong>
      </div>
      <div
        className="border border-primary p-3 rounded text-capitalize"
        style={{ width: "fit-content" }}
      >
        <p>Start creating your members page by click create</p>
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
  title: "Group Members",
  type: "object",
  required: ["title", "groupList"],
  properties: {
    title: {
      type: "string",
      title: "Query Title",
    },
    groupList: {
      type: "array",
      title: "Groups",
      items: {
        type: "object",
        required: ["groupName", "GroupMember"],
        properties: {
          groupName: {
            type: "string",
            title: "Group Name",
          },
          GroupMember: {
            type: "array",
            title: "Members",
            items: {
              type: "object",
              required: ["title", "link"],
              properties: {
                title: {
                  type: "string",
                  title: "Member Title",
                },
                link: {
                  type: "string",
                  title: "Member Link",
                  format: "uri",
                },
              },
            },
          },
        },
      },
    },
  },
};

export const uiSchema = {
  groupList: {
    items: {
      groupName: {
        "ui:placeholder": "Enter the group name",
      },
      members: {
        items: {
          title: {
            "ui:placeholder": "Enter member's title",
          },
          link: {
            "ui:placeholder": "Enter member's link",
          },
        },
      },
    },
  },
};
