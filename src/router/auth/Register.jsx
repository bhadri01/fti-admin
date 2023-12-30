import React from "react";
import RJSFFormHandler from "../../views/utils/RJSFFormHandler";
import { SubmitButton } from "../../views/utils/SubmitButtonHandler";
import { Link } from "react-router-dom";

const schema = {
  title: "FTI Admin Register",
  type: "object",
  properties: {
    email: {
      type: "string",
      format: "email",
      title: "Email",
    },
    companyName: {
      type: "string",
      title: "Company Name",
    },
    password: {
      type: "string",
      title: "Password",
    },
    cpassword: {
      type: "string",
      title: "Confirm Password",
    },
  },
  required: ["email", "companyName", "password", "cpassword"],
};
const uiSchema = {
  password: {
    "ui:widget": "password",
  },
};

function Register() {
  const onSubmit = ({ formData }) => {
    console.log("formData:", formData);
  };
  const props = {
    uiSchema,
    schema,
    SubmitButton: () => <SubmitButton name="create" color="primary" />,
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
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
