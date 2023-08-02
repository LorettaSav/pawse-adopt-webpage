/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import {
  Container,
  Box,
  TextField,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import Select from "react-select";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete";
import axios from "axios";

export default function AddPet({ onAddPet }) {
  const auth = useContext(AuthContext);
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [input, setInput] = useState({
    user_id: +auth.userId,
    name: "",
    breed_id: "",
    location: "",
    medical_issues: "",
    special_needs: "",
    diet: "",
    latitude: null,
    chip: null,
    longitude: null,
    vaccination_status: null,
    neutered: null,
    gender: "",
    age: null,
    passport: null,
  });
  const [petLocation, setPetLocation] = useState("");
  const [passport, setPassport] = useState(null);
  const [vaccinated, setVaccinated] = useState(null);
  const [neutered, setNeutered] = useState(null);
  const [microchipped, setMicrochipped] = useState(null);
  const [gender, setGender] = useState("");
  const [addPetSuccess, setAddPetSuccess] = useState(false);

  useEffect(() => {
    getBreeds();
    onChangeGooglePlaces(petLocation);
  }, [petLocation]);

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

  const handleBreedChange = (selectedBreed) => {
    setSelectedBreed(selectedBreed);
    setInput((state) => ({
      ...state,
      breed_id: selectedBreed.value,
    }));
  };

  const genderOptions = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ];

  const options = [
    { label: "Yes", value: true },
    { label: "No", value: false },
  ];

  const handleVaccinatedChange = (selectedOption) => {
    setVaccinated(selectedOption);

    setInput((state) => ({
      ...state,
      vaccination_status: selectedOption.value,
    }));
  };

  const handleNeuteredChange = (selectedOption) => {
    setNeutered(selectedOption);

    setInput((state) => ({
      ...state,
      neutered: selectedOption.value,
    }));
  };

  const handleMicrochippedChange = (selectedOption) => {
    setMicrochipped(selectedOption);

    setInput((state) => ({
      ...state,
      chip: selectedOption.value,
    }));
  };

  const handlePassportChange = (selectedOption) => {
    setPassport(selectedOption);

    setInput((state) => ({
      ...state,
      passport: selectedOption.value,
    }));
  };

  const handleGenderChange = (selectedOption) => {
    setGender(selectedOption);

    setInput((state) => ({
      ...state,
      gender: selectedOption.value,
    }));
  };

  const handleFormChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setInput((state) => ({
      ...state,
      [name]: value,
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

      setInput((state) => ({
        ...state,
        latitude: +locationLat,
        longitude: +locationLng,
        location: locationname,
      }));
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addPet(input);
    setPetLocation("");
    setSelectedBreed("");
    setVaccinated(null);
    setMicrochipped(null);
    setGender("");
    setNeutered(null);
    setPassport(null);

    setInput({
      name: "",
      breed_id: "",
      location: "",
      medical_issues: "",
      special_needs: "",
      diet: "",
      latitude: null,
      chip: null,
      longitude: null,
      vaccination_status: null,
      neutered: null,
      gender: "",
      age: "",
      passport: null,
      bio: "",
      
    });
  };

  const addPet = async (input) => {
    try {
      await axios.post("/api/pets", input, {
        headers:{
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("token"),
        }
      });
      onAddPet();
      setAddPetSuccess(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={{ mb: 2 }}>
          <Grid item>
            <Typography variant="h5">
              Complete the form to list a pet for adoption
            </Typography>
          </Grid>
        </Box>

        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <TextField
              placeholder="Name"
              name="name"
              value={input.name}
              onChange={handleFormChange}
              fullWidth
            ></TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              placeholder="Age"
              name="age"
              value={input.age}
              onChange={handleFormChange}
              fullWidth
            ></TextField>
          </Grid>

          <Grid item xs={12} sm={12}>
            <Select
              options={breeds.map((breed) => ({
                value: breed.id,
                label: breed.breed,
              }))}
              value={selectedBreed}
              onChange={handleBreedChange}
              placeholder="Breed"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Select
              value={gender}
              onChange={handleGenderChange}
              placeholder="Gender"
              options={genderOptions}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Select
              placeholder="Vaccinated"
              value={vaccinated}
              onChange={handleVaccinatedChange}
              options={options}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Select
              value={neutered}
              onChange={handleNeuteredChange}
              placeholder="Neutered/Spayed"
              options={options}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Select
              value={microchipped}
              onChange={handleMicrochippedChange}
              placeholder="Microchipped"
              options={options}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Select
              placeholder="Passport"
              options={options}
              value={passport}
              onChange={handlePassportChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <PlacesAutocomplete
              selectProps={{
                value: petLocation,
                onChange: setPetLocation,
                placeholder: "Location",
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              placeholder="Medical Needs"
              fullWidth
              name="medical_issues"
              value={input.medical_issues}
              onChange={handleFormChange}
            ></TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              placeholder="Special Needs"
              name="special_needs"
              value={input.special_needs}
              onChange={handleFormChange}
              fullWidth
            ></TextField>
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              placeholder="Dietary Needs"
              fullWidth
              name="diet"
              value={input.diet}
              onChange={handleFormChange}
            ></TextField>
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              placeholder="Bio"
              fullWidth
              name="bio"
              value={input.bio}
              onChange={handleFormChange}
            ></TextField>
          </Grid>
          {addPetSuccess === true && (
            <Grid item xs={12}>
              <Box textAlign="center">
                <Typography>Pet Added Successfully</Typography>
                <Button onClick={() => setAddPetSuccess(false)}>Ok</Button>
              </Box>
            </Grid>
          )}

          <Grid item xs={12} sm={12}>
            <Button variant="contained" fullWidth onClick={handleSubmit}>
              Add Pet
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
