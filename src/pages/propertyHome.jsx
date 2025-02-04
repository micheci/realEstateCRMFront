import { useNavigate } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";

const PropertyHome = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>
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
          onClick={() => navigate("/dashboard/view-properties")}
        >
          View Properties
        </Button>

        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/dashboard/add-property")}
        >
          Add Property
        </Button>
      </Box>
    </Box>
  );
};

export default PropertyHome;
