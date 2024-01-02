import React from 'react';
import Form from '@rjsf/core';
import RJSFFormHandler from '../utils/RJSFFormHandler';
import { SubmitButton } from '../utils/SubmitButtonHandler';
import { MultiImagesWidget } from '../utils/MultiImagePreview';

const schema = {
  "title": "Activity",
  "type": "object",
  "required": ["companyName", "title", "description", "date", "tags", "createdAt", "updatedAt"],
  "properties": {
    "id": {
      "type": "integer",
      "title": "ID"
    },
    "companyName": {
      "type": "string",
      "title": "Company Name"
    },
    "title": {
      "type": "string",
      "title": "Title"
    },
    "description": {
      "type": "string",
      "title": "Description"
    },
    "date": {
      "type": "string",
      "format": "date-time",
      "title": "Date"
    },
    "tags": {
      "type": "string",
      "title": "Tags"
    },
    "images": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["url"],
        "properties": {
          "url": {
            "type": "string",
            "format": "uri",
            "title": "Image URL"
          }
        }
      },
      "title": "Images"
    },
  }
}

const uiSchema = {
  "companyName": {
    "ui:placeholder": "Enter the Company Name"
  },
  "title": {
    "ui:placeholder": "Enter the Title"
  },
  "description": {
    "ui:widget": "textarea",
    "ui:placeholder": "Enter the Description"
  },
  "date": {
    "ui:widget": "datetime",
    "ui:placeholder": "Select the Date and Time"
  },
  "tags": {
    "ui:placeholder": "Enter the Tags (comma-separated)"
  },
  "images": {
    "items": {
      "url": {
        "ui:widget": "uri",
        "ui:placeholder": "Enter the Image URL"
      }
    }
  }
}

const widgets = { imagesWidget: MultiImagesWidget};


function News() {
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
}

export default News;
