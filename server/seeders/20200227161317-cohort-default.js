'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('cohort', [{
        name: 'demo',
        logo: 'imagedata/ndi.png'
      }]);
  },

  down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('cohort', null, {});
  
  }
};
