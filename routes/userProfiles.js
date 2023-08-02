var express = require("express");
var router = express.Router();
const models = require("../models/index");

/* GET user profile listing by user_id*/
// can I do this from requestPrivateData? in auth.js ?
router.get("/:user_id", async function (req, res, next) {
  const { user_id } = req.params;
  try {
    const profile = await models.User_profile.findOne({
      where: { user_id },
    });
    res.send(profile);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

//POST edits in database
router.post("/create/:user_id", async function (req, res, next) {
  const { bio, reason_to_adopt, reason_to_give, extra_info, occupation } =
    req.body;
  const { user_id } = req.params;
  try {
    const updateFields = { user_id: user_id };
    if (bio) {
      updateFields.bio = bio;
    }
    if (reason_to_adopt) {
      updateFields.reason_to_adopt = reason_to_adopt;
    }
    if (reason_to_give) {
      updateFields.reason_to_give = reason_to_give;
    }
    if (extra_info) {
      updateFields.extra_info = extra_info;
    }
    if (occupation) {
      updateFields.occupation = occupation;
    }
    const user = await models.User_profile.create(updateFields);
    res.send(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
