import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Container,
  FormControlLabel,
  Checkbox,
  Grid,
} from "@mui/material";
import usePropertyStore from "../store/propertyStore";
import { useNavigate } from "react-router-dom";

const AddPropertyPage = () => {
  const [propertyData, setPropertyData] = useState({
    title: "",
    address: "",
    description: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    images: [],
    city: "",
    street: "",
    state: "",
    zip: "",
    garage: false,
    parkingSpaces: "",
    swimmingPool: false,
    fireplace: false,
    basement: false,
    attic: false,
    airConditioning: false,
    remodeled: false,
    securitySystem: false,
    smartHome: false,
    fence: false,
    petsAllowed: false,
    walkInClosets: false,
    hoaFees: "",
    outdoorSpace: "",
  });
  const [imagesState, setImagesState] = useState([]);
  const { createProperty } = usePropertyStore();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setPropertyData({ ...propertyData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setPropertyData({ ...propertyData, [e.target.name]: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await createProperty(propertyData);
    if (result.success) {
      navigate(`/properties/${result.data._id}`);
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    console.log(files, "imagefiles");
    setImagesState(files);
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
    // try {
    //   const response = await fetch("YOUR_BACKEND_URL/upload", {
    //     method: "POST",
    //     body: formData,
    //   });
    //   const data = await response.json();

    //   if (data.success) {
    //     console.log("Images uploaded successfully!");
    //     // You can update the propertyData with the uploaded image URLs if necessary
    //   } else {
    //     console.error("Error uploading images:", data.message);
    //   }
    // } catch (error) {
    //   console.error("Upload failed", error);
    // }
  };

  return (
    <Container sx={{ paddingY: 4, display: "flex", justifyContent: "center" }}>
      <Paper elevation={4} sx={{ padding: 4, width: "100%", maxWidth: 600 }}>
        <Typography variant="h4" gutterBottom>
          Add New Property
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Title"
                name="title"
                fullWidth
                required
                value={propertyData.title}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address"
                name="address"
                fullWidth
                required
                value={propertyData.address}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                fullWidth
                multiline
                rows={4}
                required
                value={propertyData.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Price ($)"
                name="price"
                type="number"
                fullWidth
                required
                value={propertyData.price}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Bedrooms"
                name="bedrooms"
                type="number"
                fullWidth
                required
                value={propertyData.bedrooms}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Bathrooms"
                name="bathrooms"
                type="number"
                fullWidth
                required
                value={propertyData.bathrooms}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Area (sq ft)"
                name="area"
                type="number"
                fullWidth
                required
                value={propertyData.area}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          {/* Image upload */}
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Upload property Images
          </Typography>
          <Grid item xs={12}>
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
            {propertyData.images.length > 0 && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                {propertyData.images.length} image(s) selected
              </Typography>
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
          </Grid>

          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Features
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {[
              "garage",
              "swimmingPool",
              "fireplace",
              "basement",
              "attic",
              "airConditioning",
              "remodeled",
              "securitySystem",
              "smartHome",
              "fence",
              "petsAllowed",
              "walkInClosets",
            ].map((feature) => (
              <Grid
                item
                xs={6}
                sm={4}
                md={3}
                key={feature}
                sx={{ textAlign: "center" }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={propertyData[feature]}
                      onChange={handleCheckboxChange}
                      name={feature}
                    />
                  }
                  label={feature.replace(/([A-Z])/g, " $1").trim()}
                />
              </Grid>
            ))}
          </Grid>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Submit Property
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default AddPropertyPage;
