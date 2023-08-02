import React, { useContext, useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "../components/design/Header";
import MainFeaturedPost from "../components/About_Us/MainFeaturedPost.jsx";
import FeaturedPost from "../components/About_Us/FeaturedPost.jsx";
import Main from "../components/About_Us/Main";
import Sidebar from "../components/About_Us/Sidebar";
import Footer from "../components/design/Footer.jsx";
import Typography from "@mui/material/Typography";
import post1FilePath from "../components/About_Us/blog-post.1.md";
// import post2FilePath from '../components/About_Us/blog-post.2.md';
// import post3FilePath from '../components/About_Us/blog-post.3.md';
import AuthContext from "../contexts/AuthContext";

function About() {
  const auth = useContext(AuthContext);
  const [post1, setPost1] = useState("");
  // const [post2, setPost2] = useState('');
  // const [post3, setPost3] = useState('');

  useEffect(() => {
    const fetchMarkdownFiles = async () => {
      try {
        const [post1Response, post2Response, post3Response] = await Promise.all(
          [
            fetch(post1FilePath),
            // fetch(post2FilePath),
            // fetch(post3FilePath)
          ]
        );

        const [post1Text, post2Text, post3Text] = await Promise.all([
          post1Response.text(),
          // post2Response.text(),
          // post3Response.text()
        ]);

        setPost1(post1Text);
        // setPost2(post2Text);
        // setPost3(post3Text);
      } catch (error) {
        console.error("Error loading Markdown files:", error);
      }
    };

    fetchMarkdownFiles();
  }, []);

  const mainFeaturedPost = {
    title: "About Us",
    image: "/public/cover_2.jpg",
    imageText: "main image description",
    // linkText: auth.user ? "Find A Paw Friend" : "SignUp",
    // linkUrl: auth.user ? "/search_pets" : "/registration",
  };

  const featuredPosts = [
    {
      title: "Re-Homing",
      date: "2022-02-02",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ac arcu mollis, tincidunt erat et, scelerisque leo. Nam commodo felis dolor, eget volutpat ante eleifend aliquet. Sed in viverra odio.",
      image: "/public/dog_2.jpg",
      imageLabel: "Image Text",
    },
    {
      title: "Adoption",
      date: "2022-01-02",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ac arcu mollis, tincidunt erat et, scelerisque leo. Nam commodo felis dolor, eget volutpat ante eleifend aliquet. Sed in viverra odio.",
      image: "/public/dog_2.jpg",
      imageLabel: "Image Text",
    },
  ];

  const about = {
    title: "Title",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ac arcu mollis, tincidunt erat et, scelerisque leo. Nam commodo felis dolor, eget volutpat ante eleifend aliquet. ",
    image: "/public/cover_2.jpg",
    imageText: "main image description",
    linkText: "Continue reading…",
  };

  const sidebar = {
    title: "",
    description:
      "Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.",
    archives: [],
    social: [
      { name: "GitHub", icon: GitHubIcon },
      { name: "Twitter", icon: TwitterIcon },
      { name: "Facebook", icon: FacebookIcon },
    ],
  };

  const posts = [post1];

  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl">
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container={true} spacing={4} style={{marginTop:"1vw"}}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>

          <Grid container={true} spacing={5} sx={{ mt: 3 }}>
            <Grid item xs={12} md={12}>
              
              <Typography textAlign="justify" variant="subtitle1" style={{fontSize:"1.5vw"}}>
              Hi there! We believe that dogs deserve the perfect home. We also
                believe that the way to do this is through education and
                encouragement. We want to ensure you find your perfect pooch.
                Let us help!
                <br></br>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                lobortis nibh ac risus venenatis, sed tincidunt est posuere.
                Nulla facilisi. Morbi vestibulum lorem in elit sagittis
                vestibulum. Fusce id dolor et turpis semper tristique. Mauris
                non mauris vitae erat consequat auctor. Mauris malesuada commodo
                nulla, sit amet rutrum lorem dictum vitae.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                lobortis nibh ac risus venenatis, sed tincidunt est posuere.
                Nulla facilisi. Morbi vestibulum
                <br></br>
                lorem in elit sagittis
                vestibulum. Fusce id dolor et turpis semper tristique. Mauris
                non mauris vitae erat consequat auctor. Mauris malesuada commodo
                nulla, sit amet rutrum lorem dictum vitae.
                <br></br>
                <br></br> 
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                lobortis nibh ac risus venenatis, sed tincidunt est posuere.
                Nulla facilisi. Morbi vestibulum lorem in elit sagittis
                vestibulum. Fusce id dolor et turpis semper tristique. Mauris
                non mauris vitae erat consequat auctor. Mauris malesuada commodo
                nulla, sit amet rutrum lorem dictum vitae.
              </Typography>
            </Grid>
          </Grid>
        </main>
      </Container>
    </>
  );
}

export default About;
