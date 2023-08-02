'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('questions', 'name');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('questions', 'name');
  }
};
