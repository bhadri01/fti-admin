import React from 'react';
import RJSFFormHandler from '../../../utils/RJSFFormHandler';
import { SubmitButton } from '../../../utils/SubmitButtonHandler';
import { MultiImagesWidget } from "../../../utils/MultiImagePreview";
import { schema } from '.';


const MembersSchema = {
  "title": "Committee Member",
  "type": "object",
  "required": ["name", "personTitle", "image", "isPresident"],
  "properties": {
    "name": {
      "type": "string",
      "title": "Name"
    },
    "personTitle": {
      "type": "string",
      "title": "Person Title"
    },
    "image": {
      "type": "string",
      "title": "Image"
    },
    "isPresident": {
      "type": "boolean",
      "title": "Is President"
    },
  }
}

const uiSchema = {
  "aboutUsDirector": {
    "companyName": {
      "ui:placeholder": "Enter Company Name"
    },
    "description": {
      "ui:widget": "textarea"
    }
  },
  "Members": {
    "name": {
      "ui:placeholder": "Enter Full Name"
    },
    "image": {
      "ui:widget": "file"
    }
  }
}



const widgets = { imagesWidget: MultiImagesWidget };
function NewDirector() {
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

export default NewDirector;


