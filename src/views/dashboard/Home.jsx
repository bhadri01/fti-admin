import React from "react";
import RJSFFormHandler from "../utils/RJSFFormHandler";
import { SubmitButton } from "../utils/SubmitButtonHandler";
import { MultiImagesWidget } from "../utils/MultiImagePreview";

const schema = {
  title: "Home Page",
  type: "object",
  required: [
    "title1",
    "title2",
    "title3",
    "description",
    "visionTitle",
    "vision",
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
    visionTitle: {
      type: "string",
      title: "Vision Title",
    },
    vision: {
      type: "string",
      title: "Vision",
    },
    homeCarousel: {
      type: "array",
      title: "Home Carousel images",
      items: {
        type: "string",
        format: "data-url",
      },
      minItems: 2,
    },
  },
};

const uiSchema = {
  title1: {
    "ui:placeholder": "Enter Title 1",
  },
  title2: {
    "ui:placeholder": "Enter Title 2",
  },
  title3: {
    "ui:placeholder": "Enter Title 3",
  },
  description: {
    "ui:widget": "textarea",
    "ui:placeholder": "Enter a description",
  },
  visionTitle: {
    "ui:placeholder": "Enter the Vision Title",
  },
  vision: {
    "ui:widget": "textarea",
    "ui:placeholder": "Describe the vision",
  },
  homeCarousel: {
    "ui:widget": "imagesWidget",
    "ui:description":
      "upload the images for home carousel that display the images in the home page",
    "ui:options": {
      accept: ".png",
    },
  },
};

const widgets = { imagesWidget: MultiImagesWidget };

const Home = () => {
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

export default Home;
