import React, { useState, useContext } from "react";
import { Avatar, Button, InputAdornment, IconButton } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link, Navigate, useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import AuthContext from "../../contexts/AuthContext";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center" style={{marginTop:"1.5vw"}}>
      {"Copyright © "}
      <Link color="inherit" to="/about">
        Pawse, Adopt
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Login() {
  const auth = useContext(AuthContext); //this will have user, login and logout functions
  const location = useLocation();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [visibility, setVisibility] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleVisibility = () => {
    setVisibility(!visibility);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const login = async () => {
    try {
      const { data } = await axios.post("/api/auth/login", credentials);

      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      localStorage.setItem("userid", data.user_id);
      localStorage.setItem("location", data.location);
      localStorage.setItem("adopter", data.adopter);
      localStorage.setItem("avatar", data.avatar);

      auth.login();
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Username"
            name="username"
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={visibility ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleVisibility}>
                    {visibility ? (
                      <VisibilityOutlinedIcon />
                    ) : (
                      <VisibilityOffOutlinedIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onChange={handleChange}
          />
          {errorMessage && (
            <Grid item xs={12} sm={12}>
              <Typography color="error">{errorMessage}</Typography>
            </Grid>
          )}

          {/* IF WE USE THIS WE NEED TO EXTEND THE TOKENS' DURATION FOR LIKE 30DAYS */}
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={login}>
            Login
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/registration" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {auth.user ? (
        <Navigate to="/" state={{ from: location }} replace />
      ) : null}
      <Copyright />
    </Container>
  );
}
