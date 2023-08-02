'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('pets', 'location', {
      type: Sequelize.STRING,
    });
  
    await queryInterface.addColumn('pets', 'latitude', {
      type: Sequelize.DECIMAL(10,8),
    });
  
    await queryInterface.addColumn('pets', 'longitude', {
      type: Sequelize.DECIMAL(11,8),
    });
  
},

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('pets', 'longitude');
    await queryInterface.removeColumn('pets', 'latitude');
    await queryInterface.removeColumn('pets', 'location');
  }
};
