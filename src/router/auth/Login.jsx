import React, { useEffect } from "react";
import RJSFFormHandler from "../../views/utils/RJSFFormHandler";
import { SubmitButton } from "../../views/utils/SubmitButtonHandler";
import { Link, useNavigate } from "react-router-dom";
import useAxiosFetcher from "../../api/Fetcher";
import { Toast } from "../../components/alerts";
import { useState } from "react";
import Loader from "../../components/Loader";
import { setTokenCookie } from "../../api/TokenManager";

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
  const { post, data, error, loading } = useAxiosFetcher();
  const router = useNavigate();
  const onSubmit = async ({ formData }) => {
    // Prevent further action if already loading
    if (loading) return;
    post("/api/auth/login", [
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

  var props = {
    uiSchema,
    schema,
    SubmitButton: () => (
      <SubmitButton loading={loading} name="login" color="primary" />
    ),
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
