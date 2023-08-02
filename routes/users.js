var express = require("express");
var router = express.Router();
const models = require("../models/index");
const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const mime = require("mime-types");
const multer = require("multer");
const upload = multer({ dest: "public/images" });
const userMustBeLoggedIn = require("../guards/userMustBeLoggedIn");
const userMustExist = require("../guards/userMustExist")

/* GET all users */
router.get("/", async function (req, res, next) {
  try {
    const users = await models.User.findAll();
    res.send(users);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

/* GET user listing by id*/
router.get("/:id", userMustExist, async function (req, res, next) {
  const { id } = req.params;
  try {
    const user = await models.User.findOne({
      where: { id },
      include: 
        models.Pet
    });
    res.send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

/*

const user = await models.User.findOne({
      where: { id },
      include: [
        models.Favourite,
        models.Pet, 
      ]
    });

{
    "id": 9,
    "username": "loretta",
    "email": "loretta.sav.6@gmail.com",
    "password": "$2b$10$DOq.U1PO5hASnaBmkE8iU.WCjjLY660uVrlTI1uf8CfHTY1KHUC1a",
    "name": "Loretta",
    "surname": "Savvidou",
    "date_of_birth": "1989-12-18",
    "location": "Limassol, Cyprus",
    "adopter": false,
    "avatar": "89ab7d59-4a12-49d9-9b10-3c326071e2a3.jpeg",
    "createdAt": "2023-06-22T14:37:02.000Z",
    "updatedAt": "2023-06-23T17:53:05.000Z",
    "Favourites": [
        {
            "pet_id": 8,
            "createdAt": "2023-06-22T18:19:48.000Z",
            "updatedAt": "2023-06-22T18:19:48.000Z",
            "user_id": 9
        },
        {
            "pet_id": 7,
            "createdAt": "2023-06-22T20:36:51.000Z",
            "updatedAt": "2023-06-22T20:36:51.000Z",
            "user_id": 9
        },
        {
            "pet_id": 6,
            "createdAt": "2023-06-22T20:36:54.000Z",
            "updatedAt": "2023-06-22T20:36:54.000Z",
            "user_id": 9
        },
        {
            "pet_id": 9,
            "createdAt": "2023-06-23T17:54:02.000Z",
            "updatedAt": "2023-06-23T17:54:02.000Z",
            "user_id": 9
        }
    ],
    "Pets": [
        {
            "id": 8,
            "name": "avocado",
            "breed_id": 175,
            "user_id": 5,
            "age": 2,
            "gender": "male",
            "neutered": false,
            "vaccination_status": true,
            "chip": false,
            "medical_issues": null,
            "special_needs": null,
            "passport": true,
            "bio": "from a seed to a wooffy fruit",
            "diet": "just NOT avocadoes",
            "avatar": "342ad5d5-6d44-4297-9338-6a9f73f01cfb.gif",
            "location": "London, UK",
            "latitude": "51.50721780",
            "longitude": "-0.12758620",
            "createdAt": "2023-06-22T14:13:33.000Z",
            "updatedAt": "2023-06-22T16:27:25.000Z",
            "Favourite": {
                "pet_id": 8,
                "createdAt": "2023-06-22T18:19:48.000Z",
                "updatedAt": "2023-06-22T18:19:48.000Z",
                "user_id": 9
            }
        },
        {
            "id": 7,
            "name": "sugarpuff",
            "breed_id": 175,
            "user_id": 5,
            "age": 10,
            "gender": "female",
            "neutered": false,
            "vaccination_status": true,
            "chip": true,
            "medical_issues": null,
            "special_needs": null,
            "passport": false,
            "bio": "strong independent pet with sugary barks and many fluffs",
            "diet": "gluten-free kibble sprinkled with gold.",
            "avatar": "c9e3ecb6-2cb2-487d-ba33-dc892cce2d61.jpeg",
            "location": "London, UK",
            "latitude": "51.50721780",
            "longitude": "-0.12758620",
            "createdAt": "2023-06-22T14:13:33.000Z",
            "updatedAt": "2023-06-22T16:27:05.000Z",
            "Favourite": {
                "pet_id": 7,
                "createdAt": "2023-06-22T20:36:51.000Z",
                "updatedAt": "2023-06-22T20:36:51.000Z",
                "user_id": 9
            }
        },
        {
            "id": 6,
            "name": "fluff",
            "breed_id": 175,
            "user_id": 5,
            "age": 1,
            "gender": "male",
            "neutered": false,
            "vaccination_status": true,
            "chip": false,
            "medical_issues": null,
            "special_needs": null,
            "passport": true,
            "bio": "not bot but..okay",
            "diet": "only strawberries and champagne.",
            "avatar": "b6cfed22-c12a-4213-91c4-d797b1b55d2c.jpeg",
            "location": "London, UK",
            "latitude": "51.50721780",
            "longitude": "-0.12758620",
            "createdAt": "2023-06-22T14:13:33.000Z",
            "updatedAt": "2023-06-23T09:31:50.000Z",
            "Favourite": {
                "pet_id": 6,
                "createdAt": "2023-06-22T20:36:54.000Z",
                "updatedAt": "2023-06-22T20:36:54.000Z",
                "user_id": 9
            }
        },
        {
            "id": 9,
            "name": "Zephyrus",
            "breed_id": 347,
            "user_id": 11,
            "age": 3,
            "gender": "Female",
            "neutered": true,
            "vaccination_status": true,
            "chip": true,
            "medical_issues": "so many",
            "special_needs": "even more",
            "passport": true,
            "bio": "born in a loving family but raised by madmen",
            "diet": "only eats black angus",
            "avatar": "f9e9dcbf-ac63-4830-a279-47532eee8832.jpeg",
            "location": "Bel Air, Los Angeles, CA, USA",
            "latitude": "34.10024550",
            "longitude": "-118.45946300",
            "createdAt": "2023-06-22T21:28:39.000Z",
            "updatedAt": "2023-06-24T10:18:40.000Z",
            "Favourite": {
                "pet_id": 9,
                "createdAt": "2023-06-23T17:54:02.000Z",
                "updatedAt": "2023-06-23T17:54:02.000Z",
                "user_id": 9
            }
        }
    ]
}



*/





/* GET users' avatar by id*/
router.get("/user/:id/avatar",userMustExist, async function (req, res, next) {
  const { id } = req.params;
  try {
    const user = await models.User.findOne({
      where: { id },
    });
    res.send(user.avatar);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//THIS COULD BE ADDED TO GET USERS BY ID
/* GET users listing by id with their pets*/
router.get("/pets/:id",userMustExist, async function (req, res, next) {
  const { id } = req.params;
  try {
    const user = await models.User.findOne({
      where: { id },
      include: models.Pet,
    });
    res.send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

//THIS COULD BE ADDED TO GET USERS BY ID
//GET favourites per user
router.get(
  "/favourites/:user_id",
  userMustBeLoggedIn,
  async function (req, res, next) {
    const { user_id } = req.params;
    try {
      const userAll = await models.User.findAll({
        where: { id: user_id },
        include: [
          {
            model: models.Pet,
          },
        ],
      });
      res.send(userAll);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
);

//needs userMustBeLoggedIn
//POST to upload avatar
router.post(
  "/profile/:id/upload", 
  upload.single("imagefile"),
  async (req, res) => {
    const { id } = req.params;
    const imagefile = req.file;
    // check the extension of the file
    const extension = mime.extension(imagefile.mimetype);
    // create a new random name for the file
    const filename = uuidv4() + "." + extension;
    // grab the filepath for the temporary file
    const tmp_path = imagefile.path;
    // construct the new path for the final file
    const target_path = path.join(__dirname, "../public/images/") + filename;
    try {
      // move the file from tmp folder to the public folder
      await fs.rename(tmp_path, target_path);
      // store image in the DB
      const user = await models.User.findOne({
        where: { id },
      });
      user.update({
        avatar: filename,
      });
      res.send(user.avatar);
    } catch (err) {
      res.status(500).send(err);
    }
  }
);

//needs userMustBeLoggedIn
//POST profile in database
// router.post("/edit/:id", async function (req, res, next) {
//   const { id } = req.params;
//   const { name, username, email, surname, location } = req.body;
//   try {
//     const user = await models.User.findOne({
//       where: { id },
//     });
//     user.update({
//       name: name,
//     });
//     res.send("added!");
//   } catch (error) {
//     res.status(500).send({ message: error.message });
//   }
// });

//needs userMustBeLoggedIn
//Changing adopter value
router.post("/adoption/:id", async function (req, res, next) {
  const { adopter } = req.body;
  const { id } = req.params;
  try {
    const user = await models.User.findOne({
      where: { id },
    });
    user.update({
      adopter: adopter,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//POST favourites
router.post("/favourites", userMustBeLoggedIn, async function (req, res, next) {
  const { pet_id } = req.body;
  const { user_id } = req.body;
  console.log(pet_id, user_id);
  try {
    const user = await models.User.findOne({
      where: { id: user_id },
    });
    const pet = await models.Pet.findOne({
      where: { id: pet_id },
    });
    const favourites = await models.Favourite.create({
      user_id,
      pet_id,
    });
    res.send(favourites);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//needs userMustBeLoggedIn
// DELETE A FAVORITE
router.delete("/favourites", async function (req, res, next) {
  const pet_id = req.query.pet_id;
  const user_id = req.query.user_id;
  console.log(pet_id, user_id);
  try {
    const deletedFavorite = await models.Favourite.destroy({
      where: {
        pet_id: pet_id,
        user_id: user_id,
      },
    });

    if (deletedFavorite) {
      res.send({ message: "Favorite removed successfully" });
    } else {
      res.status(404).send({ message: "Favorite not found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
