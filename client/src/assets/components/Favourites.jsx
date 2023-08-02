import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { Container, Grid, Chip, Divider, Button } from "@mui/material";
import AuthContext from "../contexts/AuthContext";
import PetCard from "./Pets/PetCard";
import axios from "axios";

export default function Favourites() {
  const [favouritePets, setFavouritePets] = useState([]);

  const location = useLocation();
  const currentLocation = location.pathname;

  const auth = useContext(AuthContext);
  useEffect(() => {
    getFavourites();
  }, []);

  const updateFavorites = async () => {
    getFavourites();
  };

  const getFavourites = async () => {
    try {
      const res = await axios.get(`api/users/favourites/${auth.userId}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      console.log(res.data[0].Pets); //object of pet_id/user_id
      setFavouritePets(res.data[0].Pets);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Divider
        textAlign="left"
        style={{ marginBottom: "2vw", marginTop: "10vw" }}
      >
        <Chip label="My Favourites" />
      </Divider>
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Grid container spacing={4} style={{ marginLeft: "15vw" }}>
          {favouritePets.map((pet) => (
            <Grid item key={pet.id} xs={12} sm={6} md={4}>
              <PetCard
                name={pet.name}
                bio={pet.bio}
                age={pet.age}
                location={pet.location}
                breed_id={pet.breed_id}
                id={pet.id}
                // user_id={pet.user_id}
                avatar={pet.avatar}
                currentLocation={currentLocation}
                updateFavorites={updateFavorites}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
