import React from "react";
import { useState, useEffect, useContext } from "react";
import { Container, Box, Typography, Stack, Grid, Button } from "@mui/material";
import Select from "react-select";
import PetCard from "../components/Pets/PetCard";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete";
import { useLocation } from 'react-router-dom';
import AuthContext from "../contexts/AuthContext";

export default function SearchPets() {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchInput, setSearchInput] = useState({});
  const [pets, setPets] = useState([]);
  const [searchIsClicked, setSearchIsClicked] = useState(null);

  const location = useLocation();
  const currentLocation = location.pathname;

  const auth = useContext(AuthContext);

  useEffect(() => {
    getBreeds();
    onChangeGooglePlaces(searchLocation);
    getPets();
  }, [searchLocation]);

  const getPets = async () => {
    try {
      const response = await fetch(`/api/pets`, {
        method: "GET",
      });
      const data = await response.json();
      setPets(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getBreeds = async () => {
    try {
      const response = await fetch(`/api/breeds`, {
        method: "GET",
      });
      const data = await response.json();
      setBreeds(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleBreedChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setSearchInput((state) => ({
      ...state,
      id: selectedOption.value,
    }));
  };

  async function onChangeGooglePlaces(e) {
    console.log(e);
    if (e) {
      const result = await geocodeByAddress(e.label);
      const locationname = result[0].formatted_address;
      const latLng = await getLatLng(result[0]);

      const locationLat = latLng.lat;
      const locationLng = latLng.lng;
      console.log(`latitude: ${locationLat}`);
      console.log(`latitude: ${locationLng}`);

      setSearchInput((state) => ({
        ...state,
        latitude: +locationLat,
        longitude: +locationLng,
        // locationname: locationname,
      }));
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    searchPets(searchInput);
    console.log(searchInput);
    setSearchIsClicked(true);
  };

  const handleFavourites = (e) => {
    console.log(e.target.id)

  }
  const handleClearClick = (e) => {
    e.preventDefault();
    setSearchIsClicked(false);
    getPets();
    setSearchLocation("");
    setSelectedOption("");
    setSearchInput({});
  };

  const searchPets = async (searchInput) => {
    try {
      const queryParams = new URLSearchParams(searchInput);
      const response = await fetch(
        `http://localhost:4000/api/pets/search?${queryParams}`
      );
      const data = await response.json();
      setPets(data);
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
        }}
      >
        <Container sx={{ justifyContent: "center" }} maxWidth="md">
          <Typography
            component="h6"
            variant="h6"
            align="center"
            color="text.primary"
            gutterBottom
            sx={{ fontFamily: "Oooh Baby", fontSize: 80 }}
          >
            Give a Forever Home
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            paragraph
            sx={{ justifyContent: "center" }}
          >
            Hello! And thank you for taking the steps to join us. Here at
            Pawse, Adopt , we want to ensure that all dogs are given a safe home.
            Browse below.
          </Typography>

          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          ></Stack>
        </Container>
      </Box>

      <Container>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={5}>
              <PlacesAutocomplete
                selectProps={{
                  value: searchLocation,
                  onChange: setSearchLocation,
                  placeholder: "Location",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <Select
                options={breeds.map((breed) => ({
                  value: breed.id,
                  label: breed.breed,
                }))}
                value={selectedOption}
                onChange={handleBreedChange}
                placeholder="Select a breed."
              ></Select>
            </Grid>
            {!searchIsClicked && (
              <Grid item xs={12} sm={2}>
                <Button variant="contained" onClick={handleSubmit}>
                  Search
                </Button>
              </Grid>
            )}
            {searchIsClicked && (
              <Grid item xs={12} sm={2}>
                <Button variant="contained" onClick={handleClearClick}>
                  Clear
                </Button>
              </Grid>
            )}
          </Grid>
        </Box>
      </Container>

      {pets.length === 0 && (
        <Container sx={{ mt: 2 }}>
          <Typography color="text.secondary">Sorry! No Results.</Typography>
        </Container>
      )}

      <Container sx={{ py: 8 }} maxWidth="lg">
        <Grid container spacing={4}>
          {pets.map((pet) => (
            <Grid item key={pet.id} xs={12} sm={6} md={4} >
              {/* in future, pass the pet object rather than the individual properties */}
              <PetCard
                name={pet.name}
                bio={pet.bio}
                age={pet.age}
                breed={pet.Breed.breed}
                location={pet.location}
                breed_id={pet.breed_id}
                id={pet.id}
                user_id={pet.user_id}
                avatar={pet.avatar}
                currentLocation={currentLocation}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </main>
  );
}
