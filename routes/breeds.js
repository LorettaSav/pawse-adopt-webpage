var express = require("express");
var router = express.Router();
const models = require("../models/index");

/* GET breeds */
router.get("/", async function (req, res) {
  try {
    const breeds = await models.Breed.findAll();
    res.send(breeds);
  } catch (error) {
    res.status(500).send(error);
  }
});

//get breed by ID
router.get("/:id", async function (req, res) {
  const { id } = req.params;
  try {
    const breed = await models.Breed.findOne({
      where: {
        id: id,
      },
    });
    res.send(breed);
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

//pets of that breed
router.get("/:id/pets", async (req, res) => {
  const { id } = req.params;

  try {
    const breed = await models.Breed.findByPk(id, {
      include: [{ model: models.Pet }],
    });

    if (!breed) {
      return res.status(404).send({ error: "Breed not found" });
    }
    res.send(breed.pets);
  } catch {
    res.status(500).send({ error: "error" });
  }
});

router.get("/update/all", async (req, res) => {
  // populate the new columns with the data from the old weight column
  const breeds = await models.Breed.findAll();
  // generate a new array of breeds, in which the minWeidht and maxWeight are set
  // foreach each breed in breeds
  breeds.forEach(async (breed) => {
    console.log(breed.breed, breed.weight);
    if (breed.weight) {
      const minWeight = Number(breed.weight.split(" - ")[0]);
      const maxWeight = Number(breed.weight.split(" - ")[1]);
      // "set" the minWeight and maxWeight
      breed.set({
        minWeight,
        maxWeight,
      });

      await breed.save();
    }
  });

  res.send("breeds have been updated");
});

module.exports = router;
