"use strict";

const { Model } = require("sequelize");
const User = require("./user"); // Modify the file path if necessary

module.exports = (sequelize, DataTypes) => {
  class Pet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pet.belongsTo(models.User, { foreignKey: "user_id" });
      Pet.belongsTo(models.Breed, { foreignKey: "breed_id" });
      Pet.hasMany(models.Photo, {
        foreignKey: "external_id",
        constraints: false,
        scope: {
          type: "pet",
        }
      });

      Pet.belongsToMany(models.User, {through: models.Favourite, as: "favouritePets",foreignKey: "pet_id"})


      /*
      
      The A.hasOne(B) association means that a One-To-One relationship exists between A and B, 
      with the foreign key being defined in the target model (B).

      The A.belongsTo(B) association means that a One-To-One relationship exists between A and B, 
      with the foreign key being defined in the source model (A).

      The A.hasMany(B) association means that a One-To-Many relationship exists between A and B, 
      with the foreign key being defined in the target model (B).

      */

      Pet.hasMany(models.Photo, {
        foreignKey: "external_id",
        constraints: false,
        scope: {
          type: "pet",
        },
      });
    }
  }
  Pet.init(
    {
      name: DataTypes.STRING,
      breed_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      age: DataTypes.INTEGER,
      gender: DataTypes.STRING,
      neutered: DataTypes.BOOLEAN,
      vaccination_status: DataTypes.BOOLEAN,
      chip: DataTypes.BOOLEAN,
      medical_issues: DataTypes.STRING,
      special_needs: DataTypes.STRING,
      passport: DataTypes.BOOLEAN,
      bio: DataTypes.STRING,
      diet: DataTypes.STRING,
      avatar: DataTypes.STRING,
      location: DataTypes.STRING,
      latitude: DataTypes.DECIMAL(10, 8),
      longitude: DataTypes.DECIMAL(11, 8),
    },
    {
      sequelize,
      modelName: "Pet",
    }
  );
  return Pet;
};
