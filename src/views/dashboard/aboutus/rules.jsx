import React from 'react';
import Form from '@rjsf/core';
import RJSFFormHandler from '../../utils/RJSFFormHandler';
import { SubmitButton } from '../../utils/SubmitButtonHandler';
import { MultiImagesWidget } from '../../utils/MultiImagePreview';

const schema = {
  "title": "About Us Rules",
  "type": "object",
  "required": ["companyName", "title1", "description", "createdAt", "updatedAt"],
  "properties": {
    "id": {
      "type": "integer",
      "title": "ID"
    },
    "companyName": {
      "type": "string",
      "title": "Company Name"
    },
    "title1": {
      "type": "string",
      "title": "Title 1"
    },
    "title2": {
      "type": "string",
      "title": "Title 2"
    },
    "title3": {
      "type": "string",
      "title": "Title 3"
    },
    "description": {
      "type": "string",
      "title": "Description"
    },
  }
}

const RulesSchema = {
  "title": "Rules",
  "type": "object",
  "required": ["cardTile", "cardpdfLink", "createdAt", "updatedAt"],
  "properties": {
    "id": {
      "type": "integer",
      "title": "ID"
    },
    "cardTile": {
      "type": "string",
      "title": "Card Title"
    },
    "cardpdfLink": {
      "type": "string",
      "title": "Card PDF Link"
    },
    "aboutUsRulesId": {
      "type": "integer",
      "title": "About Us Rules ID"
    },
    "createdAt": {
      "type": "string",
      "format": "date-time",
      "title": "Created At"
    },
    "updatedAt": {
      "type": "string",
      "format": "date-time",
      "title": "Updated At"
    }
  }
}

const uiSchema = {
  "aboutUsRules": {
    "companyName": {
      "ui:placeholder": "Enter Company Name"
    },
    "description": {
      "ui:widget": "textarea"
    }
  },
  "Rules": {
    "cardTile": {
      "ui:placeholder": "Enter Card Title"
    },
    "cardpdfLink": {
      "ui:widget": "file"
    }
  }
}

const widgets = { imagesWidget: MultiImagesWidget };



function Rules() {
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

export default Rules;
