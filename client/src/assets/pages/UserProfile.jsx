import axios from "axios";
import { useEffect, useState, useContext } from "react";
import ProfileAvatar from "../components/design/ProfileAvatar";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AuthContext from "../contexts/AuthContext";
import {
  Grid,
  Button,
  Box,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Radio,
  Typography,
  Divider,
  Chip,
  TextField,
} from "@mui/material";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import Slider from "../components/design/Slider";
import { useNavigate, Link } from "react-router-dom";


//DO WE NEED AN EDIT PROFILE BUTTON? i THINK SO...BUT NO IDEA HOW TO REALLY IMPLEMENT IT

export default function UserProfile() {
  //STATE
  const auth = useContext(AuthContext);
  const user_id = auth.userId;
  const navigate = useNavigate();

  const [pets, setPets] = useState([]);
  const [typeUser, setTypeUser] = useState(null); //if adopting or gives for adoption
  const [tempUser, setTempUser] = useState(false); // needs an in between value in case someone has not registered with a t/f value
  const [saveChanges, setSaveChanges] = useState(false); //to upload image, create user inputs in fields for user profile
  const [value, setValue] = useState(null);
  const [data, setData] = useState({}); //getting private data
  const [profileData, setProfileData] = useState({});
  const [inputs, setInputs] = useState({
    user_id: user_id,
    bio: "",
    reason_to_adopt: "",
    reason_to_give: "",
    occupation: "",
    extra_info: "",
  });

  //USEEFFECT
  useEffect(() => {
    requestPrivateData();
    getPets();
    getProfileInformation();
    if (auth.adopter === "true") {
      setTypeUser(true);
    } else if (auth.adopter === "false") {
      setTypeUser(false);
    } else if (auth.adopter === "null") {
      setTypeUser(null);
    }
  }, []);



  //DYNAMIC CHANGES
  const handleChange = (event) => {
    val = event.target.value;
    setValue(event.target.value);
    if (val === "true") {
      setTempUser(true);
    } else {
      setTempUser(false);
    }
    localStorage.setItem("adopter", tempUser);



  };

  const addPet = (newPet) => {
    setPets((state) => [...state, newPet]);
  };

  const setAdopter = async () => {
    try {
      await axios.post(`/api/users/adoption/${auth.userId}`, {adopter: tempUser})
    } catch (error) {
      console.log(error)
    }
  }

  const handleSave = () => {
    setSaveChanges(true);
    console.log(saveChanges);
    if (tempUser) {
      setTypeUser(true);
    } else {
      setTypeUser(false);
    }

    localStorage.removeItem("adopter");
    localStorage.setItem("adopter", typeUser); // to save the change in the whole app

    //will also need to post changes in Backend
    setAdopter()

    updateProfileInformation();
  };

  let val = "";

  const handleRadio = (e) => {
    val = e.target.value;
    if (val !== "true") {
      setTempUser(true);
    } else {
      setTempUser(false);
    }
  };

  const handleInputChanges = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  //CALLS TO BACKEND
  async function getPets() {
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

  const requestPrivateData = async () => {
    try {
      const { data } = await axios("/api/auth/profile", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      //console.log("data", data);
      setData({ data });
    } catch (error) {
      console.log("error", error);
    }
  };

  const getProfileInformation = async () => {
    try {
      const { data } = await axios.get(`/api/user_profiles/${auth.userId}`);
      setProfileData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateProfileInformation = async () => {
    try {
      await axios.post(`api/user_profiles/create/${user_id}`, inputs);
      getProfileInformation();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {console.log(inputs)}
      <div className="row" style={{ paddingLeft: "5vw", paddingTop: "2vw" }}>
        <div className="col-5">
          <ProfileAvatar />
          <div className="row my-3 mx-1"></div>
        </div>
        <div className="col-7">
          <div className="row" style={{ paddingTop: "2vw", marginLeft: "6vw" }}>
            <Typography variant="h3"> {auth.name}</Typography>
            <div className="row" style={{ paddingTop: "2vw" }}>
              {pets.map((pet) => (
                <Typography variant="h6" key={pet.id}>
                  {" "}
                  <i className="fa-solid fa-dog"></i>
                  {pet.name}
                </Typography>
              ))}
            </div>
            <div className="row" style={{ paddingTop: "2vw" }}>
              {typeUser === null ? (
                <div>
                  <FormControl>
                    <RadioGroup
                      onChange={handleChange}
                      value={value}
                      name="adopt"
                      size="small"
                      color="secondary"
                    >
                      <FormControlLabel
                        value="true"
                        control={<Radio />}
                        label="Looking to adopt"
                      />
                      <FormControlLabel
                        value="false"
                        control={<Radio />}
                        label="Looking for a home"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              ) : null}
            </div>
            <div>
              {typeUser === true ? <p>Looking to adopt!</p> : null}
              {typeUser === false ? <p>Looking for a home!</p> : null}
            </div>
            <div
              className="row"
              style={{
                paddingTop: "1vw",
                fontWeight: "bold",
                fontSize: "1.8vw",
                display: "flex",
              }}
            >
              <Typography variant="h6">
                <i
                  className="fa-solid fa-location-dot"
                  style={{ fontSize: "1.5vw" }}
                ></i>
                {auth.location}
              </Typography>
            </div>
            <div className="row" style={{ marginTop: "3vw" }}>
              <Box sx={{ width: "100%", marginBottom: "2vw" }}>
                {
                  typeUser ? 
                  <Button
                  variant="outlined"
                  size="small"
                  color="secondary"
                  style={{ textDecoration: "underline" }}
                  onClick={() => navigate(`/favourites`)}
                >
                  My Favourites
                    </Button> :
                        <Button
                        variant="outlined"
                        size="small"
                        color="secondary"
                        style={{ textDecoration: "underline", marginRight: "2vw" }}
                        onClick={() => navigate(`/pet_view`)}
                      >
                        Pet View
                      </Button>
                     
                }
            
              </Box>
            </div>
          </div>
        </div>
      </div>
        <div className="row" style={{ margin: "2vw 5.5vw", display: "flex" }}>
          <Divider textAlign="left" style={{ marginBottom: "2vw" }}>
            <Chip label="Bio" />
          </Divider>
          {profileData.bio ? (
            <Typography variant="p"> {profileData.bio}</Typography>
          ) : (
            <TextField
              multiline
              placeholder="Let us know who you are!"
              variant="standard"
              name="bio"
              onChange={handleInputChanges}
            ></TextField>
          )}
          <div className="col" style={{ marginTop: "4vw" }}>
            <div>
              <Divider textAlign="left" style={{ marginBottom: "2vw" }}>
                <Chip label="Occupation " />
              </Divider>
              {profileData.occupation ? (
                <Typography variant="p">{profileData.occupation}</Typography>
              ) : (
                <TextField
                  variant="standard"
                  multiline
                  placeholder="What is your current occupation?"
                  name="occupation"
                  minRows={5}
                  onChange={handleInputChanges}
                ></TextField>
              )}
            </div>
          </div>
          <div className="col" style={{ marginTop: "4vw" }}>
            <div>
              <Divider textAlign="left" style={{ marginBottom: "2vw" }}>
                <Chip label="In Your Words" />
              </Divider>
              {profileData.extra_info ? (
                <Typography variant="p">{profileData.extra_info}</Typography>
              ) : (
                <TextField
                  variant="standard"
                  multiline
                  placeholder="Anything else you'd like to share??"
                  name="extra_info"
                  minRows={5}
                  onChange={handleInputChanges}
                ></TextField>
              )}
            </div>
            
          </div>
          <div className="col" style={{ margin: "4vw 5.5vw" }}>
            {console.log(typeUser)}
            {typeUser ? (
              <div>
                <Divider textAlign="left" style={{ marginBottom: "2vw" }}>
                  <Chip label="Reasons " />
                </Divider>
                {profileData.reason_to_adopt ? (
                  <Typography variant="p">
                    {profileData.reason_to_adopt}
                  </Typography>
                ) : (
                  <TextField
                    variant="standard"
                    multiline
                    placeholder="Why do you want to adopt?"
                    name="reason_to_adopt"
                    minRows={5}
                    onChange={handleInputChanges}
                  ></TextField>
                )}
              </div>
            ) : (
              <div>
                <Divider textAlign="left" style={{ marginBottom: "2vw" }}>
                  <Chip label="Reasons " />
                </Divider>
                {profileData.reason_to_give ? (
                  <Typography variant="p">
                    {profileData.reason_to_give}
                  </Typography>
                ) : (
                  <TextField
                    variant="standard"
                    multiline
                    placeholder="Why are you looking for a new home for your pet(s)?"
                    name="reason_to_give"
                    minRows={5}
                    onChange={handleInputChanges}
                  ></TextField>
                )}
              </div>
            )}
          </div>
        </div>
      <div style={{ textAlign: "center" }}>
        <Grid item>

          {user_id !== auth.userId && (
            <Button
              variant="contained"
              color="secondary"
              style={{ marginRight: "2vw" }}
            >
              <i className="fa-solid fa-comments"></i> Message User
            </Button>
          )}

          <Link to={`/chat/${auth.userId}/`}>
          <Button
            variant="contained"
            color="secondary"
            style={{ marginRight: "2vw" }}
          >
            <i className="fa-solid fa-comments"></i> Messages
          </Button>
          </Link>


          <Button
            variant="outlined"
            color="secondary"
            size="small"
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </Grid>
      </div>
    </div>
  );
}
