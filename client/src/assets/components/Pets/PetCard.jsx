import { useContext,useState, useEffect } from "react";
import {
  Card,
  CardMedia,
  Typography,
  CardContent,
  Grid,
  Divider,
  CardActions,
  Button,
  Box,
  IconButton
} from "@mui/material";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from "axios";

export default function PetCard({
  name,
  bio,
  age,
  breed,
  location,
  breed_id,
  user_id,
  onDelete,
  id,
  avatar,
  currentLocation,
  updateFavorites,
}) {
  
  const auth = useContext(AuthContext);
  const [favouritePetId, setFavouritePetId] = useState();
  const [myFavourite, setMyFavourite] = useState(false)

  const handleFavourite = (id) => {
    setFavouritePetId(id);
  }

  useEffect(() => {
    if (favouritePetId) {
      console.log(favouritePetId);
      addFavourite(favouritePetId);
    }
  }, [favouritePetId]);

  const addFavourite = async (favouritePetId) => {
    const user_id = auth.userId
   
    const body = {
        user_id: user_id,
        pet_id: favouritePetId
    }

    try {
      await axios.post(`api/users/favourites`, body, {
        headers:{
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("token"),
          }
      })
      console.log("success")
    } catch (error) {
      console.log(error)
    }
  }

  const handleRemoveFavorite = async (petId) => {
    const user_id = auth.userId

    const body = {
      user_id: user_id,
      pet_id: petId
  }

  console.log(body);


    try {
      await axios.delete(`api/users/favourites`, {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("token"),
        },
        params: body
      });
      console.log("Successfully removed from favorites");
      updateFavorites();
      // Perform any additional actions after removing from favorites
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <Card>
      <CardMedia
        component="img"
        height="200"
        image={`/images/${avatar}`}

        style={{width:"200px"}}

        alt="pet image"
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {name}
        </Typography>

        <Divider variant="middle" />

        <Typography variant="h6" color="text.secondary">
          {breed}
        </Typography>

        <Grid>
          <Box sx={{ mt: "1px" }}>
            <Typography>{location}</Typography>
            <Typography variant="body2" color="text.secondary">
              {age} years
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {bio}
            </Typography>
          </Box>
        </Grid>
      </CardContent>
      <CardActions>
        <Box sx={{ mb: "4px" }}>
        <Link to={`/pet/${id}`}>
            <Button size="small" color="secondary">
              Pet Profile
            </Button>
          </Link>
          <Link to={`/${breed_id}`}>
            <Button size="small" color="secondary">
              Breed Info
            </Button>
          </Link>
          {user_id == auth.userId && (
            <Button size="small" color="secondary" onClick={onDelete}>
              Delete
            </Button>
          )}
          <div >

            {currentLocation === "/favourites" && 
            <Button size="small" onClick={() => handleRemoveFavorite(id)} >Remove From Favourites</Button>}
  
          { auth.userId != user_id 
          && currentLocation === "/search_pets" 
          ? (<Button size="small" color="secondary" onClick={(event) => handleFavourite(event.target.value)} value={id} >
          Add To Favourites
        </Button> ) :
          null }

          </div>
          
           

        </Box>
      </CardActions>
    </Card>
  );
}
