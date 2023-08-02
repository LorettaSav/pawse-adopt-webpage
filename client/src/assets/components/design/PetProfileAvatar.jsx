import { Button } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../../contexts/AuthContext";

export default function PetProfileAvatar( {pet_id, user_id }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [avatar, setAvatar] = useState([]);
  const [defaultImage, setDefaultImage] = useState(null);
  const auth = useContext(AuthContext);

  useEffect(() => {
    getAvatar();
  },[avatar]);

  async function getAvatar() {
    try {
      const res = await axios.get(`/api/pets/pet/${pet_id}/avatar`);
      setAvatar(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  // On file select (from the pop up)
  const onFileChange = (event) => {
    // Update the state
    setSelectedFile(event.target.files[0]);
    setDefaultImage(null);
  };

  // On file upload (click the upload button)
  const onFileUpload = async () => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append("imagefile", selectedFile, selectedFile.name);

    try {
      // Request made to the backend api
      // Send formData object
      const res = await axios.post(
        `/api/pets/profile/${pet_id}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setAvatar(res.data)
      getAvatar();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className="row" style={{ paddingTop: "1vw" }}>
          <div className="col-3">
            <div
              style={{
                width: "35vw",
                height: "22vw",
              }}
            >
              {!avatar ? (
                <img
                  src={defaultImage}
                  style={{ width: "50%", height: "55%" }}
                  className="rounded-circle"
                />
              ) : (
                  <div style={{textAlign:"center"}}> 

                    <img
                      src={`/images/${avatar}`}
                      style={{ width: "45%", height: "50%" }}
                      className="rounded-circle"
                    />
                  </div>
              )}
            </div>
          </div>
        </div>
        <div className="row" style={{ paddingTop: "1vw", textAlign:"center" }}>
          {auth.userId == user_id &&
          <div>
            <Button variant="outlined" size="small" color="secondary" style={{marginRight:"2vw"}}>
              <label className="custom-file-upload">
                Select new photo here
                <input type="file" onChange={onFileChange} />
              </label>
            </Button>
            <Button onClick={onFileUpload} variant="contained"  size="small">
              Upload
            </Button>
          </div>
}
        </div>
      </div>
    </div>
  );
}
