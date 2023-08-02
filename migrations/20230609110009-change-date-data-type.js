'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.changeColumn('users', 'date_of_birth', {
      type: Sequelize.DATEONLY,
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.changeColumn('users', 'date_of_birth', {
      type: Sequelize.DATE,
    });
  }
};
