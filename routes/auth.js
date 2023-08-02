const express = require("express");
const router = express.Router();
const models = require("../models/index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
require("dotenv").config();
const supersecret = process.env.SUPER_SECRET;
const userMustBeLoggedIn = require("../guards/userMustBeLoggedIn");

// Helper function to calculate age based on date of birth
function calculateAge(dateOfBirth) {
  const currentDate = new Date();
  const ageDiff = currentDate - dateOfBirth;
  const ageInYears = Math.floor(ageDiff / (1000 * 60 * 60 * 24 * 365)); // Calculating age in years
  return ageInYears;
}

// REGISTRATION
router.post("/register", async function (req, res, next) {
  let { username, email, password, name, surname, date_of_birth, location, adopter, avatar } =
    req.body;

  // Check for required fields
  if (!email || !password || !name || !surname || !date_of_birth) {
    res.status(400).send({ message: "Please fill in all required fields." });
    return;
  }

  console.log(req.body);
  try {
    const existingUser = await models.User.findOne({
      where: { 
        [models.Sequelize.Op.or]: [
          { username: username },
          { email: email }
        ]
      }
    });

    if (existingUser) {
      if (existingUser.username === username) {
        res.status(400).send({message:"Username already exists."})
        return;
        // throw new Error("Username already exists.");
      } else if (existingUser.email === email) {
        // throw new Error("Email already exists.");
        res.status(400).send({message:"Email already exists."})
        return;
      }
    }

    let hash = await bcrypt.hash(password, saltRounds);
    password = hash;

    const userDateOfBirth = new Date(date_of_birth);
    const ageInYears = calculateAge(userDateOfBirth);

    if (ageInYears < 18) {
      throw new Error("You must be at least 18 years old to register.");
    }

    const user = await models.User.create({
      username,
      email,
      password,
      name,
      surname,
      date_of_birth,
      location,
      adopter,
      avatar
    });

    console.log(user);
    res.send(true);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// LOGIN
router.post("/login", async function (req, res, next) {
  const { username, password } = req.body;
  console.log(username);
  try {
    const user = await models.User.findOne({
      where: { username },
    });

    if (user) {
      const user_id = user.id;
      const location = user.location;
      const adopter = user.adopter;
      const correctPass = await bcrypt.compare(password, user.password);
      if (!correctPass) throw new Error("Incorrect Password");
      var token = jwt.sign({ user_id }, supersecret);
      res.send({ token, username, user_id, location, adopter });
    } else {
      throw new Error("User does not exist");
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// ACCESSING PRIVATE INFO
router.get("/profile", userMustBeLoggedIn, async function (req, res, next) {
  const user_id = req.user_id;
  const userData = await models.User.findOne({
    where: { id: user_id },
  });
  const userPetData = await models.Pet.findAll({
    where: { user_id },
  });
  const userProfileData = await models.User_profile.findOne({
    where: { user_id },
  });

  res.send({
    userData,
    userPetData,
    userProfileData,
  });
});

module.exports = router;
