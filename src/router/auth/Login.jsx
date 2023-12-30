import React from "react";
import RJSFFormHandler from "../../views/utils/RJSFFormHandler";
import { SubmitButton } from "../../views/utils/SubmitButtonHandler";
import { Link } from "react-router-dom";

const schema = {
  title: "FTI Login",
  type: "object",
  properties: {
    email: {
      type: "string",
      format: "email",
      title: "Email",
    },
    password: {
      type: "string",
      title: "Password",
    },
  },
  required: ["email", "password"],
};
const uiSchema = {
  password: {
    "ui:widget": "password",
  },
};

function login() {
  const onSubmit = ({ formData }) => {
    console.log("formData:", formData);
  };
  const props = {
    uiSchema,
    schema,
    SubmitButton: () => <SubmitButton name="login" color="primary" />,
    onSubmit,
  };

  return (
    <div
      className="w-100 d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <RJSFFormHandler {...props} />
      <div className="px-3">
        <div className="fs-5">
          Create new account? <Link to="/register">Register</Link>
        </div>
        {/* <p className="forgot-password text-right fs-5">
          Forgot <Link to="/forgotpassword">password?</Link>
        </p> */}
      </div>
    </div>
  );
}

export default login;
