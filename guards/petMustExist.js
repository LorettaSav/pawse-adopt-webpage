const models = require("../models/index");
require("dotenv").config();
var express = require("express");

async function petMustExist(req, res, next) {
    const { id } = req.params;
    try {
        const pet = await models.Pet.findOne({
            where: {id}
        })

        if (pet) {
            next();
        } else {
            throw new Error("pet must exist")
        }

    } catch (error) {
        res.status(404).send({message: error.message})
    }
}

module.exports = petMustExist;