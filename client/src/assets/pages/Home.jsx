import { useContext, useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "../components/design/Header";
import MainFeaturedPost from "../components/About_Us/MainFeaturedPost.jsx";
import AnotherHero from "../components/About_Us/FeaturedPost.jsx";
import Main from "../components/About_Us/Main";
import Sidebar from "../components/About_Us/Sidebar";
import Footer from "../components/design/Footer.jsx";
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
  Stack,
  Container
} from "@mui/material";
import AuthContext from "../contexts/AuthContext";
import ContactUs from "../pages/ContactUs"

function Home() {
  const auth = useContext(AuthContext);

  const mainFeaturedPost = {
    description:
      "We believe that dogs deserve the perfect home. We also believe that the way to do this is through education and encouragement. We want to ensure you find your perfect pooch. Let us help!",
    image: "/cover_3.jpg",
    imageText: "main image description",
    linkText: auth.user ? "Take Quiz " : "SignUp",
    linkUrl: auth.user ? "/quiz" : "/registration",
  };

  const anotherHero = {
    description:
      "Would you like to Start Browsing for Pets?",
    image: "/puppy-cover.jpg",
    imageText: "main image description",
    linkText:  "Find Pets " ,
    linkUrl: auth.user ? "/search_pets" : "/registration",
  };



  const about = {
    title: "Title",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ac arcu mollis, tincidunt erat et, scelerisque leo. Nam commodo felis dolor, eget volutpat ante eleifend aliquet. ",
    image: "/cover_2.jpg",
    imageText: "main image description",
    linkText: "Join Now",
  };

  const qize = {
    title: "Title",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ac arcu mollis, tincidunt erat et, scelerisque leo. Nam commodo felis dolor, eget volutpat ante eleifend aliquet. ",
    image: "/cover_2.jpg",
    imageText: "main image description",
    linkText: "Join Now",
  };

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
        }}
      >
        <Container sx={{ justifyContent: "center" }} maxWidth="md">
          {
            auth.user?    <Typography
            component="h6"
            variant="h6"
            align="center"
            color="text.primary"
            gutterBottom
            sx={{ fontFamily: "Oooh Baby", fontSize: 80 }}
            >
              Welcome back!!
            </Typography> :
                 <Typography
                 component="h6"
                 variant="h6"
                 align="center"
                 color="text.primary"
                 gutterBottom
                 sx={{ fontFamily: "Oooh Baby", fontSize: 80 }}
               >
                 Have a tail-wagging welcome!
               </Typography>
          }
          
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            paragraph
            sx={{ justifyContent: "center" }}
          >
            Hello! Nice to meet you *sniffs butt*. Whether you're here looking to adopt or to part from your paw-ish friend, here at
            Pawse, Adopt is the place to be!
          </Typography>

          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          ></Stack>
        </Container>
      </Box>
      <Container maxWidth="xl">
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />

          <Grid container={true}  style={{ marginRight:"2vw", marginTop:"4vw" }}>
            <Grid item xs={12}>
              <Container>
              <Typography variant="h2" component="h2">
                About Us
              </Typography>
              <Typography textAlign="justify" variant="body1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                lobortis nibh ac risus venenatis, sed tincidunt est posuere.
                Nulla facilisi. Morbi vestibulum lorem in elit sagittis
                vestibulum. Fusce id dolor et turpis semper tristique. Mauris
                non mauris vitae erat consequat auctor. Mauris malesuada commodo
                nulla, sit amet rutrum lorem dictum vitae.
              </Typography>
              </Container>
             
            </Grid>
          </Grid>
          <div style={{margin:"5vw 5vw", height:"10vw"}}>
              <AnotherHero post={anotherHero}/>
          </div>

              
          <Container>
            <ContactUs/>
          </Container>
        </main>
      </Container>
    </>
  );
}

export default Home;
