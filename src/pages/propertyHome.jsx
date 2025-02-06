import { useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import PropertiesPage from "./propertiesPage";
import AddPropertyPage from "./addPropertyPage";

const PropertyHome = () => {
  const [activePage, setActivePage] = useState("home"); // Track which page is active

  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      {activePage === "home" && (
        <>
          <Typography variant="h4" gutterBottom>
            Manage Your Properties
          </Typography>
          <Typography variant="body1" mb={2}>
            View and add properties from here.
          </Typography>

          <Box display="flex" justifyContent="center" gap={2} mt={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setActivePage("view")}
            >
              View Properties
            </Button>

            <Button
              variant="contained"
              color="secondary"
              onClick={() => setActivePage("add")}
            >
              Add Property
            </Button>
          </Box>
        </>
      )}

      {activePage === "view" && <PropertiesPage />}
      {activePage === "add" && <AddPropertyPage />}
    </Box>
  );
};

export default PropertyHome;
