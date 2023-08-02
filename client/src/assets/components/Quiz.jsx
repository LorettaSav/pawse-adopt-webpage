import { useContext, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import MainFeaturedPost from "../components/About_Us/MainFeaturedPost.jsx";
import FeaturedPost from "../components/About_Us/FeaturedPost.jsx";
import { Grid, Box, Typography, Button, FormControl, FormControlLabel, Radio, RadioGroup, FormLabel } from "@mui/material";
import AuthContext from "../contexts/AuthContext";

export default function Quiz() {
  const auth = useContext(AuthContext);
  const [showQuizForm, setShowQuizForm] = useState(false);
  const [type, setType] = useState("");
  const [dogs , setDogs] = useState([]);

  async function fetchGoodDogs() {
    try {
      const response = await fetch(`api/quiz?type=${type}`);
      const data = await response.json();
      setDogs(data.data);
      
    } catch(err) {

    }
  };

  async function fetchAllDogs() {
    try {
      const response = await fetch(`api/breeds`);
      const data = await response.json();
      setDogs(data.data);
      
    } catch(err) {

    }
  };
  console.log(dogs)

  function handleSubmit(){
      fetchGoodDogs() 
  }

  const handleChildFriendlinessChange = (event) => {
    setType(event.target.value); 
  };
  console.log(type)

  const handleStartQuiz = () => {
    setShowQuizForm(true);
  };

  const mainFeaturedPost = {
    title: "Quiz",
    description:
      "Hi there! We believe that dogs deserve the perfect home. We also believe that the way to do this is through education and encouragement. We want to ensure you find your perfect pooch. Let us help!",
    image: "/public/cover_3.jpg",
    imageText: "main image description",
  };


  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl">
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          {!showQuizForm && (
            <Box sx={{ textAlign: "center", mt: 4 }}>
              <Button variant="contained" color="primary" onClick={handleStartQuiz}>
                {auth.user ? "Start The Quiz" : "SignUp"}
              </Button>
            </Box>
          )}

          {/*Routes need to be created for Questions + Answers to be displayed 
          so that there is no need for hardcoding them in FE*/}

          {showQuizForm && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h5" sx={{ mt: 4 }} gutterBottom>
                Child Friendliness:
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="child-friendliness"
                  name="child-friendliness"
                  value={type}
                  onChange={handleChildFriendlinessChange}
                >
                  <FormControlLabel
                    value=""
                    control={<Radio />}
                    label="Not important, there are no children in the household"

                  />
                  <FormControlLabel
                    value="friendly"
                    control={<Radio />}
                    label="Very important, we have children or frequently have children visiting"
                  />
                </RadioGroup>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                {auth.user ? "Find" : "SignUp"}
              </Button>
              </FormControl>
            </Box>
          )}
          {dogs && (
                    <Grid container spacing={4} style={{marginLeft:"15vw"}}>
                    {dogs.map((dog) => (
                      <Grid item key={dog.id} xs={12} sm={6} md={4} >
                        <p>{dog.breed}</p>
                      </Grid>
                      
                    ))}
                  </Grid>
          )}
        </main>
      </Container>
    </>
  );
}

