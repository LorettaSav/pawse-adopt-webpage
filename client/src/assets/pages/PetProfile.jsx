import PetProfileAvatar from "../components/design/PetProfileAvatar";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Box,
  Button,
  Typography,
  Grid,
  Divider,
  Chip,
  TextField,
} from "@mui/material";
import axios from 'axios'
import { Link } from 'react-router-dom'
import AuthContext from "../contexts/AuthContext";

export default function PetProfile() {
  const { pet_id } = useParams();
  const [pet, setPet] = useState({});
  const [user, setUser] = useState({});
  const [breed, setBreed] = useState({});
  const [input, setInput] = useState({});
  const auth = useContext(AuthContext);

  useEffect(() => {
    loadPet();
  }, [pet_id]);

  const handleInputChanges = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
    console.log(input);
  };

  const handleSaveChanges = (e) => {
    updatePet();
  };

  async function loadPet() {
    try {
      const response = await fetch(`/api/pets/${pet_id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch pet data");
      }
      const petData = await response.json();

      const [userResponse, breedResponse] = await Promise.all([
        fetch(`/api/users/${petData.user_id}`),
        fetch(`/api/breeds/${petData.breed_id}`),
      ]);

      if (!userResponse.ok) {
        throw new Error("Failed to fetch user data");
      }
      const userData = await userResponse.json();

      if (!breedResponse.ok) {
        throw new Error("Failed to fetch breed data");
      }
      const breedData = await breedResponse.json();

      setPet(petData);
      setUser(userData);
      setBreed(breedData);
    } catch (err) {
      console.log(err);
    }
  }


  //THIS IS NOT WORKING i HAVE TO CHECK WHY!!!!!!!!!!
  const updatePet = async () => {
    try {
      await axios.post(`/pets/edit/${pet_id}`, input);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Container component="main" maxWidth="lg" sx={{ mt: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <PetProfileAvatar pet_id={pet_id} user_id={pet.user_id} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <Typography variant="h3">{pet.name}</Typography>
              </Grid>

              <Grid item sm={12}>
                <Typography variant="h5">
                  <i className="fa-solid fa-user"></i> {user.username}
                </Typography>
              </Grid>
              <Grid item sm={3}>
                <Typography variant="h6">
                  <i className="fa-solid fa-location-dot"></i> {pet.location}
        
                </Typography>
              </Grid>
              <Grid item sm={4}>
                <Typography variant="h6">
                  <i className="fa-solid fa-dog"></i> {breed.breed}
                </Typography>
              </Grid>
              <Grid item sm={2}>
                <Typography variant="h6">
                  <i className="fa-solid fa-dog"></i> {pet.gender}
                </Typography>
              </Grid>

              <Grid container spacing={2} sx={{ mt: 2 }}>
                {pet.vaccination_status === true && (
                  <Grid item>
                    <Typography variant="h6">
                      <i className="fa-solid fa-vial-circle-check"></i>{" "}
                      Vaccinated{" "}
                    </Typography>
                  </Grid>
                )}
                {pet.passport === true && (
                  <Grid item>
                    <Typography variant="h6">
                      <i className="fa-solid fa-passport"></i> Passport
                    </Typography>
                  </Grid>
                )}
                {pet.chip === true && (
                  <Grid item>
                    <Typography variant="h6">
                      <i className="fa-solid fa-microchip"></i> Microchipped
                    </Typography>
                  </Grid>
                )}
                {pet.neutered === true && (
                  <Grid item>
                    <Typography variant="h6">
                      <i className="fa-solid fa-check"></i> Neutered
                    </Typography>
                  </Grid>
                )}

                <Grid item xs={12}>
                  <Divider textAlign="left">
                    <Chip label="Bio" />
                  </Divider>

                  {pet.bio ? (
                    <Typography>{pet.bio}</Typography>
                  ) : (
                    <TextField
                      multiline
                      fullWidth
                      style={{ marginTop: "1vw" }}
                      placeholder="Let us know about your dog!"
                      variant="standard"
                      name="bio"
                      onChange={handleInputChanges}
                    ></TextField>
                  )}
                </Grid>

                <Grid item xs={12}>
                  <Divider textAlign="left">
                    <Chip label="Medical Needs" />
                  </Divider>
                  {pet.medical_issues ? (
                    <Typography>{pet.medical_issues}</Typography>
                  ) : (
                    <TextField
                      multiline
                      fullWidth
                      style={{ marginTop: "1vw" }}
                      placeholder="Let us know if your pouch needs some professional treatment!"
                      variant="standard"
                      name="medical_issues"
                      onChange={handleInputChanges}
                    ></TextField>
                  )}
                </Grid>

                <Grid item xs={12}>
                  <Divider textAlign="left">
                    <Chip label="Dietary Needs" />
                  </Divider>
                  {pet.diet ? (
                    <Typography>{pet.diet}</Typography>
                  ) : (
                    <TextField
                      multiline
                      fullWidth
                      style={{ marginTop: "1vw" }}
                      placeholder="Any dietary preferences we should know about?"
                      variant="standard"
                      name="diet"
                      onChange={handleInputChanges}
                    ></TextField>
                  )}
                </Grid>

                <Grid item xs={12}>
                  <Divider textAlign="left">
                    <Chip label="Special Needs" />
                  </Divider>
                  {pet.special_needs ? (
                    <Typography>{pet.special_needs}</Typography>
                  ) : (
                    <TextField
                      multiline
                      fullWidth
                      style={{ marginTop: "1vw" }}
                      placeholder="Any likes/dislikes, traumas, or any other special needs?"
                      variant="standard"
                      name="special_needs"
                      onChange={handleInputChanges}
                    ></TextField>
                  )}
                </Grid>
              </Grid>

              <Grid sx={{ mt: 2 }} container spacing={2}>
                {auth.userId != user.id ? 
                <Grid item>
                  <Link to={`/chat/${auth.userId}/${user.id}`}>
                  <Button variant="contained" color="secondary" style={{marginRight:"2vw"}}>
                    <i className="fa-solid fa-comments"></i> Message User
                  </Button>
                  </Link>
                  
                </Grid>: 
                <Grid item>
                <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                    onClick={handleSaveChanges}
                  >
                    {" "}
                    Save Changes
                  </Button>
                  </Grid> }
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
