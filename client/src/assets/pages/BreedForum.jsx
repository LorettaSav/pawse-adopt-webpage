import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Grid, Paper } from "@mui/material";

export default function BreedForum() {
  const { breed_id } = useParams();
  const [breed, setBreed] = useState({});

  useEffect(() => {
    loadBreed();
  }, [breed_id]);

  async function loadBreed() {
    try {
      const response = await fetch(`api/breeds/${breed_id}`);
      const data = await response.json();
      setBreed(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Paper
        sx={{
          position: "relative",
          color: "#fff",
          mb: 4,
          borderRadius: 0,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundImage: `url(${breed.image_url})`,
          display: "flex",
          alignItems: "center",
          height: 750,
        }}
      >
        <img style={{ display: "none" }} src={breed.image_url} />
        <Grid container sx={{ justifyContent: "center", textAlign: "center" }}>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              backgroundColor: "rgba(0,0,0,.45)",
            }}
          />
          <Grid item md={6}>
            <Box
              sx={{
                position: "relative",
                p: { xs: 3, md: 6 },
              }}
            >
              <Typography
                component="h1"
                variant="h3"
                color="inherit"
                gutterBottom
                sx={{ fontFamily: "Oooh Baby", fontSize: 80 }}
              >
                {breed.breed}
              </Typography>
              <Typography
                component="h1"
                variant="h3"
                color="inherit"
                gutterBottom
                sx={{ fontFamily: "Verdana", fontSize: 24 }}
              >
                {breed.temperament}
              </Typography>
              <br />
              <Typography
                variant="h4"
                color="inherit"
                sx={{ fontFamily: "Verdana", fontSize: 17 }}
              >
                Size Range: {breed.height}cm, {breed.weight}kg
              </Typography>
              <br />
              <Typography sx={{ fontFamily: "Verdana", fontSize: 17 }}>
                Life Expectancy: {breed.life_expectancy}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
