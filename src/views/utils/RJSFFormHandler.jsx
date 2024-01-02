import React from "react";
import Form from "@rjsf/bootstrap-4";
import validator from "@rjsf/validator-ajv8";

function RJSFFormHandler(props) {
  const {
    schema,
    uiSchema = {},
    SubmitButton,
    onSubmit,
    formData = {},
    widgets = {},
  } = props;
  const log = (type) => console.log.bind(console, type);
  return (
    <div
      className="container"
      style={{ width: "clamp(400px,50%,600px)" , padding: "10px 0 50px 0" }}
    >
      <Form
        schema={schema}
        templates={{
          ButtonTemplates: {
            SubmitButton,
          },
        }}
        uiSchema={uiSchema}
        validator={validator}
        onSubmit={onSubmit}
        onError={log("errors")}
        noHtml5Validate={true}
        showErrorList={false}
        formData={formData}
        widgets={widgets}
      />
    </div>
  );
}

export default RJSFFormHandler;
