import { Button, Typography, Grid2, Box } from "@mui/material";
import usePropertyStore from "../store/propertyStore";
import { useParams } from "react-router-dom";
import { useState } from "react";

const AddPropertyImagePage = () => {
  const { editPropertyImages } = usePropertyStore();
  const { propertyId } = useParams();
  const [imagesState, setImagesState] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImagesState(files);

    // Generate previews of the images
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSubmitImages = async () => {
    const formData = new FormData();

    // Append images to formData to send to the backend
    imagesState.forEach((imageFile) => {
      formData.append("images", imageFile);
    });
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]); // Log the key-value pairs
      console.log(pair[0] + ": " + pair[1].name); // Log the file name
    }
    try {
      await editPropertyImages(formData, propertyId);
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  return (
    <div>
      {/* Image upload */}
      <Typography variant="h6" sx={{ marginTop: 2 }}>
        Upload property Images
      </Typography>
      <Grid2 item xs={12}>
        <Button variant="contained" component="label" fullWidth>
          Upload Images
          <input
            type="file"
            hidden
            multiple
            accept="image/*"
            onChange={handleImageUpload}
          />
        </Button>

        {/* Display image previews */}
        {imagePreviews.length > 0 && (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, marginTop: 2 }}>
            {imagePreviews.map((preview, index) => (
              <Box
                key={index}
                sx={{ width: 100, height: 100, overflow: "hidden" }}
              >
                <img
                  src={preview}
                  alt={`preview-${index}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Box>
            ))}
          </Box>
        )}

        <Button
          onClick={handleSubmitImages}
          variant="contained"
          color="secondary"
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Submit Images
        </Button>
      </Grid2>
    </div>
  );
};

export default AddPropertyImagePage;
