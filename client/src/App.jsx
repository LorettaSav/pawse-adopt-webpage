import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AuthContext from "./assets/contexts/AuthContext";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Home from "./assets/pages/Home";
import About from "./assets/pages/About";
import UserProfile from "./assets/pages/UserProfile";
import ContactUs from "./assets/pages/ContactUs";
import Forum from "./assets/pages/Forum";
import Navbar from "./assets/components/design/Navbar";
import Login from "./assets/components/AuthLoginSignUp/Login";
import Quiz from "./assets/components/Quiz";
import Registration from "./assets/components/AuthLoginSignUp/Registration";
import SearchPets from "./assets/pages/SearchPets";
import RequireAuth from "./assets/components/AuthLoginSignUp/RequireAuth";
import Footer from "./assets/components/design/Footer";
import "./App.css";
import BreedForum from "./assets/pages/BreedForum";
import PetProf from "./assets/components/Pets/PetProf";
import Gallery from "./assets/components/design/Gallery";
import PetProfile from "./assets/pages/PetProfile";
import { Container } from '@mui/material'

import Favourites from "./assets/components/Favourites";

import Chat from "./assets/components/Chat";
import List from "./assets/components/List";
import { Outlet } from "react-router-dom";


function App() {
  //preparing a global state + login + logout functions so that
  //anybody within the whole app can call these functions
  const [user, setUser] = useState(null);
  const [name, setUserName] = useState(null);
  const [location, setLocation] = useState(null);
  const [userId, setUserId] = useState(null);
  const [adopter, setAdopter] = useState(null);
  const [avatar, setAvatar] = useState(null);


  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const userLocation = localStorage.getItem("location");
    const userID = localStorage.getItem("userid");
    const adopterB = localStorage.getItem("adopter");
    const avatarB = localStorage.getItem("avatar");


    if (token) {
      setUserName(username);
      setLocation(userLocation);
      setUserId(userID);
      setAdopter(adopterB);
      setUser(true);
    }
  }, [user]);

  function login(username, password) {
    setUser(true);
  }

  function logout() {
    setUser(false);
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("location");
    localStorage.removeItem("userid");
    localStorage.removeItem("adopter");
  }

  const authObj = {
    user,
    name,
    userId,
    location,
    adopter,
    login,
    logout,
    avatar
  };

  return (
    <AuthContext.Provider value={authObj}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact_us" element={<ContactUs />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/login" element={<Login />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/registration" element={<Registration />} />
            <Route
              path="/user_profile"
              element={
                <RequireAuth>
                  <UserProfile />
                </RequireAuth>
              }
            />
            <Route
              path="/pet/:pet_id"
              element={
                <RequireAuth>
                  <PetProfile />
                </RequireAuth>
              }
            />
            <Route
              path="/pet_view"
              element={
                <RequireAuth>
                  <PetProf />
                </RequireAuth>
              }
            />
            <Route
              path="/gallery"
              element={
                <RequireAuth>
                  <Gallery/>
                </RequireAuth>
              }
            />
            <Route
              path="/search_pets"
              element={
                <RequireAuth>
                  <SearchPets />
                </RequireAuth>
              }
            />
               <Route
              path="/favourites"
              element={
                <RequireAuth>
                  <Favourites/>
                </RequireAuth>
              }
            />
            <Route path="/:breed_id" element={<BreedForum />}></Route>
            <Route path="/pet/:pet_id" element={
            <RequireAuth><PetProfile/></RequireAuth>
            }></Route>

            <Route path="/chat/:sender" element={
            <RequireAuth>
              <ChatPage />
              </RequireAuth>}>
          <Route path="/chat/:sender/:receiver" element={
          <RequireAuth><Chat /></RequireAuth>} />
        </Route>
           
          </Routes>
        </div>
        <Footer />
      </LocalizationProvider>
    </AuthContext.Provider>
  );
}

function ChatPage() {
  return (
    <Container component="main" >
    <div className="mt-2" style={{ height: '400px'}}>
    <div className="row h-200 border rounded bg-white shadow"  >
      <div className="col-3 px-0 ">
        <List />
      </div>
      <div className="col-9 px-0 border-left">
        <Outlet />
      </div>
    </div>
    </div>
    </Container>
  );
}

export default App;
