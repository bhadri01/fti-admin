import React, { useState } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";

const ImageWidget = (props) => {
  const [images, setImages] = useState([]);

  const handleChange = (event) => {
    const files = Array.from(event.target.files);  // Handle multiple files
    Promise.all(files.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    })).then(imagesDataUrls => {
      setImages(imagesDataUrls);
      props.onChange(imagesDataUrls);  // Update the form with an array of data URLs
    });
  };

  return (
    <div>
      <input type="file" onChange={handleChange} accept="image/png" multiple />
      <div>
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Preview ${index}`} style={{ maxWidth: "200px" }} />
        ))}
      </div>
    </div>
  );
};


const schema = {
  type: "object",
  properties: {
    image: {
      type: "array",
      format: "data-url", // Use the data-url format for image data
      items: {
        type: "string",
        format: "data-url",
      },
    },
  },
};

const uiSchema = {
  image: {
    "ui:widget": "imageWidget",
    "ui:options": {
      accept: ".png",
    },
  },
};

const ImagePreview = () => (
  <Form
    validator={validator}
    schema={schema}
    uiSchema={uiSchema}
    widgets={{ imageWidget: ImageWidget }}
    onSubmit={({ formData }) => console.log("Data submitted: ", formData)}
  />
);

export default ImagePreview;
