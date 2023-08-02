"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn("Pets", "breed_id", {
      type: Sequelize.INTEGER,
      references: {
        model: "Breeds",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn("Pets", "breed_id");
  },
};
