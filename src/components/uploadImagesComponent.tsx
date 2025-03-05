import React, { useState } from "react";
import usePropertyStore from "../store/propertyStore";
import { useParams } from "react-router-dom";

const UploadImagesComponent = ({ images, setImages }) => {
  const [fileList, setFileList] = useState<File[]>([]); // Track selected files for upload
  const { editPropertyImages } = usePropertyStore();
  const { propertyId: propertyID } = useParams();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImageFiles = Array.from(files);

      // Convert the files to URLs for preview
      const newImageURLs = newImageFiles.map((file) =>
        URL.createObjectURL(file)
      );

      // Update the images state by adding new images (just for preview)
      setImages((prevImages) => [...prevImages, ...newImageURLs]);

      // Update the fileList state with the files selected
      setFileList((prevFiles) => [...prevFiles, ...newImageFiles]);
    }
  };

  const onUploadImages = async () => {
    try {
      const formData = new FormData();
      fileList.forEach((file) => {
        formData.append("images", file); // 'images' is the key your backend expects
      });

      // Log the contents of FormData
      formData.forEach((value, key) => {
        console.log(key, value);
      });
      const result = await editPropertyImages(formData, propertyID);
      console.log(result, "images are greate in front");
      // Send the form data to the backend for image upload
      // const response = await axios.post("/api/upload", formData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });

      // // Assuming the backend responds with the URLs of the uploaded images
      // const newImages = response.data.imageUrls; // Adjust to your backend response structure

      // // Update the property images state with the new URLs
      // setImages((prevImages) => [...prevImages, ...newImages]);
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Property Images</h2>

      {/* Display the existing images */}
      <div className="grid grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div key={index} className="border p-2 rounded-md shadow">
            <img
              src={image}
              alt={`Property ${index + 1}`}
              className="w-full h-32 object-cover rounded-md"
            />
          </div>
        ))}
      </div>

      {/* Upload new images */}
      <div className="mt-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          multiple
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
        />
      </div>

      {/* Button to upload selected images */}
      <div className="mt-4">
        <button
          onClick={onUploadImages}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
        >
          Upload Images
        </button>
      </div>
    </div>
  );
};

export default UploadImagesComponent;
