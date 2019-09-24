'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Cohort_Question', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      question_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'Questions',
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
              fields: ['question_id', 'cohort_id']
          }
      ]
  });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('createCohortToQuestionMappings');
  }
};