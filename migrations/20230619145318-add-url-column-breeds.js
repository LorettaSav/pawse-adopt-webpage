'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('breeds', 'image_url', {
      type: Sequelize.STRING(1000),
      allowNull: true,
    });
   
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('breeds', 'image_url');
  }
};
