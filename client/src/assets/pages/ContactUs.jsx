import {
  Container,
  Button,
  Box,
  Grid,
  TextField,
  Avatar,
  Typography,
  CssBaseline,
} from "@mui/material";
import {  useState } from "react";
import axios from "axios";

export default function ContactUs() {
  
  const [input, setInput] = useState({})

  const handleMessage = () => {
    contact()
  }
  const contact = async () => {
    try {
      await axios.post(`/api/contact`, input)
      
    } catch (error) {
      console.log(error)
    }
  } 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput(
      {...input, [name]:value}
    )
  }

  return (
    <Container component="main" maxWidth="xs">
      {console.log(input)}
      <CssBaseline>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          </Avatar>
          <Typography component="h1" variant="h5">
            What would you like to know?
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <Grid container spacing={2}></Grid>
            <TextField
              margin="normal"
              required
              fullWidth
              label="email"
              name="email"
              onChange={handleChange}
            />

            <TextField
              margin="normal"
              required
              label="name"
              name="name"
              onChange={handleChange}
            ></TextField>

            <TextField
              margin="normal"
              label="Your message"
              name="message"
              required
              fullWidth
              minRows={5}
              multiline
              placeholder="Talk to us!"
              onChange={handleChange}
            ></TextField>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleMessage}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </CssBaseline>
    </Container>
  );
}
