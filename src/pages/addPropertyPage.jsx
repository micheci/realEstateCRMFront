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
  FormHelperText,
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
    sqft: "",
    images: [],
    garage: false,
    parkingSpaces: "",
    swimmingPool: false,
    fireplace: false,
    basement: false,
    finishedBasement: false,
    attic: false,
    airConditioning: false,
    remodeled: false,
    outdoorSpace: false, // <-- now a boolean
    securitySystem: false,
    smartHome: false,
    fence: false,
    hoaFees: "",
    petsAllowed: false,
    walkInClosets: false,
    isFeatured: false,
  });

  const { createProperty } = usePropertyStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setPropertyData({
      ...propertyData,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const handleCheckboxChange = (e) => {
    setPropertyData({ ...propertyData, [e.target.name]: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await createProperty(propertyData);
    if (result.success) {
      navigate(`/step2/properties/${result.data._id}`);
    }
  };

  return (
    <Container sx={{ paddingY: 4, display: "flex", justifyContent: "center" }}>
      <Paper elevation={4} sx={{ padding: 4, width: "100%", maxWidth: 600 }}>
        <Typography variant="h4" gutterBottom>
          Step 1 : Add Property Details
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
                inputProps={{ min: 0 }}
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
                inputProps={{ min: 0 }}
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
                inputProps={{ min: 0 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Square Footage (sq ft)"
                name="sqft"
                type="number"
                fullWidth
                required
                value={propertyData.sqft}
                onChange={handleChange}
                inputProps={{ min: 0 }}
              />
            </Grid>
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
              "finishedBasement",
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

          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Parking and Outdoor
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Parking Spaces"
                name="parkingSpaces"
                type="number"
                fullWidth
                value={propertyData.parkingSpaces}
                onChange={handleChange}
                inputProps={{ min: 0 }}
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
              sx={{ textAlign: "center", marginTop: 1 }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={propertyData.outdoorSpace}
                    onChange={handleCheckboxChange}
                    name="outdoorSpace"
                  />
                }
                label="Outdoor Space"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="HOA Fees ($)"
                name="hoaFees"
                type="number"
                fullWidth
                value={propertyData.hoaFees}
                onChange={handleChange}
                inputProps={{ min: 0 }}
              />
            </Grid>
          </Grid>

          <Typography variant="h6" sx={{ marginTop: 3 }}>
            Special Options
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={propertyData.isFeatured}
                    onChange={handleCheckboxChange}
                    name="isFeatured"
                  />
                }
                label="Feature this property on the homepage"
              />
              {propertyData.isFeatured && (
                <FormHelperText>
                  This property will be shown on the home page and will likely
                  be one of the users first views.
                </FormHelperText>
              )}
            </Grid>
          </Grid>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 3 }}
          >
            Submit Property
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default AddPropertyPage;
