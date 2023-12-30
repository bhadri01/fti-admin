import React from "react";
import { MultiImagesWidget } from "../../utils/MultiImagePreview";
import RJSFFormHandler from "../../utils/RJSFFormHandler";
import { SubmitButton } from "../../utils/SubmitButtonHandler";

const schema = {
  title: "About vision",
  type: "object",
  required: ["about", "aboutDesc", "vision", "visionDesc", "aboutImage"],
  properties: {
    about: {
      type: "string",
      title: "About Title",
    },
    aboutDesc: {
      type: "string",
      title: "About Description",
    },
    vision: {
      type: "string",
      title: "Vision Title",
    },
    visionDesc: {
      type: "string",
      title: "Vision Description",
    },
    aboutImage: {
      type: "array",
      title: "About Image",
      items: {
        type: "string",
        format: "data-url",
      },
      maxItems: 1,
    },
  },
};

const uiSchema = {
  about: {
    "ui:widget": "text",
    "ui:placeholder": "About Title",
  },
  aboutDesc: {
    "ui:widget": "textarea",
    "ui:placeholder": "Detailed description about...",
  },
  vision: {
    "ui:widget": "text",
    "ui:placeholder": "Vision Title",
  },
  visionDesc: {
    "ui:widget": "textarea",
    "ui:placeholder": "Detailed vision description...",
  },
  aboutImage: {
    "ui:widget": "imagesWidget",
    "ui:description": "upload the image for the aboutus page",
    "ui:options": {
      accept: "image/*",
    },
  },
};
const widgets = { imagesWidget: MultiImagesWidget };

const Vision = () => {
  const onSubmit = ({ formData }) => {
    console.log("formData:", formData);
  };
  const props = {
    uiSchema,
    schema,
    SubmitButton: () => <SubmitButton name="create" color="primary" />,
    onSubmit,
    widgets,
  };

  return <RJSFFormHandler {...props} />;
};

export default Vision;
