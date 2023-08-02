"use strict";
const fs = require("fs");
const path = require("path");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      //does having favourites clashes with the pet ownership?
      User.hasMany(models.Pet, { foreignKey: "user_id" });
      User.hasOne(models.User_profile, { foreignKey: "user_id" });
      User.hasMany(models.Photo, {
        foreignKey: "external_id",
        constraints: false,
        scope: {
          type: "user",
        },
      });
      User.belongsToMany(models.Pet, { through: models.Favourite, foreignKey: "user_id" });
     // User.hasMany(models.Favourite, {foreignKey: "user_id"})
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      name: DataTypes.STRING,
      surname: DataTypes.STRING,
      date_of_birth: DataTypes.DATE,
      location: DataTypes.STRING,
      adopter: DataTypes.BOOLEAN,
      avatar: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    },
    {
      hooks: {
        afterUpdate: (user, options) => {
          console.log(user.name, options);
        },
      },
    }
  );
  return User;
};
