import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Container,
  FormControlLabel,
  Checkbox,
  MenuItem,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import usePropertyStore from "../store/propertyStore";
import { useNavigate } from "react-router-dom";

const AddPropertyPage = () => {
  const [propertyData, setPropertyData] = useState({
    title: "",
    description: "",
    price: "",
    // agentId: "",
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
    appliancesIncluded: [],
    outdoorSpace: "",
    securitySystem: false,
    smartHome: false,
    fence: false,
    hoaFees: "",
    petsAllowed: false,
    walkInClosets: false,
  });

  const { createProperty } = usePropertyStore();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setPropertyData({ ...propertyData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setPropertyData({ ...propertyData, [e.target.name]: e.target.checked });
  };

  const handleArrayChange = (e) => {
    const value = e.target.value;
    setPropertyData({
      ...propertyData,
      appliancesIncluded: typeof value === "string" ? value.split(",") : value,
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setPropertyData({ ...propertyData, images: files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Append all property data (except images)
    Object.keys(propertyData).forEach((key) => {
      if (key === "images") return; // Skip images, handle separately below
      formData.append(key, propertyData[key]);
    });

    // Append image files separately
    propertyData.images.forEach((image) => {
      formData.append("images", image);
    });

    console.log("Submitting FormData:", formData);

    const result = await createProperty(formData);
    console.log(result.data._id, "PROPERTYID");
    console.log(result.success, "BOOLEAN");
    if (result.success) {
      navigate(`properties/${result.data._id}`);
    }
  };

  return (
    <Container sx={{ paddingY: 4 }}>
      <Typography variant="h4" gutterBottom>
        Add New Property
      </Typography>

      <Paper elevation={4} sx={{ padding: 4 }}>
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

            <Grid item xs={12} sm={4}>
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

            <Grid item xs={12} sm={4}>
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

            <Grid item xs={12} sm={4}>
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

            {/* Address Section */}
            <Grid item xs={12} sm={4}>
              <TextField
                label="City"
                name="city"
                fullWidth
                required
                value={propertyData.city}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                label="Street"
                name="street"
                fullWidth
                required
                value={propertyData.street}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                label="State"
                name="state"
                fullWidth
                required
                value={propertyData.state}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                label="ZIP Code"
                name="zip"
                fullWidth
                required
                value={propertyData.zip}
                onChange={handleChange}
              />
            </Grid>

            {/* Property Features (Checkboxes) */}
            <Grid container spacing={2}>
              {[
                { label: "Garage", name: "garage" },
                { label: "Swimming Pool", name: "swimmingPool" },
                { label: "Fireplace", name: "fireplace" },
                { label: "Basement", name: "basement" },
                { label: "Attic", name: "attic" },
                { label: "Air Conditioning", name: "airConditioning" },
                { label: "Remodeled", name: "remodeled" },
                { label: "Security System", name: "securitySystem" },
                { label: "Smart Home", name: "smartHome" },
                { label: "Fence", name: "fence" },
                { label: "Pets Allowed", name: "petsAllowed" },
                { label: "Walk-in Closets", name: "walkInClosets" },
              ].map((feature) => (
                <Grid item xs={12} sm={4} key={feature.name}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={propertyData[feature.name]}
                        onChange={handleCheckboxChange}
                        name={feature.name}
                      />
                    }
                    label={feature.label}
                  />
                </Grid>
              ))}
            </Grid>

            {/* Parking Spaces */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Parking Spaces"
                name="parkingSpaces"
                type="number"
                fullWidth
                value={propertyData.parkingSpaces}
                onChange={handleChange}
              />
            </Grid>

            {/* HOA Fees */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="HOA Fees ($)"
                name="hoaFees"
                type="number"
                fullWidth
                value={propertyData.hoaFees}
                onChange={handleChange}
              />
            </Grid>

            {/* Appliances Included (Multi-select) */}
            <Grid item xs={12}>
              <TextField
                select
                label="Appliances Included"
                name="appliancesIncluded"
                fullWidth
                sx={{ minWidth: 200 }} // Ensures the box starts at a reasonable width
                SelectProps={{
                  multiple: true,
                  value: propertyData.appliancesIncluded,
                  onChange: handleArrayChange,
                }}
              >
                {[
                  "Refrigerator",
                  "Dishwasher",
                  "Washer/Dryer",
                  "Microwave",
                  "Oven",
                  "Stove",
                ].map((appliance) => (
                  <MenuItem key={appliance} value={appliance}>
                    {appliance}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Outdoor Space */}
            <Grid item xs={12}>
              <TextField
                label="Outdoor Space (e.g., Balcony, Yard)"
                name="outdoorSpace"
                fullWidth
                value={propertyData.outdoorSpace}
                onChange={handleChange}
              />
            </Grid>

            {/* Image Upload */}
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
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Submit Property
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default AddPropertyPage;
