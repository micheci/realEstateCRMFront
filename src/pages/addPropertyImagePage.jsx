import { Button, Typography, Box } from "@mui/material";
import usePropertyStore from "../store/propertyStore";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddPropertyImagePage = () => {
  const { editPropertyImages } = usePropertyStore();
  const { propertyId } = useParams();
  const navigate = useNavigate();

  const [imagesState, setImagesState] = useState([]); // Store uploaded images
  const [imagePreviews, setImagePreviews] = useState([]); // Store image previews
  const [error, setError] = useState(""); // Error message

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImagesState((prevImages) => [...prevImages, ...files]);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prevPreviews) => [...prevPreviews, ...previews]);
  };

  const handleSubmitImages = async () => {
    if (imagesState.length < 8) {
      setError("Please upload at least 8 images before submitting.");
      return;
    }

    setError(""); // Clear any existing error
    const formData = new FormData();
    imagesState.forEach((imageFile) => {
      formData.append("images", imageFile);
    });

    try {
      const result = await editPropertyImages(formData, propertyId);
      console.log(result, "inimagesfront");
      if (result.success) {
        navigate(`/properties/${result.data._id}`);
      }
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "600px",
          padding: 3,
          border: "1px solid #ccc",
          borderRadius: 2,
          boxShadow: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: "bold" }}>
          Part 2 of 2
        </Typography>

        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Add a few photos to show off your property! The more, the better!
          :)(Need atleast 8)
        </Typography>

        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Upload property images
        </Typography>

        <Button
          variant="contained"
          component="label"
          fullWidth
          sx={{ marginBottom: 2 }}
        >
          Upload Images
          <input
            type="file"
            hidden
            multiple
            accept="image/*"
            onChange={handleImageUpload}
          />
        </Button>

        {imagePreviews.length > 0 && (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              justifyContent: "center",
            }}
          >
            {imagePreviews.map((preview, index) => (
              <Box
                key={index}
                sx={{
                  width: 100,
                  height: 100,
                  overflow: "hidden",
                  borderRadius: 1,
                  boxShadow: 2,
                }}
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

        {/* Show error message if not enough images */}
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        <Button
          onClick={handleSubmitImages}
          variant="contained"
          color="secondary"
          fullWidth
          sx={{ marginTop: 2 }}
          disabled={imagesState.length < 8} // Optional: disable until valid
        >
          Submit Images
        </Button>
      </Box>
    </div>
  );
};

export default AddPropertyImagePage;
