var express = require("express");
var router = express.Router();
const models = require("../models/index");
const userMustBeLoggedIn = require("../guards/userMustBeLoggedIn");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

router.get("/", userMustBeLoggedIn, async function (req, res) {
  const { include } = req.query;
  const { user_id } = req;

  const peopleWhomIMessaged = await models.Message.findAll({
    attributes: [
      // specify an array where the first element is the SQL function and the second is the alias
      [Sequelize.fn("DISTINCT", Sequelize.col("receiverId")), "something"],

      // specify any additional columns, e.g. country_code
      // 'country_code'
    ],
    where: {
      senderId: user_id,
    },
  });

  const peopleWhoMessagedMe = await models.Message.findAll({
    attributes: [
      // specify an array where the first element is the SQL function and the second is the alias
      [Sequelize.fn("DISTINCT", Sequelize.col("senderId")), "something"],

      // specify any additional columns, e.g. country_code
      // 'country_code'
    ],
    where: {
      receiverId: user_id,
    },
  });

  const peopleThatITalkTo = [...peopleWhoMessagedMe, ...peopleWhomIMessaged];

  const uniqueListOfFriends = peopleThatITalkTo.map((e) => {
    return e.dataValues.something;
  });

  const finalUnique = [...new Set(uniqueListOfFriends)];

  if (include) finalUnique.push(include);

  const users = await models.User.findAll({
    where: {
      id: {
        [Op.in]: finalUnique,
      },
    },
  });

  res.send(users);
});

module.exports = router;
