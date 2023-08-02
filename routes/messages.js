const express = require("express");
const router = express.Router();
require("dotenv").config();
const Pusher = require("pusher");
const models = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const channels_client = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: "eu",
  useTLS: true,
});

router.post("/:senderId/:receiverId", (req, res) => {
  let { senderId, receiverId } = req.params;
  console.log(req.params);
  let content = req.body.data.message;


  try {
    models.Message.create({ content, senderId, receiverId })
  } catch (err) {
    res.status(500).send(err);
  }

  const users = [senderId, receiverId].sort();
  const name = `chat-${users[0]}-${users[1]}`;
  



  channels_client.trigger(name, "message", {
    senderId, receiverId, content,
  });

  res.send({ msg: "Sent" });
});


router.get("/:id1/:id2", async (req, res) => {
  let {id1, id2} = req.params;

  let messages = await models.Message.findAll({
    where: {
      senderId: {
        [Op.in]: [id1, id2],
      },
      receiverId: {
        [Op.in]: [id1, id2],
      },

    },

    limit: 10,
    order: [["id", "DESC"]],
  });
 res.send(messages.reverse());
});
module.exports = router;