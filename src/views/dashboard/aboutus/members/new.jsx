import React from 'react';
import Form from '@rjsf/core';
import { SubmitButton } from '../../../utils/SubmitButtonHandler';
import RJSFFormHandler from '../../../utils/RJSFFormHandler';
import { MultiImagesWidget } from '../../../utils/MultiImagePreview';
import { schema } from '.';


const uiSchema = {
  "groupName": {
    "ui:placeholder": "Enter the Group Name"
  },
  "title": {
    "ui:placeholder": "Enter the Title"
  },
  "link": {
    "ui:widget": "uri",
    "ui:placeholder": "Enter the Link"
  }
}

const widgets = { imagesWidget: MultiImagesWidget };


function Members() {
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

export default Members;
