import CssBaseline from "@mui/material/CssBaseline";
import {Container, Grid} from "@mui/material/";
import MainFeaturedPost from "../components/About_Us/MainFeaturedPost.jsx";
import BreedMenu from "../components/Breeds/BreedMenu.jsx";
import AuthContext from "../contexts/AuthContext";

function Forum() {
  const mainFeaturedPost = {
    title: "Join The Community Talk",
    image: "/public/puppy-cover.jpg",
    imageText: "puppies",
    
    
  };

  return (
    <>
      <CssBaseline />

      <Container maxWidth="xl">
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
        </main>

        <Grid container>
          <Grid item md={3}>
            <BreedMenu/>
          </Grid>
        </Grid>




      </Container>
     

     

     
    </>
  );
}

export default Forum;
