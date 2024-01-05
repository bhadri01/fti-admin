import React, { useEffect } from "react";
import RJSFFormHandler from "../../views/utils/RJSFFormHandler";
import { SubmitButton } from "../../views/utils/SubmitButtonHandler";
import { Link, useNavigate } from "react-router-dom";
import useAxiosFetcher from "../../api/Fetcher";
import { Toast } from "../../components/alerts";
import { setTokenCookie } from "../../api/TokenManager";
import Loader from "../../components/Loader";

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
  cpassword: {
    "ui:widget": "password",
  },
};

function Register() {
  const { post, data, error, loading } = useAxiosFetcher();
  const router = useNavigate();
  const onSubmit = ({ formData }) => {
    if (formData.password != formData.cpassword) {
      Toast.error("password and confirm not the same");
    }
    if (loading) return;
    post("/api/auth/register", [
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    ]);
  };
  useEffect(() => {
    if (error) {
      Toast.error(error);
    }
  }, [error]);
  useEffect(() => {
    if (data) {
      Toast.success("successfully logined");
      setTokenCookie(data.message.token);
      localStorage.setItem("companyName", data.message.companyName);
      localStorage.setItem("email", data.message.email);
      router(`/${data.message.companyName}/dashboard`);
    }
  }, [data]);
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
      {loading && <Loader />}
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
