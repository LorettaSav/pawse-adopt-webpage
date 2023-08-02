"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User_profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User_profile.belongsTo(models.User, { foreignKey: "user_id" });
      
      User_profile.hasMany(models.Photo, {
        foreignKey: "external_id",
        constraints: false,
        scope: {
          type: "user_profile",
        },
      });
    }
  }
  User_profile.init(
    {
      user_id: DataTypes.INTEGER,
      bio: DataTypes.STRING,
      reason_to_adopt: DataTypes.STRING,
      reason_to_give: DataTypes.STRING,
      extra_info: DataTypes.STRING,
      occupation: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User_profile",
    }
  );
  return User_profile;
};
