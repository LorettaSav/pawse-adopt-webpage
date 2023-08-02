import { Button } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../../contexts/AuthContext";

export default function ProfileAvatar() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [avatar, setAvatar] = useState([]);
  const [defaultImage, setDefaultImage] = useState(null);
  const auth = useContext(AuthContext);

  useEffect(() => {
    getAvatar(auth.userId);
  }, [selectedFile, auth.userId]);

  async function getAvatar(id) {
    try {
      const res = await axios.get(`/api/users/user/${id}/avatar`);
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
  const onFileUpload = async (id) => {
    id = auth.userId;
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append("imagefile", selectedFile, selectedFile.name);

    try {
      // Request made to the backend api
      // Send formData object
      const res = await axios.post(
        `/api/users/profile/${id}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
      setAvatar(res.data)
      //console.log(res);
      
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
        </div>
      </div>
    </div>
  );
}
