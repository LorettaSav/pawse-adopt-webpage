var express = require("express");
var router = express.Router();
const models = require("../models/index");



router.post("/", async function (req, res, next) {
    const { name, email, message } = req.body;
    console.log("name", name)
    console.log("email", email)
    try {
        const contact = await models.Contact.create({
            name,
            email,
            message
        })
        res.send(contact)
    } catch (error) {
        res.status(500).send({message:error.message})
    }
})

module.exports = router;