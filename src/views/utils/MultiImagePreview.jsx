import React, { useEffect, useState } from "react";
import { APIROOT } from "../../api/Fetcher";

export const MultiImagesWidget = (props) => {
  const [images, setImages] = useState([]);

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
    if (FormData) {
      const loadInitialImages = async () => {
        const imagesFromUrls = await Promise.all(
          FormData.HomeImage.map(async ({ url }) => {
            const response = await fetch(`${APIROOT + url}`);
            const blob = await response.blob();
            return toBase64(blob);
          })
        );
        setImages(imagesFromUrls);
        props.onChange(imagesFromUrls);
      };

      if (FormData.HomeImage && Array.isArray(FormData.HomeImage)) {
        loadInitialImages();
      }
    }
  }, [FormData]);

  // Handle new image selections
  const handleChange = async (event) => {
    const files = Array.from(event.target.files);
    const newImages = await Promise.all(files.map((file) => toBase64(file)));
    const updatedImages = [...images, ...newImages];
    setImages(updatedImages);
    props.onChange(updatedImages); // Update RJSF formData
    event.target.value = "";
  };

  const handleRemoveImage = (index) => {
    // Remove the image at the given index
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    props.onChange(updatedImages); // Update RJSF formData
  };

  return (
    <div>
      <div style={{ position: "relative" }}>
        <input
          type="file"
          onChange={handleChange}
          style={{ opacity: 0, position: "absolute" }}
          id="chooseImage"
          accept="image/*"
          multiple
        />
        <label
          htmlFor="chooseImage"
          className="rounded d-flex justify-content-center align-items-center my-3"
          style={{
            fontSize: "30px",
            width: "70px",
            height: "70px",
            cursor: "pointer",
            border: "2px dashed #ccc",
          }}
        >
          <i className="bi bi-images"></i>
        </label>
      </div>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {images.map((image, index) => (
          <>
            <div
              className="card"
              style={{
                position: "relative",
                display: "inline-block",
                width: "10rem",
                height: "10rem",
                overflow: "hidden",
                backgroundColor: "transparent",
              }}
              key={index + image.slice(-15)}
            >
              <img
                src={image}
                alt={`Preview ${index}`}
                className="card-img-top"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div className="card-body">
                <button
                  className="bg-danger p-2 d-flex justify-content-center align-items-center rounded"
                  style={{
                    position: "absolute",
                    top: "-1px",
                    right: "-1px",
                    border: "none",
                    outline: "none",
                    width: "30px",
                    height: "30px",
                  }}
                  onClick={() => handleRemoveImage(index)}
                >
                  <i
                    className="bi bi-x"
                    style={{ fontSize: "25px", fontWeight: "900" }}
                  ></i>
                </button>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};
