var express = require("express");
var router = express.Router();
const models = require("../models/index");
const { Op } = require("sequelize");
const petMustExist = require("../guards/petMustExist");
const userMustBeLoggedIn = require("../guards/userMustBeLoggedIn");
const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const mime = require("mime-types");
const multer = require("multer");
const upload = multer({ dest: "public/images" });

/* GET pets by location or breed . */
router.get("/search", async function (req, res, next) {
  const queryParams = req.query;
  const conditions = {};

  if (queryParams.latitude && queryParams.longitude) {
    conditions.latitude = {
      [Op.between]: [queryParams.latitude - 0.1, queryParams.latitude + 0.1],
    };
    conditions.longitude = {
      [Op.between]: [queryParams.longitude - 0.1, queryParams.longitude + 0.1],
    };
  }

  if (queryParams.id) {
    conditions.breed_id = {
      [Op.eq]: queryParams.id,
    };
  }

  try {
    const pets = await models.Pet.findAll({
      include: [{ model: models.Breed }],
      where: conditions,
    });
    
    res.send(pets);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

/* GET all pets. */
router.get("/", async function (req, res) {
  try {
    const pets = await models.Pet.findAll({
      include: [{ model: models.Breed }],
    });
    res.send(pets);
  } catch (error) {
    res.status(500).send(error);
  }
});

/* GET pets' avatar by pet id*/
router.get("/pet/:id/avatar", async function (req, res, next) {
  const { id } = req.params;
  try {
    const pet = await models.Pet.findOne({
      where: { id },
    });

    res.send(pet.avatar);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//do we need this if we can get users WITH  their pets?
/* GET pets by user_id. */
router.get("/user/:user_id", async function (req, res, next) {
  const { user_id } = req.params;
  try {
    const pets = await models.Pet.findAll({
      include: [{ model: models.Breed }],
      where: {
        user_id,
      },
    });

    res.send(pets);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

/* GET pet by id. */
router.get("/:id", async function (req, res, next) {
  const { id } = req.params;
  try {
    const pet = await models.Pet.findOne({
      include: [{ model: models.Breed }, { model: models.User }],
      where: {
        id,
      },
    });
    res.send(pet);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// /* GET pets by location or breed . */
// router.get("/search", async function (req, res, next) {
//   const queryParams = req.query;
//   const conditions = {};

//   if (queryParams.latitude && queryParams.longitude) {
//     conditions.latitude = {
//       [Op.between]: [queryParams.latitude - 0.1, queryParams.latitude + 0.1],
//     };
//     conditions.longitude = {
//       [Op.between]: [queryParams.longitude - 0.1, queryParams.longitude + 0.1],
//     };
//   }

//   if (queryParams.id) {
//     conditions.breed_id = {
//       [Op.eq]: queryParams.id,
//     };
//   }

//   try {
//     const pets = await models.Pet.findAll({
//       include: [{ model: models.Breed }],
//       where: conditions,
//     });
    
//     res.send(pets);
//   } catch (err) {
//     res.status(500).send({ message: err.message });
//   }
// });



//UPLOAD AVATAR
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
      const pet = await models.Pet.findOne({
        where: { id },
      });
      pet.update({
        avatar: filename,
      });
      res.send(pet.avatar);
    } catch (err) {
      res.status(500).send(err);
    }
  }
);

/* Post new pet listing. */
// true = 1 , false = 0 for boolean values
router.post("/", userMustBeLoggedIn, async function (req, res, next) {
  const {
    name,
    breed_id,
    age,
    gender,
    neutered,
    user_id,
    vaccination_status,
    chip,
    medical_issues,
    special_needs,
    passport,
    bio,
    diet,
    location,
    latitude,
    longitude,
  } = req.body;

  try {
    const pets = await models.Pet.create({
      name,
      breed_id,
      age,
      gender,
      neutered,
      user_id,
      vaccination_status,
      chip,
      medical_issues,
      special_needs,
      passport,
      bio,
      diet,
      location,
      latitude,
      longitude,
    });

    res.send(pets);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.post("/edit/:id", async function (req, res, next) {
  const { id } = req.params;
  const { bio, diet, medical_issues, special_needs } = req.body;
  try {
    const pet = await models.Pet.findOne({
      where: { id },
    });

    pet.update({
      bio,
      diet,
      medical_issues,
      special_needs,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

/*DELETE pet listing */
router.delete(
  "/:id",
  petMustExist,
  userMustBeLoggedIn,
  async function (req, res, next) {
    const { id } = req.params;
    try {
      const pet = models.Pet.destroy({
        where: { id },
      });
      res.send({ message: "Your pet has been deleted successfully" });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
);

module.exports = router;
