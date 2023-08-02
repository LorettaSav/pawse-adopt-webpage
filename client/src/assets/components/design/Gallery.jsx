import { ImageList, ImageListItem, Button } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import axios from "axios";

export default function Gallery() {
  const auth = useContext(AuthContext);
  const [images, setImages] = useState();
  const [image, setImage] = useState([]);
  const [selectedFile, setSelectedFile] = useState([]);

  useEffect(() => {
    if (images) {
      getPhotos(auth.userId);
    }
  }, []);

  const getPhotos = async () => {
    try {
      const res = axios.get(`/api/photos/${auth.userId}`);
      setImages(() => [res.data]);
      console.log(images);
    } catch (error) {
      console.log(error);
    }
  };

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);

    /*
     setSelectedFile(() => [
     ...event.target.files
     ])
    */
    // [File,File]
    /*
        File {
        name,
        lastModified,
        etc
        }
        */
  };

  const onFileUpload = async () => {
    const formData = new FormData();

    formData.append("imagefile", selectedFile, selectedFile.name);

    console.log("here");
    try {
      const res = await axios.post(
        `api/photos/uploads/user/${auth.userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setImage(() => [
        ...image, res.data
      ])
      console.log(res);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <ImageList sx={{}} cols={4} rowHeight={164}>
        {/* {images ? (
        <div>
          <input type="file" multiple onChange={onFileChange} />
          <Button onClick={onFileUpload}>Select more to upload</Button>
        </div>
      ) : ( */}
        <div>
          {/* {images.map((photo,i) => (
            <div key={i}>
                  <ImageList sx={{}} cols={4} rowHeight={164}>

              <ImageListItem>
                <img
                  src={`/images/${photo}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`/images/${photo}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                />
              </ImageListItem>
                <Button>Delete image</Button>
                </ImageList >

            </div>
          ))} */}

          <img src={`/images/${image}`} alt="" />
          <div>
            <Button variant="contained" color="secondary">
              <label className="custom-file-upload">
                Select photos here
                <input type="file" multiple onChange={onFileChange} />
              </label>
            </Button>
            <Button variant="contained" onClick={onFileUpload}>
              Upload
            </Button>
          </div>
        </div>
        {/* )} */}
      </ImageList>
    </div>
  );
}
