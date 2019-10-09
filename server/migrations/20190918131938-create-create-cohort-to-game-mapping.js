'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Cohort_Game', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      game_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'Games',
          key: 'id',
          unique: true 
        }
      },
      cohort_id:{
        type: Sequelize.INTEGER,
        allowNull:true,
        references:{
          model: 'Cohorts',
          key: 'id',
          unique: true 
        }
      }
    },
    {
      freezeTableName: true,
      indexes: [
          {
              unique: true,
              fields: ['game_id', 'cohort_id']
          }
      ]
  });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('createCohortToGameMappings');
  }
};