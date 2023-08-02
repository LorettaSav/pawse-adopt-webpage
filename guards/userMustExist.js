const models = require("../models/index");
require("dotenv").config();
var express = require("express");

async function userMustExist(req, res, next) {
  const { id } = req.params;
  try {
    const user = await models.User.findOne({
      where: { id },
    });

    if (user) {
      next();
    } else {
      throw new Error({ message: "user must exist" });
    }
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
}

module.exports = userMustExist;