import React from "react";
import { SubmitButton } from "../../utils/SubmitButtonHandler";
import { schema } from ".";
import RJSFFormHandler from "../../utils/RJSFFormHandler";

const uiSchema = {
  title: {
    "ui:autofocus": true,
  },
};

function ContactNew() {
  const onSubmit = ({ formData }) => {
    console.log("formData:", formData);
  };
  const props = {
    uiSchema,
    schema,
    SubmitButton: () => <SubmitButton name="create" color="primary" />,
    onSubmit,
  };

  return <RJSFFormHandler {...props} />;
}

export default ContactNew;
