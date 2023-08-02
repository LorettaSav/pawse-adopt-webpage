var express = require("express");
var router = express.Router();
const models = require("../models/index");

router.get("/", async function (req, res) {
  const { type, size } = req.query;

  /*

  {
      "id": 5,
      "breed": "Akbash Dog",
      "height": "71 - 86",
      "minWeight": 41,
      "maxWeight": 64,
      "life_expectancy": "10 - 12 years",
      "temperament": "Loyal, Independent, Intelligent, Brave",
      "image_url": "https://cdn2.thedogapi.com/images/26pHT3Qk7.jpg",
      "createdAt": "2023-06-20T13:04:13.000Z",
      "updatedAt": "2023-06-20T13:04:13.000Z"
  }

  if size between 0 and 30 then I want dogs between 0 and 10
  if size between 30 and 60 then I want dogs between 10 and 20
  if size between 60 and 90 then I want dogs maximum 50


  */

  const breeds = await models.Breed.findAll({
    where: {
      temperament: {
        [models.Sequelize.Op.like]: `%${type}%`,
      },
      // https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#operators
      // maxWeight: {
      // }
    },
    //get only 20 breeds for presentation 
    limit:20
  });

  res.send({
    message: `finding a dog of type ${type}`,
    // and size ${size}
    data: breeds,
  });
});

module.exports = router;
