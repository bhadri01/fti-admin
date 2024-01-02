import React from "react";
import { useParams } from "react-router-dom";
import { SubmitButton } from "/src/views/utils/SubmitButtonHandler";
import RJSFFormHandler from "/src/views/utils/RJSFFormHandler";
import { schema } from ".";

const value = {};

function ContactEdit() {
  const { id } = useParams();

  console.log(`id:${id}`);
  const onSubmit = ({ formData }) => {
    console.log("formData:", formData);
  };

  const props = {
    uiSchema: {},
    schema,
    SubmitButton: () => <SubmitButton name="update" color="warning" />,
    onSubmit,
    formData: value,
  };

  return <RJSFFormHandler {...props} />;
}

export default ContactEdit;
