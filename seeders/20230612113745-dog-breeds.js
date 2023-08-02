'use strict';

const axios = require('axios');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const { data } = await axios.get('https://api.thedogapi.com/v1/breeds?/&api_key=live_Gn9vHzYy4ihx41hkxTZfLlm1w6FnHL3msR1dv60JmEKGx9fZuqTCZh5A78WZDcFp');

    const breedData = data.map(d => ({
      breed: d.name,
      height: d.height.metric,
      weight: d.weight.metric,
      life_expectancy: d.life_span,
      temperament: d.temperament,
      image_url: d.image.url
    }));

    breedData.push({ breed: 'Other' });
    breedData.push({ breed: 'Unknown' });

    await queryInterface.bulkInsert('breeds', breedData, {});
     
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('breeds', null, {});
     
  }
};
