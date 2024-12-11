import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Box, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const UpdateCar = () => {
  const { id } = useParams();  // Get the car id from the URL params
  const [car, setCar] = useState({
    license: "",
    name: "",
    driverName: "",
    brand: "",
    capacity: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the car details based on the id from the URL
    const fetchCar = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/cars/${id}`);
        const data = await response.json();
        setCar(data);
      } catch (error) {
        console.error("Error fetching car:", error);
      }
    };
    fetchCar();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCar((prevCar) => ({
      ...prevCar,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/cars/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(car),
      });
      if (response.ok) {
        navigate("/cars");  // Redirect to cars list page
      }
    } catch (error) {
      console.error("Error updating car:", error);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, margin: "auto", padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Update Car Details
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          id="license"
          label="License"
          variant="outlined"
          name="license"
          value={car.license}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          id="name"
          label="Car Name"
          variant="outlined"
          name="name"
          value={car.name}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          id="driverName"
          label="Driver Name"
          variant="outlined"
          name="driverName"
          value={car.driverName}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          id="brand"
          label="Brand"
          variant="outlined"
          name="brand"
          value={car.brand}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          id="capacity"
          label="Capacity"
          variant="outlined"
          name="capacity"
          value={car.capacity}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
            >
              Update
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              color="secondary"
              variant="outlined"
              fullWidth
              onClick={() => navigate("/cars")}  // Cancel and go back to cars list
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default UpdateCar;
