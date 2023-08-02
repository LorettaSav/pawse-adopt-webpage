import { useState, useEffect, useContext } from "react";
import { Container, Grid, Typography, Button, Box } from "@mui/material";
import PetCard from "./PetCard";
import AuthContext from "../../contexts/AuthContext";
import AddPet from "./AddPet";
import axios from "axios";
import { useNavigate } from "react-router-dom";



export default function PetProf() {
  const [pets, setPets] = useState([]);
  const auth = useContext(AuthContext);
  const [ addPetClicked, setAddPetClicked] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    getPets();
  }, [auth.userId]);

  const handleAddPet = () => {
    getPets();
  }

  const getPets = async () => {
    try {
      const response = await fetch(`api/pets/user/${auth.userId}`, {
        method: "GET",
      });
      const data = await response.json();
      setPets(data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = async (petId) => {
    try {
      await axios.delete(`/api/pets/${petId}`,{
        headers:{
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("token"),
    }
  });
  
      // Update the state to remove the deleted pet
      setPets((prevPets) => prevPets.filter((pet) => pet.id !== petId));
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div>
      
      <div className="row" style={{ margin: "2vw 5.5vw", display: "flex" }}>
        <div>
          <Box sx={{ width: "100%", marginBottom:"2vw"}} >
        
              <Button variant="outlined" color="secondary" onClick={() => setAddPetClicked(true)}> List A Pet</Button>
            <Button variant="outlined" color="secondary" onClick={() => setAddPetClicked(false)}> View Your Pets</Button>
            <Button variant="outlined"  color="secondary" onClick={() => navigate("/user_profile")}> Back to Profile</Button>
          </Box>
         </div>
        </div>

{ addPetClicked ? 
      <AddPet onAddPet={handleAddPet}/> 
       : ( 

      <Container sx={{ py: 8 }} maxWidth="lg">
        <Grid container spacing={4}>
          <Grid textAlign="center" item xs={12} sm={12}>
            <Typography variant="h5">Your Pets</Typography>
          </Grid>
        
          {pets.map((pet) => (
            <Grid item key={pet.id} xs={12} sm={6} md={4}>
              <PetCard
                id={pet.id}
                avatar={pet.avatar}
                name={pet.name}
                bio={pet.bio}
                age={pet.age}
                breed={pet.Breed.breed}
                location={pet.location}
                breed_id={pet.breed_id}
                user_id={pet.user_id}
                onDelete={() => handleDelete(pet.id)}
              />
            </Grid>
          ))} 
        </Grid>
      </Container> 
       ) 
 }

    </div>
  );
}
