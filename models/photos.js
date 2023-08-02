"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    uppercaseFirst = (str) => `${str[0].toUpperCase()}${str.substr(1)}`;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Photo.belongsTo(models.Pet, {
        foreignKey: "external_id",
        constraints: false,
      });

      Photo.belongsTo(models.User_profile, {
        foreignKey: "external_id",
        constraints: false,
      });


      Photo.addHook("afterFind", findResult => {
        if (!Array.isArray(findResult)) findResult = [findResult];
        for (const instance of findResult) {
          if (instance.type === "users" && instance.user !== undefined) {
            instance.photoTable = instance.user;
          } else if (instance.type === "pet" && instance.pet !== undefined) {
            instance.photoTable = instance.pet;
          }
          // To prevent mistakes:
          delete instance.user;
          delete instance.dataValues.user;
          delete instance.pet;
          delete instance.dataValues.pet;
        }
      });
    }
    
    getPhotoTable(options) {
      if (!this.type) return Promise.resolve(null);
      const mixinMethodName = `get${uppercaseFirst(this.type)}`;
      return this[mixinMethodName](options);
    }
  }
  Photo.init(
    {
      filename: DataTypes.STRING,
      external_id: DataTypes.INTEGER,
      type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Photo",
    }
  );

  return Photo;
};
