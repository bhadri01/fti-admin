import React from "react";
import { schema } from ".";
import { useParams } from "react-router-dom";
import { SubmitButton } from "../../utils/SubmitButtonHandler";
import RJSFFormHandler from "../../utils/RJSFFormHandler";

const value = {
  title: "ksjdfnksjnfdk",
  buildingName: "ksjdfnksjnfdk",
  road: "ksjdfnksjnfdk",
  district: "ksjdfnksjnfdk",
  subDistrict: "ksjdfnksjnfdk",
  province: "ksjdfnksjnfdk",
  postalCode: "ksjdfnksjnfdk",
  taxId: "ksjdfnksjnfdk",
  workingHours: "ksjdfnksjnfdk",
  phoneNo: "234234234",
  email: "ksjdfnksjnfdk",
  website: "ksjdfnksjnfdk",
  map: "ksjdfnksjnfdk",
};

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
