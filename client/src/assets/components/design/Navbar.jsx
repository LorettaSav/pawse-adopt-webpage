import { useContext } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Button,
  Box,
  Link,
} from "@mui/material";
import Dog from "@mui/icons-material/Pets";
// import { Link } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

export default function Navbar() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const auth = useContext(AuthContext);

  return (
    <Box>
      <AppBar position="static" color="secondary" id="appbar">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="secondary"
            aria-label="logo"
          >
            <Link href="/">
              <Dog color="primary" />
            </Link>
          </IconButton>

          <Typography
            component="div"
            sx={{ flexGrow: 1 }}
            style={{ fontSize: "2vw" }}
          >
            <Link href="/" style={{ textDecoration: "none" }}>
              Pawse, Adopt
            </Link>{" "}
          </Typography>
          {auth.user ? (
            <Stack
              direction="row"
              spacing={2}
              sx={{ flexWrap: "wrap", justifyContent: "flex-end" }}
            >
              <Button
                variant="outlined"
                size="small"
                href="/"
                style={{ fontSize: "0.75rem" }}
              >
                Home
              </Button>

              <Button
                variant="outlined"
                size="small"
                href="/user_profile"
                style={{ fontSize: "0.75rem" }}
              >
                Profile
              </Button>
              <Button
                variant="outlined"
                size="small"
                href="/about"
                style={{ fontSize: "0.75rem" }}
              >
                About Us
              </Button>
              <Button
                variant="outlined"
                size="small"
                href="/forum"
                style={{ fontSize: "0.75rem" }}
              >
                Forum
              </Button>
              <Button
                variant="outlined"
                size="small"
                href="/search_pets"
                style={{ fontSize: "0.75rem" }}
              >
                Find a Pet
              </Button>
              <Button
                size="small"
                href={`/chat/${auth.userId}`}
                style={{ fontSize: "0.75rem" }}
              >
                <ChatBubbleOutlineIcon/>
                
              </Button>
              <Button
                variant="standard"
                size="small"
                href="/contact_us"
                style={{ fontSize: "0.75rem" }}
              >
                <ContactSupportIcon />
              </Button>
              <Button
                variant="contained"
                onClick={auth.logout}
                style={{ fontSize: "0.75rem" }}
                size="small"
              >
                Logout
              </Button>
            </Stack>
          ) : (
            <Stack
              direction="row"
              spacing={2}
              sx={{ flexWrap: "wrap", justifyContent: "flex-end" }}
            >
              <Button
                variant="outlined"
                size="small"
                href="/"
                style={{ fontSize: "0.75rem" }}
              >
                Home
              </Button>

              <Button
                variant="outlined"
                size="small"
                href="/about"
                style={{ fontSize: "0.75rem" }}
              >
                About Us
              </Button>

              <Button
                variant="outlined"
                size="small"
                href="/forum"
                style={{ fontSize: "0.75rem" }}
              >
                Forum
              </Button>

              <Button
                variant="contained"
                href="/login"
                style={{ fontSize: "0.75rem", color: "black" }}
                size="small"
              >
                Login
              </Button>

              <Button
                variant="contained"
                href="/registration"
                style={{ fontSize: "0.75rem", color: "black" }}
                size="small"
              >
                Sign Up
              </Button>
            </Stack>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
