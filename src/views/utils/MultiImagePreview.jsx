import React, { useEffect, useState } from "react";
import { APIROOT } from "../../api/Fetcher";

export const MultiImagesWidget = (props) => {
  const [imageData, setImageData] = useState([]);

  // Convert Blob/File to Base64
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  // Load initial images from URLs
  useEffect(() => {
    let { FormData } = props;
    console.log(FormData);
    if (FormData) {
      const loadInitialImages = async () => {
        const imagesFromUrls = await Promise.all(
          FormData.HomeImage.map(async ({ url }) => {
            const response = await fetch(`${APIROOT + url}`);
            const blob = await response.blob();
            return toBase64(blob);
          })
        );
        setImageData(imagesFromUrls);
      };

      if (FormData.HomeImage && Array.isArray(FormData.HomeImage)) {
        loadInitialImages();
      }
    }
  }, [FormData.HomeImage]);

  // Handle new image selections
  const handleChange = async (event) => {
    const files = Array.from(event.target.files);
    const newImages = await Promise.all(files.map((file) => toBase64(file)));
    const updatedImages = [...imageData, ...newImages];
    setImageData(updatedImages);
    props.onChange(updatedImages); // Update RJSF formData
  };

  const handleRemoveImage = (index) => {
    // Remove the image at the given index
    const updatedImages = imageData.filter((_, i) => i !== index);
    setImageData(updatedImages);
    props.onChange(updatedImages); // Update RJSF formData
  };

  return (
    <div>
      <input type="file" onChange={handleChange} accept="image/*" multiple />
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {imageData.map((image, index) => (
          <div
            key={index}
            style={{ position: "relative", display: "inline-block" }}
          >
            <img
              src={image}
              alt={`Preview ${index}`}
              style={{ maxWidth: "100px", maxHeight: "100px" }}
            />
            <button
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                backgroundColor: "red",
                color: "white",
                border: "none",
                borderRadius: "50%",
                cursor: "pointer",
              }}
              onClick={() => handleRemoveImage(index)}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
